/* eslint dot-notation: 'off' */
'use strict';

const Bottleneck = require('bottleneck');
const { EventEmitter } = require('events');
const chunk = require('lodash.chunk');
const debug = require('debug')('sendgrid');
const util = require('util');
const queue = require('async.queue');
const ensureAsync = require('async.ensureasync');

const ContactImporter = module.exports = function(sg, options = {}) {
  const self = this;
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
  this.queue.empty = () => {
    if (this.pendingItems.length) {
      debug('adding %s items from deferrd queue for processing', this.pendingItems.length);
      const batch = this.pendingItems.splice(0);
      this.queue.push({
        data: batch,
        owner: this,
      }, (error, { body }) => {
        if (error) {
          return this._notify(error, JSON.parse(error.response.body), batch);
        }
        return this._notify(null, JSON.parse(body), batch);
      });
    }
  };

  // Emit an event when the queue is drained.
  this.queue.drain = () => this.emit('drain')
};
util.inherits(ContactImporter, EventEmitter);

/**
 *  Add a new contact, or an array of contact, to the end of the queue.
 *
 * @param {Array|Object} data A contact or array of contacts.
 */
ContactImporter.prototype.push = function(data) {
  const self = this;
  data = Array.isArray(data) ? data : [data];

  // Add the new items onto the pending items.
  const itemsToProcess = this.pendingItems.concat(data);

  // Chunk the pending items into batches and add onto the queue
  const batches = chunk(itemsToProcess, this.batchSize);
  debug('generated batches %s from %s items', batches.length, data.length);

  batches.forEach(batch => {
    // If this batch is full or the queue is empty queue it for processing.
    if (batch.length === this.batchSize || !this.queue.length()) {
      this.queue.push({
        data: batch,
        owner: this,
      }, function(error, { body }) {
        if (error) {
          return this._notify(error, JSON.parse(error.response.body), batch);
        }
        return this._notify(null, JSON.parse(body), batch);
      });
    }
    // Otherwise, it store it for later.
    else {
      debug('the last batch with only %s item is deferred (partial batch)', batch.length);
      this.pendingItems = batch;
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
ContactImporter.prototype._worker = function({ owner, data }, callback) {
  const context = owner;
  debug('processing batch (%s items)', data.length);
  context.throttle.submit(context._sendBatch, context, data, callback);
};

ContactImporter.prototype._sendBatch = function(context, data, callback) {
  debug('sending batch (%s items)', data.length);

  const request = context.sg.emptyRequest();
  request.method = 'POST';
  request.path = '/v3/contactdb/recipients';
  request.body = data;

  context.sg.API(request)
    .then(response => {
      debug('got response: %o', response);
      setTimeout(() => context.throttle.incrementReservoir(1), context.rateLimitPeriod);
      return callback(null, response);
    })
    .catch(error => {
      debug('got error, %o', error);
      setTimeout(() => context.throttle.incrementReservoir(1), context.rateLimitPeriod);
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
