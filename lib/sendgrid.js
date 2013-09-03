"use strict";

var package_json    = require('./../package.json');
var nodemailer      = require('nodemailer');
var _               = require('underscore');
var request         = require('request');
var Email           = require('./email');
var SmtpapiHeaders  = require('./smtpapi_headers');
var Sendgrid = function(api_user, api_key, options) {

  if( !(this instanceof Sendgrid) ) {
    return new Sendgrid(api_user, api_key, options);
  }

  var _this         = this;
  this.options      = options || {};
  this.options.port = this.options.port || 587;

  var send = function() {
    if ( _this.options.api === 'smtp') {
      smtp.apply(this, arguments);
      return true;
    }

    web.apply( this, arguments );
  }

  /*
   * Sends an email via web and returns true if the
   * message was sent successfully.
   *
   * @param  {Email|Object}  email     An email object or a hash that has
   *                                   the values for the email to be sent.
   * @param  {Function}      callback  A function to call when the processing is done.
   *                                   This parameter is optional.
   */
  var web = function(email, callback) {
    var callback    = callback || function() { };
    if (email.constructor !== Email) {
      email = new Email(email);
    }

    _sendWeb(email, callback);
  };

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
  var smtp = function(email, nodeMailerOptions, callback) {

    // Support a callback without nodeMailerOptions
    if (! callback && typeof nodeMailerOptions === "function") {
      callback = nodeMailerOptions;
      nodeMailerOptions = null;
    }

    var callback = callback || function() { };

    if (email.constructor !== Email) {
      email = new Email(email);
    }

    _sendSmtp(email, nodeMailerOptions, callback);
  };

  /*
   * Psuedo-private methods
   */
  var _sendWeb = function(email, callback) {
    var req   = request({
      method    : 'POST',
      uri       : "https://sendgrid.com/api/mail.send.json"
    }, function(err, resp, body) {
      if(err) return callback(err, null);
      var json = JSON.parse(body);

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
            reqForm.append(field, value);
          }else{
            value.forEach(function(each){
              reqForm.append(field, each);
            });
          }
        } catch(err) {}
      }
    }
  }

  var _sendSmtp = function(email, nodeMailerOptions, callback) {
    // SMTP settings
    var smtp_settings = {
      host: "smtp.sendgrid.net",
      port: parseInt(_this.port),
      requiresAuth: true,
      auth: {
        user: api_user,
        pass: api_key
      }
    }
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
      if(error) { return callback(new Error(error.data), null);}

      return callback(null, {'message': 'success'});
    });
  }


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
