"use strict";

var request = require('request');

var Email = require('./email');

/**
 * Class to handle managing Distribution lists
 *
 */
var Lists = function(sendgrid, params) {

    params = params || {};

    this.sendgrid = sendgrid;
    this.params = params;

    this.Email = new Email(sendgrid, {});
};

/**
 * Adds an new distribution list
 *
 * @param  {string}         listname        The name of the new list
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Lists.prototype.add = function(listname, callback) {

    var req = {
        url: 'https://sendgrid.com/api/newsletter/lists/add.json',
        qs: this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                list: listname
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
                body: body
            });
        }
    });
};

/**
 * Deletes a distribution list
 *
 * @param  {string}         listname        The name of the list to delete
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Lists.prototype.del = function(listname, callback) {

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/lists/delete.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                list: listname
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
 * Get all of the distribution lists on your account.
 * Optionally search for a specific list name.
 *
 * @param  {string}         listname        Optional. The name of the list to search for.
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Lists.prototype.get = function(listname, callback) {

    if (typeof(listname) === 'function') {
        callback = listname;
        listname = null;
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/lists/get.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            listname ? {
                list: listname
            } : {}),
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
 * Edit a distribution list
 *
 * @param  {string}         listname        The name of the list
 * @param  {string}         newListname     The name to change the list to
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Lists.prototype.edit = function(listname, newListname, callback) {

    if ((typeof(listname) !== 'string') || (typeof(newListname) !== 'string')) {
        throw 'Missing required arguments';
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/lists/edit.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(), {
                list: listname,
                newlist: newListname
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
module.exports = Lists;
