/* eslint dot-notation: 'off' */
'use strict';

var Bottleneck = require('bottleneck');
var EventEmitter = require('events').EventEmitter;
var chunk = require('lodash.chunk');
var debug = require('debug')('sendgrid');
var util = require('util');
var queue = require('async.queue');
var ensureAsync = require('async.ensureasync');

var ContactImporter = module.exports = function(sg, options) {
  options = options || {};
  var self = this;
  this.sg = sg;
  this.pendingItems = [];

  // Number of items to send per batch.
  this.batchSize = options.batchSize || 1500;

  // Max number of requests per rate limit period.
  this.rateLimitLimit = options.rateLimitLimit || 3;

  // Length of rate limit period (miliseconds).
  this.rateLimitPeriod = options.rateLimitPeriod || 2000;

  // Create a throttler that will process no more than `rateLimitLimit` requests every `rateLimitPeriod` ms.
  this.throttle = new Bottleneck(0, 0);
  this.throttle.changeReservoir(this.rateLimitLimit);

  // Create a queue that wil be used to send batches to the throttler.
  this.queue = queue(ensureAsync(this._worker));

  // When the last batch is removed from the queue, add any incomplete batches.
  this.queue.empty = function() {
    if (self.pendingItems.length) {
      debug('adding %s items from deferrd queue for processing', self.pendingItems.length);
      var batch = self.pendingItems.splice(0);
      self.queue.push({
        data: batch,
        owner: self,
      }, function(error, result) {
        if (error) {
          return self._notify(error, error.response.body, batch);
        }
        return self._notify(null, result.body, batch);
      });
    }
  };

  // Emit an event when the queue is drained.
  this.queue.drain = function() {
    self.emit('drain');
  };
};
util.inherits(ContactImporter, EventEmitter);

/**
 *  Add a new contact, or an array of contact, to the end of the queue.
 *
 * @param {Array|Object} data A contact or array of contacts.
 */
ContactImporter.prototype.push = function(data) {
  var self = this;
  data = Array.isArray(data) ? data : [data];

  // Add the new items onto the pending items.
  var itemsToProcess = this.pendingItems.concat(data);

  // Chunk the pending items into batches and add onto the queue
  var batches = chunk(itemsToProcess, this.batchSize);
  debug('generated batches %s from %s items', batches.length, data.length);

  batches.forEach(function(batch) {
    // If this batch is full or the queue is empty queue it for processing.
    if (batch.length === self.batchSize || !self.queue.length()) {
      self.queue.push({
        data: batch,
        owner: self,
      }, function(error, result) {
        if (error) {
          return self._notify(error, error.response.body, batch);
        }
        return self._notify(null, result.body, batch);
      });
    }
    // Otherwise, it store it for later.
    else {
      debug('the last batch with only %s item is deferred (partial batch)', batch.length);
      self.pendingItems = batch;
    }
  });

  debug('batches in queue: %s', this.queue.length());
  debug('items in deferred queue: %s', this.pendingItems.length);
};

/**
 * Send a batch of contacts to Sendgrid.
 *
 * @param {Object} task Task to be processed (data in 'data' property)
 * @param {Function} callback Callback function.
 */
ContactImporter.prototype._worker = function(task, callback) {
  var context = task.owner;
  debug('processing batch (%s items)', task.data.length);
  context.throttle.submit(context._sendBatch, context, task.data, callback);
};

ContactImporter.prototype._sendBatch = function(context, data, callback) {
  debug('sending batch (%s items)', data.length);

  var request = context.sg.emptyRequest();
  request.method = 'POST';
  request.path = '/v3/contactdb/recipients';
  request.body = data;

  context.sg.API(request)
    .then(function(response) {
      debug('got response: %o', response);
      setTimeout(function() {
        context.throttle.incrementReservoir(1);
      }, context.rateLimitPeriod);
      return callback(null, response);
    })
    .catch(function(error) {
      debug('got error, %o', error);
      setTimeout(function() {
        context.throttle.incrementReservoir(1);
      }, context.rateLimitPeriod);
      return callback(error);
    });
};

/**
 * Emit the result of processing a batch.
 *
 * @param {Object} error
 * @param {Object} result
 */
ContactImporter.prototype._notify = function(error, result, batch) {
  if (error) {
    return this.emit('error', error, batch);
  }
  return this.emit('success', result, batch);
};
