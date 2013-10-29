"use strict";

var package_json    = require('./../package.json');
var nodemailer      = require('nodemailer');
var _               = require('lodash');
var request         = require('request');
var Email           = require('./email');
var SmtpapiHeaders  = require('./smtpapi_headers');
var Sendgrid = function(api_user, api_key, options) {

  if( !(this instanceof Sendgrid) ) {
    return new Sendgrid(api_user, api_key, options);
  }

  var _this         = this;
  this.options      = options || {};
  this.options.web  = this.options.web || {};
  this.options.port = this.options.port || 587;

  var send = function() {
    if ( _this.options.api === 'smtp') {
      smtp.apply(this, arguments);
      return true;
    }

    web.apply( this, arguments );
  };

  /*
   * Sends an email via web and returns true if the
   * message was sent successfully.
   *
   * @param  {Email|Object}  email     An email object or a hash that has
   *                                   the values for the email to be sent.
   * @param  {Function}      callback  A function to call when the processing is done.
   *                                   This parameter is optional.
   */
  var web = function(email, cb) {
    var callback    = cb || function() { };
    if (email.constructor !== Email) {
      email = new Email(email);
    }

    _sendWeb.bind(this)(email, callback);
  }.bind(this);

  /*
   * Sends an email via SMTP and returns true if the
   * message was sent successfully.
   *
   * @param    {Email|Object}  email                     An email object or a hash that has
   *                                                     the values for the email to be sent.
   * @param    {Object}        nodeMailerOptions         Extra options for nodeMailer. i.e. Message-Id
   *                                                     This parameter is optional.
   * @param    {Function}      callback                  A function to call when the processing is done.
   *                                                     This parameter is optional.
   */
  var smtp = function(email, nodeMailerOptions, cb) {

    // Support a callback without nodeMailerOptions
    if (! cb && typeof nodeMailerOptions === "function") {
      callback = nodeMailerOptions;
      nodeMailerOptions = null;
    }

    var callback = cb || function() { };

    if (email.constructor !== Email) {
      email = new Email(email);
    }

    _sendSmtp(email, nodeMailerOptions, callback);
  };

  /*
   * Psuedo-private methods
   */
  var _sendWeb = function(email, callback) {
    var postOptions = {
      method    : 'POST',
      uri       : "https://sendgrid.com/api/mail.send.json"
    };

    var options = _.merge(this.options.web, postOptions);

    var req   = request(options, function(err, resp, body) {
      var json;

      if(err) return callback(err, null);
      
      try {
        json = JSON.parse(body);
      } catch (e) {
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
    form['api_user']  = api_user;
    form['api_key']   = api_key;

    var reqForm = req.form();

    var _reqFormAppend = function(field, value) {
      console.log('fields', field, value);
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
          }else{
            console.log('field', field, value);
            value.forEach(_reqFormAppend.bind(this, field));

          }
        } catch(err) {}
      }
    }
  };

  var _sendSmtp = function(email, nodeMailerOptions, callback) {
    // SMTP settings
    var smtp_settings = {
      host: "smtp.sendgrid.net",
      port: parseInt(_this.port, 10),
      requiresAuth: true,
      auth: {
        user: api_user,
        pass: api_key
      }
    };

    if (smtp_settings.port == 465) {
      smtp_settings['secureConnection'] = true;
    }

    var smtpTransport = nodemailer.createTransport(_this.SMTP, smtp_settings);

    var smtpParams = email.toSmtpFormat();

    if (_.isObject(nodeMailerOptions)) {
      _.extend(smtpParams, nodeMailerOptions);
    }

    smtpTransport.sendMail(smtpParams, function(error, response) {

      smtpTransport.close();
      if(error) { return callback(new Error(error.message), null);}

      return callback(null, {'message': 'success'});
    });
  };


  /*
   * Expose public API calls
   */
  this.version         = package_json.version;
  this.SMTP            = "SMTP";
  this.Email           = Email;
  this.SmtpapiHeaders  = SmtpapiHeaders;
  this.api_user        = api_user;
  this.api_key         = api_key;
  this.web             = web;
  this.smtp            = smtp;
  this.send            = send;
  this.options         = this.options;
  this.port            = this.options.port;
  return this;
};

module.exports = Sendgrid;
