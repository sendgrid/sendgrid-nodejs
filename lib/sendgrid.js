"use strict";

var package_json    = require('./../package.json');
var _               = require('lodash');
var request         = require('request');
var smtpapi_lib     = require('smtpapi');
var Email           = require('./email');
var SubUser         = require('./subuser');
var Sendgrid = function(apiUserOrKey, apiKeyOrOptions, options) {

  if( !(this instanceof Sendgrid) ) {
    return new Sendgrid(apiUserOrKey, apiKeyOrOptions, options);
  }

  // Check if given a username + password or api key
  if (typeof apiKeyOrOptions === 'string') {
    // Username and password
    this.api_user = apiUserOrKey;
    this.api_key  = apiKeyOrOptions;
    this.options  = options || {};
  } else if (typeof apiKeyOrOptions === 'object' || apiKeyOrOptions === undefined) {
    // API key
    this.api_key  = apiUserOrKey;
    this.api_user = null;

    // With options
    this.options = apiKeyOrOptions || {};
  } else {
    // Won't be thrown?
    throw new Error('Need a username + password or api key!');
  }

  var _this         = this;
  
  // do this to mantain similarity to other libs
  var uriParts = {};
  uriParts.protocol = this.options.protocol || "https";
  uriParts.host = this.options.host || "api.sendgrid.com";
  uriParts.port = this.options.port || "";
  uriParts.endpoint = this.options.endpoint || "/api/mail.send.json";
  delete this.options.protocol;
  delete this.options.host;
  delete this.options.port;
  delete this.options.endpoint;
  this.options.uriParts = uriParts;

  this.options.uri = this.options.uri || uriParts.protocol + "://" + uriParts.host + (uriParts.port ? ":" + uriParts.port : "") + uriParts.endpoint;

  var send = function(email, callback) {
    var callback    = callback || function() { };
    if (email.constructor !== Email) {
      email = new Email(email);
    }

    _send.bind(this)(email, callback);
  };

  var _send = function(email, callback) {
    var postOptions = {
      method    : 'POST',
      headers   : {
        'User-Agent': 'sendgrid/' + package_json.version + ';nodejs'
      }
    };

    // Using api key
    if (this.api_user === null) {
      postOptions.headers['Authorization'] = 'Bearer ' + this.api_key;
    }

    var options = _.merge(postOptions, this.options);

    var req = request(options, function(err, resp, body) {
      var json;

      if(err) return callback(err, null);
      
      try {
        json = JSON.parse(body);
      } catch (e) {
        // be more granular with the error message
        e.message = e.message + " JSONPARSEERROR when parsing: " + body;
        return callback(new Error(e), null);
      }

      if (json.message !== 'success') {
        var error = 'sendgrid error';
        if (json.errors) { error = json.errors.shift(); }
        return callback(new Error(error), null);
      }

      return callback(null, json);
    });

    var form          = email.toWebFormat();

    // Using username + password
    if (this.api_user !== null) {
      form['api_user']  = this.api_user;
      form['api_key']   = this.api_key;
    }

    var reqForm = req.form();

    var _reqFormAppend = function(field, value) {
      reqForm.append(field, value);
    };

    for (var field in form) {
      var value = form[field];
      if (value && value.filename) {
        if (value.cid) {
          reqForm.append("content["+value.filename+"]", value.cid);
        }
        reqForm.append("files["+value.filename+"]", value.content, {filename: value.filename, contentType: value.contentType});
      } else {
        try {
          if(!Array.isArray(value)){
            //reqForm.append(field, value);
            _reqFormAppend.bind(this)(field, value);
          } else {
            value.forEach(_reqFormAppend.bind(this, field));
          }
        } catch(err) {}
      }
    }
  };

  /*
   * Expose public API calls
   */
  this.version         = package_json.version;
  this.Email           = Email;
  this.smtpapi         = smtpapi_lib;
  this.send            = send;
  this.subUser   = new SubUser({api_user: apiUserOrKey, api_key: apiKeyOrOptions});
  this.options         = this.options;
  return this;
};

module.exports = Sendgrid;
