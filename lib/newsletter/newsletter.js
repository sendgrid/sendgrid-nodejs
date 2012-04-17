"use strict";

var request = require('request'),
    Identity = require('./identity.js'),
    Lists = require('./lists.js'),
    Recipients = require('./recipients'),
    Schedule = require('./schedule');

/**
 * Class to handle Newsletter and all of the surrounding APIs
 *
 * newsletter.Identity to manage Identities
 * newsletter.Lists to manage DLs
 * newsletter.Lists.Email to manage list recipients
 * newsletter.Recipients to map lists to newsletters
 * newsletter.Schedule to schedule newsletters for delivery
 *
 */
function Newsletter(sendgrid, params) {

    params = params || {};

    this.sendgrid = sendgrid;
    this.params = params;

    this.Identity = new Identity(sendgrid, {});
    this.Lists = new Lists(sendgrid, {});
    this.Recipients = new Recipients(sendgrid, {});
    this.Schedule = new Schedule(sendgrid, {});
}

/**
 * Create a new newsletter
 *
 * @param  {Object}         data        The newsletter to add.
 * @param  {Function}       callback    A function to call when the processing is done.
 */
// TODO Better document schema for data object
Newsletter.prototype.add = function(data, callback) {

    if (!data.identity || !data.name ||
        !data.subject || !data.text ||
        !data.html) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/add.json',
        form    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                list: listname
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
 * Edit a new newsletter
 *
 * @param  {Object}         data        The newsletter to update
 * @param  {Function}       callback    A function to call when the processing is done.
 */
// TODO Better document schema for data object
Newsletter.prototype.edit = function(data, callback) {

    if (!data.identity || !data.name ||
        !data.subject || !data.text ||
        !data.html || data.newname) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/edit.json',
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
 * Get a newsletter by name
 *
 * @param  {string}         name        The newsletter to get
 * @param  {Function}       callback    A function to call when the processing is done.
 */
Newsletter.prototype.get = function(name, callback) {

    if (!name) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/get.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                name: name
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
 * Lists all of your newsletters. Optionally search for a specific newsletter
 *
 * @param  {string}         name        Optional. The newsletter to search for
 * @param  {Function}       callback    A function to call when the processing is done.
 */
Newsletter.prototype.list = function(name, callback) {

    if (typeof(name) === 'function') {
        callback = name;
        name = null;
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/list.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            name ? {
                name: name
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
 * Delete a new newsletter
 *
 * @param  {string}         name        The newsletter to delete
 * @param  {Function}       callback    A function to call when the processing is done.
 */
Newsletter.prototype.del = function(name, callback) {

    if (!name) {
        throw "Missing required parameters";
    }

    var req = {
        url   : 'https://sendgrid.com/api/newsletter/delete.json',
        qs    : this.sendgrid.merge(
            this.sendgrid.addAuthKeys(),
            {
                name: name
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
module.exports = Newsletter;
