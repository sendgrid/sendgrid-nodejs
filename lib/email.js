"use strict";

var querystring = require('querystring');
var https = require('https');
var _ = require('underscore');
var SmtpapiHeaders = require('./smtpapi_headers');

function EmailHeaders() {

}

function Email(params) {
  /*
   * Default parameters for sending mail
   */
  var default_mail_params = {
    to: [],
    from: '',
    smtpapi: new SmtpapiHeaders(),
    subject: '',
    text: '',
    html: '',
    bcc: [],
    replyto: '',
    date: new Date(),
    files: [],
    headers: new EmailHeaders()
  };

  _.extend(this, default_mail_params, params);
}

/*
 * Validates an email. This is used before sending, but
 * can still be invoked programatically
 *
 * @return {Boolean} The result of the validation
 */
Email.prototype.validate = function() {
  return false;
}

Email.prototype.addTo = function(to) {
  this.smtpapi.addTo(to);
}

Email.prototype.addSubVal = function(key, val) {
  this.smtpapi.addSubVal(key, val);
}

Email.prototype.setUniqueArgs = function(val) {
  this.smtpapi.setUniqueArgs(val);
}

Email.prototype.addUniqueArgs = function (val) {
  this.smtpapi.addUniqueArgs(val);
}

Email.prototype.setCategory = function(val) {
  this.smtpapi.setCategory(val);
}

Email.prototype.addCategory = function(val) {
  this.smtpapi.addCategory(val);
}

Email.prototype.addFilterSetting = function(filter, setting, val) {
  this.smtpapi.addFilterSetting(filter, setting, val);
}

Email.prototype.setFilterSetting = function(filters) {
  this.smtpapi.setFilterSetting(filters);
}

Email.prototype.addFile = function(filename) {
  this.files.push(filename);
}

Email.prototype.toWebFormat = function() {
  var data = {
    to: this.to,
    from: this.from,
    'x-smtpapi': this.smtpapi.toJson(),
    subject: this.subject,
    text: this.text,
    html: this.html,
    bcc: this.bcc,
    replyto: this.replyto,
    date: this.date,
    files: this.files,
    headers: this.headers
  };

  // there needs to be at least 1 to address.
  // If it is missing, just copy over the from.
  if (_.isEmpty(data.to)) {
    data.to = data.from;
  }

  return data;
}

Email.prototype.toSmtpFormat = function() {
  var data = {
    to: this.to,
    sender: this.from,
    subject: this.subject,
    body: this.text,
    html: this.html,
    reply_to: this.replyto,
    headers: {
      "x-smtpapi": this.smtpapi.toJson()
    }
  };

  // there needs to be at least 1 to address.
  // If it is missing, just copy the sender.
  if (_.isEmpty(data.to)) {
    data.to = data.sender;
  }

  return data;
}

module.exports = Email;
