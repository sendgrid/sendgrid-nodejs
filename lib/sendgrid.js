"use strict";

var package_json    = require('./../package.json');
var nodemailer      = require('nodemailer');
var _               = require('underscore');
var request         = require('request');
var Email           = require('./email');
var SmtpapiHeaders  = require('./smtpapi_headers');

module.exports = function(api_user, api_key) {
  var self;

  var send = function(email, callback) {
    web(email, callback);
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
    self            = this;
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
    self            = this;

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
          reqForm.append(field, value);
        } catch(err) {}
      }
    }
  }

  var _sendSmtp = function(email, nodeMailerOptions, callback) {
    // SMTP settings
    var smtp_settings = {
      host: "smtp.sendgrid.net",
      port: parseInt(self.port),
      requiresAuth: true,
      auth: {
        user: api_user,
        pass: api_key
      }
    }
    if (smtp_settings.port == 465) {
      smtp_settings['secureConnection'] = true;
    }

    var smtpTransport = nodemailer.createTransport(self.SMTP, smtp_settings);

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
  return {
    version         : package_json.version,
    port            : 587,
    SMTP            : "SMTP",
    Email           : Email,
    SmtpapiHeaders  : SmtpapiHeaders,
    api_user        : api_user,
    api_key         : api_key,
    web             : web,
    smtp            : smtp,
    send            : send
  };
}
