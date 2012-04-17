"use strict";

var request = require('request');

/**
 * Class to handle scheduling a newsletter for delivery
 *
 */
var Schedule = function(sendgrid, params) {

    params = params || {};

    this.sendgrid = sendgrid;
    this.params = params;
};

/**
 * Schedules a newsletter for delivery. If delay is not specified the
 * newsletter is scheduled for immediate delivery
 *
 * @param  {string}         newsletter      The name of the newsletter to schedule
 * @param  {integer}        delay           Delay in minutes to schedule delivery
 * @param  {Function}       callback        A function to call when the processing is done.
 */
// TODO Add explicit support for At in lieu of delay
Schedule.prototype.add = function(newsletter, delay, callback) {

    if (!newsletter) {
        throw "Missing required parameters";
    }

    // Shift args if delay is not supplied
    if (typeof(delay) === 'function') {
        callback = delay;
        delay = null;
    }

    var data = {
        name: newsletter
    };

    if (delay) {
        data.delay = delay;
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/schedule/add.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            data),
        method: "get"
    };

    request(req, function(error, response, body) {
        if (error) {
            return callback(error);
        }
        else {
            return callback(error, {
                response: response,
                body    : body
            });
        }
    });
};

/**
 * Deletes a scheduled newsletter
 *
 * @param  {string}         newsletter      The name of the newsletter to unschedule
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Schedule.prototype.del = function(newsletter, callback) {

    if (!newsletter) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/schedule/delete.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                name: newsletter
            }),
        method: "get"
    };

    request(req, function(error, response, body) {
        if (error) {
            return callback(error);
        }
        else {
            return callback(error, {
                response: response,
                body    : body
            });
        }
    });
};

/**
 * Get the schedule for a scheduled newsletter
 *
 * @param  {string}         newsletter      The name of the newsletter to get the schedule for
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Schedule.prototype.get = function(newsletter, callback) {

    if (!newsletter) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/schedule/get.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                name: newsletter
            }),
        method: "get"
    };

    request(req, function(error, response, body) {
        if (error) {
            return callback(error);
        }
        else {
            return callback(error, {
                response: response,
                body    : body
            });
        }
    });
};

/**
 // export the object as the only object in this module
 */
module.exports = Schedule;
