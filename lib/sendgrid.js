"use strict";

var package_json  = require('./../package.json');
var nodemailer    = require('nodemailer');
var request       = require('request');
var Email         = require('./email');


/*
 * Class for handling communications with SendGrid.
 *
 * @param  {String}  api_user  The SendGrid username.
 * @param  {String}  api_key   The key credentials for SendGrid.
 */
function SendGrid(api_user, api_key) {
  this.api_user     = api_user;
  this.api_key      = api_key;
  this.version      = package_json.version;
  this.SMTP         = "SMTP";
  if (process.env.NODE_ENV == "test") {
    this.SMTP = "STUB";
  }
}

/*
 * Sends an email via web. See .web method for more details.
 *
 */
SendGrid.prototype.send = function(email, callback) {
  this.web(email, callback);
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
SendGrid.prototype.web = function(email, callback) {
  var api_user  = this.api_user;
  var api_key   = this.api_key;

  var self = this
    , cb = callback || function() { };

  if (email.constructor !== Email) {
    email = new Email(email);
  }

  function send_web() {
    var req   = request({
      method    : 'POST',
      uri       : "https://sendgrid.com/api/mail.send.json"
    }, function(err, resp, body) {
      if (err) {
        return cb(false, err);
      } else {
        try {
          var json = JSON.parse(body);
          return cb(json.message == 'success', json.errors);
        } catch (err) {
          cb(false, "Invalid JSON response from server");
        }
      } 
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

  send_web();
};

/*
 * Sends an email via SMTP and returns true if the
 * message was sent successfully.
 *
 * @param    {Email|Object}  email     An email object or a hash that has
 *                                     the values for the email to be sent.
 * @param    {Function}      callback  A function to call when the processing is done.
 *                                     This parameter is optional.
 */
SendGrid.prototype.smtp = function(email, callback) {
  var self = this
    , smtpTransport
    , cb = callback || function() { };

  // SMTP settings
  smtpTransport = nodemailer.createTransport(this.SMTP, {
    service: 'SendGrid',
    auth: {
      user: this.api_user,
      pass: this.api_key
    }
  });

  function send_smtp() {
    smtpTransport.sendMail(email.toSmtpFormat(), function(error, response) {
      smtpTransport.close();
      if(error) {
        return cb(false, error.data);
      }
      return cb(true, response);
    });
  }

  if (email.constructor !== Email) {
    email = new Email(email);
  }

  send_smtp();
};

module.exports = SendGrid;
