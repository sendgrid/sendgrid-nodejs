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

SmtpapiHeaders.prototype.addTo = function(to) {
}

SmtpapiHeaders.prototype.addSubVal = function(key, val) {
}

SmtpapiHeaders.prototype.setUniqueArgs = function(val) {
}

SmtpapiHeaders.prototype.setCategory = function(val) {
}

SmtpapiHeaders.prototype.addFilterSetting = function(filter, setting, val) {
}
module.exports = Email;
