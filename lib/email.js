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

  this.params = _.extend(default_mail_params, params);
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

module.exports = Email;
