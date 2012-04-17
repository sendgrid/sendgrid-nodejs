"use strict";

var request = require('request');

/**
 * Class to handle adding emails to an existing list
 *
 */
var Email = function(sendgrid, params) {

    params = params || {};

    this.sendgrid = sendgrid;
    this.params = params;
};

/**
 * Adds an email address to an existing list
 *
 * @param  {string}         listname        The name of the list to add to
 * @param  {Object}         data            The data object to add to the list
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Email.prototype.add = function(listname, data, callback) {

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/lists/email/add.json',
        form  : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                list: listname,
                data: JSON.stringify(data)
            }),
        method: "post"
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
 * Remove an email from a list
 *
 * @param  {string}         listname        The name of the list to remove from
 * @param  {string}         email           The email address to remove
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Email.prototype.del = function(listname, email, callback) {

    if (!listname || !email) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/lists/email/delete.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                list: listname,
                email: email
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
 * Gets the emails for a given list, and optionally matching the supplied email
 *
 * @param  {string}         listname        The name of the list to search
 * @param  {string}         email           Optional. An email address to search
 *                                          in the specified list
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Email.prototype.get = function(listname, email, callback) {

    if (!listname) {
        throw "Missing required parameters";
    }

    if (typeof(email) === 'function') {
        callback = email;
        email = null;
    }

    var data = {
        list: listname
    };

    if (email) {
        data.email = email;
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/lists/email/get.json',
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
 // export the object as the only object in this module
 */
module.exports = Email;
