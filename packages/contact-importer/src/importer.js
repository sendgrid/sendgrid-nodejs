/* eslint dot-notation: 'off' */
'use strict';

const Bottleneck = require('bottleneck');
const { EventEmitter } = require('events');
const chunk = require('lodash.chunk');
const debug = require('debug')('sendgrid');
const util = require('util');
const queue = require('async.queue');
const ensureAsync = require('async.ensureasync');

class ContactImporter extends EventEmitter {
  constructor(sg, options = {}) {
    super();

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

    this._setupQueue();
  }

  /**
   *  Add a new contact, or an array of contacts, to the end of the queue.
   *
   * @param {Array|Object} data A contact or array of contacts.
   */
  push(data = []) {
    data = Array.isArray(data) ? data : [data];

    // Add the new items onto the pending items.
    const itemsToProcess = this.pendingItems.concat(data);

    // Chunk the pending items into batches and add onto the queue
    const batches = chunk(itemsToProcess, this.batchSize);
    debug('generated batches %s from %s items', batches.length, data.length);

    batches.forEach((batch) => {
      // If this batch is full or the queue is empty queue it for processing.
      if (batch.length === this.batchSize || !this.queue.length()) {
        this._pushToQueue(batch);
      } else {
      // Otherwise, it store it for later.
        debug('the last batch with only %s item is deferred (partial batch)', batch.length);
        this.pendingItems = batch;
      }
    });

    debug('batches in queue: %s', this.queue.length());
    debug('items in deferred queue: %s', this.pendingItems.length);
  }

  /**
   * Send a batch of contacts to Twilio SendGrid.
   *
   * @param {Object} task Task to be processed (data in 'data' property)
   * @param {Function} callback Callback function.
   */
  _worker(task, callback) {
    const context = task.owner;
    debug('processing batch (%s items)', task.data.length);
    context.throttle.submit(context._sendBatch, context, task.data, callback);
  }

  _sendBatch(context, data, callback) {
    debug('sending batch (%s items)', data.length);

    const request = {
      method: 'POST',
      path: '/v3/contactdb/recipients',
      body: data,
    };

    context.sg.request(request)
      .then(([response]) => {
        debug('got response: %o', response);
        setTimeout(() => {
          context.throttle.incrementReservoir(1);
        }, context.rateLimitPeriod);
        return callback(null, response);
      })
      .catch((error) => {
        debug('got error, %o', error);
        setTimeout(() => {
          context.throttle.incrementReservoir(1);
        }, context.rateLimitPeriod);
        return callback(error);
      });
  }

  /**
  * Emit the result of processing a batch.
  *
  * @param {Object} error
  * @param {Object} result
  */
  _notify(error, result, batch) {
    if (error) {
      return this.emit('error', error, batch);
    }
    return this.emit('success', result, batch);
  }

  /**
   * Sets up the queue object on this instance of ContactImporter
   */
  _setupQueue() {
    // Create a queue that wil be used to send batches to the throttler.
    this.queue = queue(ensureAsync(this._worker));

    // When the last batch is removed from the queue, add any incomplete batches.
    this.queue.empty = () => {
      if (!this.pendingItems.length) {
        return;
      }

      debug('adding %s items from deferrd queue for processing', this.pendingItems.length);

      const batch = this.pendingItems.splice(0);
      this._pushToQueue(batch);
    };

    // Emit an event when the queue is drained.
    this.queue.drain = () => {
      this.emit('drain');
    };
  }

  /**
   * Takes a batch and pushes it to the queue, handling the result as well.
   *
   * @param {Array} batch A batch to send to the queue.
   */
  _pushToQueue(batch) {
    this.queue.push({
      data: batch,
      owner: this,
    }, (error, result) => {
      if (error) {
        return this._notify(error, error.response.body, batch);
      }
      return this._notify(null, result.body, batch);
    });
  }
}

module.exports = ContactImporter;
