"use strict";

var https = require('https');
var http = require('http');
var step = require('step');
var SmtpapiHeaders = require('./smtpapi_headers');
var FileHandler = require('./file_handler');

function Email(params) {

  params = params || {};

  this.to      = params.to      || [];
  this.from    = params.from    || '';
  this.smtpapi = params.smtpapi || new SmtpapiHeaders();
  this.subject = params.subject || '';
  this.text    = params.text    || '';
  this.html    = params.html    || '';
  this.bcc     = params.bcc     || [];
  this.replyto = params.replyto || '';
  this.date    = params.date    || new Date();
  this.headers = params.headers || {};

  // auto handle calling the constructor for the file handler
  this.files = [];
  for (var i in params.files) {
    var file_handler = new FileHandler(params.files[i]);
    this.files.push(file_handler);
  }
}

/*
 * Validates an email. This is used before sending, but
 * can still be invoked programatically
 *
 * @return {Boolean} The result of the validation
 */
Email.prototype.validate = function() {
  //TODO: add validation
};

Email.prototype.setHeaders = function(val) {
  if (_.isObject(val)) {
    this.headers = val;
  }
};

Email.prototype.addHeaders = function(val) {
  if (_.isObject(val)) {
    _.extend(this.headers, val);
  }
};

Email.prototype.addTo = function(to) {
  this.smtpapi.addTo(to);
};

Email.prototype.addSubVal = function(key, val) {
  this.smtpapi.addSubVal(key, val);
};

Email.prototype.setUniqueArgs = function(val) {
  this.smtpapi.setUniqueArgs(val);
};

Email.prototype.addUniqueArgs = function (val) {
  this.smtpapi.addUniqueArgs(val);
};

Email.prototype.setCategory = function(val) {
  this.smtpapi.setCategory(val);
};

Email.prototype.addCategory = function(val) {
  this.smtpapi.addCategory(val);
};

Email.prototype.setSection = function(val) {
  this.smtpapi.setSection(val);
};

Email.prototype.addSection = function(val) {
  this.smtpapi.addSection(val);
};

Email.prototype.addFilterSetting = function(filter, setting, val) {
  this.smtpapi.addFilterSetting(filter, setting, val);
};

Email.prototype.setFilterSetting = function(filters) {
  this.smtpapi.setFilterSetting(filters);
};

Email.prototype.addFile = function(file_object) {
  this.files.push(new FileHandler(file_object));
};

Email.prototype.processFiles = function(callback) {
  var self = this;
  step(
    function handleFiles() {
      for(var i in self.files) {
        self.files[i].loadContent(this.parallel());
      }
    },
    function finish(err, messages) {
      if (err) {
        callback(false, messages);
      } else {
        callback(true);
      }
    }
  );
};

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
};

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

  if (_.size(this.files) > 0) {
    var attachments = [];
    _(this.files).each(function(file) {
      attachments.push({filename: file.filename, contents: file.content});
    });
    data.attachments = attachments;
  }

  this.updateMissingTo(data);

  return data;
};

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
};

Email.prototype.hasFiles = function() {
  return _(this.files).size() > 0;
};

module.exports = Email;
