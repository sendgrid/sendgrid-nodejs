"use strict";

var request = require('request');

/**
 * Class to handle mapping lists to a newsletter
 *
 */
var Recipients = function(sendgrid, params) {

    params = params || {};

    this.sendgrid = sendgrid;
    this.params = params;
};

/**
 * Adds a list to a newsletter as the recipients
 *
 * @param  {string}         newsletter      The name of the newsletter
 * @param  {string}         list            The name of the list to provide as the recipient
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Recipients.prototype.add = function(newsletter, list, callback) {

    if (!newsletter || !list) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/recipients/add.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                list: list,
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
 * Removes a list from a newsletters recipients
 *
 * @param  {string}         newsletter      The name of the newsletter
 * @param  {string}         list            The name of the list to remove
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Recipients.prototype.del = function(newsletter, list, callback) {

    if (!newsletter || !list) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/recipients/delete.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                list: list,
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
 * Gets the list of recipients for a newsletter
 *
 * @param  {string}         newsletter      The name of the newsletter
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Recipients.prototype.get = function(newsletter, callback) {

    if (!newsletter) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/recipients/get.json',
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
module.exports = Recipients;
