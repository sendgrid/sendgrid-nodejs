"use strict";

var querystring = require('querystring');
var https = require('https');
var _ = require('underscore');
var fs = require('fs');
var SmtpapiHeaders = require('./smtpapi_headers');

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
    files: {},
    file_data: {},
    headers: {}
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
  //TODO: add validation
}

Email.prototype.setHeaders = function(val) {
  if (_.isObject(val)) {
    this.headers = val;
  }
}

Email.prototype.addHeaders = function(val){
  if (_.isObject(val)) {
    _.extend(this.headers, val);
  }
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

Email.prototype.setSection = function(val) {
  this.smtpapi.setSection(val);
}

Email.prototype.addSection = function(val) {
  this.smtpapi.addSection(val);
}

Email.prototype.addFilterSetting = function(filter, setting, val) {
  this.smtpapi.addFilterSetting(filter, setting, val);
}

Email.prototype.setFilterSetting = function(filters) {
  this.smtpapi.setFilterSetting(filters);
}

Email.prototype.addFile = function(filename, filepath) {
  this.files[filename] = filepath;
}

Email.prototype.processFiles = function(callback) {
  var self = this;
  var attachments_count = _.size(this.files);
  _(this.files).each(function(v, k) {
    fs.readFile(v, function(error, data) {
      attachments_count--;
      if (error) {
        return callback(false, error);
      } else {
        self.file_data[k] = data;
      }

      if (attachments_count == 0) {
        callback(true);
      }
    });
  });
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
    headers: JSON.stringify(this.headers)
  };

  this.updateMissingTo(data);

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
    headers: this.headers
  };
  data.headers['x-smtpapi'] = this.smtpapi.toJson();

  if (_.size(this.file_data) > 0) {
    var attachments = [];
    _(this.file_data).each(function(v, k) {
      attachments.push({filename: k, contents: v});
    });
    data.attachments = attachments;
  }

  this.updateMissingTo(data);

  return data;
}

/*
 * There needs to be at least 1 to address, or else the mail won't send.
 * This method modifies the data that will be sent via either Rest or SMTP.
 *
 * @param  {object}  data  The data parameter to send via Rest or SMTP
 */
Email.prototype.updateMissingTo = function(data) {
  if (_.isEmpty(data.to) && this.smtpapi.to && !_.isEmpty(this.smtpapi.to)) {
    data.to = this.from;
  }
}

Email.prototype.hasFiles = function() {
  return _(this.files).size() > 0;
}

module.exports = Email;
