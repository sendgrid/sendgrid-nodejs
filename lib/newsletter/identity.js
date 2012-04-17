"use strict";

var request = require('request');

/**
 * Class to handle managing identities
 *
 */
var Identity = function(sendgrid, params) {

    params = params || {};

    this.sendgrid = sendgrid;
    this.params = params;
};

/**
 * Adds an new identity to your sendgrid account
 *
 * @param  {Object}         data            The data object representing the new identity
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Identity.prototype.add = function(data, callback) {

    // Validate required parameters
    if (!data.identity || !data.name ||
        !data.email || !data.address ||
        !data.city || !data.state ||
        !data.zip || !data.country) {
        throw "Missing required paramters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/identity/add.json',
        form  : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            data),
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
 * Remove an identity
 *
 * @param  {string}         identity        The name of the identity to remove
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Identity.prototype.del = function(identity, callback) {

    if (!identity) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/identity/delete.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                identity: identity
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
 * Get an identity
 *
 * @param  {string}         identity        The name of the identity to get
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Identity.prototype.get = function(identity, callback) {

    if (!identity) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/identity/get.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                identity: identity
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
 * Gets the identities for the account, and optionally matching the supplied name
 *
 * @param  {string}         identity        Optional. An identity name to search for.
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Identity.prototype.list = function(identity, callback) {

    if (typeof(identity) === 'function') {
        callback = identity;
        identity = null;
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/identity/list.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            identity ? {
                identity: identity
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
 * Update an  identity in your sendgrid account
 *
 * @param  {Object}         data            The data object representing the identity to update
 * @param  {Function}       callback        A function to call when the processing is done.
 */
Identity.prototype.edit = function(data, callback) {

    // Validate required parameters
    if (!data.identity) {
        throw "Missing required paramters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/identity/edit.json',
        form  : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            data),
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
 // export the object as the only object in this module
 */
module.exports = Identity;
