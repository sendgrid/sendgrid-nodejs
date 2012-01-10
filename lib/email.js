"use strict";

var querystring = require('querystring');
var https = require('https');
var _ = require('underscore');

function SmtpapiHeaders() {

}

function EmailHeaders() {

}

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

function Email(params) {
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

module.exports = Email;
