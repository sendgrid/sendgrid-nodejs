"use strict";

var https = require('https');
var http = require('http');
var Step = require('step');
var SmtpapiHeaders = require('./smtpapi_headers');
var FileHandler = require('./file_handler');
var _ = require('underscore');

/**
 * Class to handle storing the properties relative to an email.
 *
 * @param  {Object}          params
 * @param  {string|array}    params.to       The to address(es) of the email
 * @param  {string|array}    params.fromname The display name of the email recipients
 * @param  {string}          params.from     The from address of the email
 * @param  {string}          params.fromname The display name of the email sender
 * @param  {SmtpapiHeaders}  params.smtpapi  The SendGrid x-smtpapi headers object
 * @param  {string}          params.subject  The subject of the email
 * @param  {string}          params.text     The text/plain content of an email
 * @param  {string}          params.html     The text/html content of an email
 * @param  {string|array}    params.bcc      The bcc address(es) of the email
 * @param  {Date}            params.date     The date of the email
 * @param  {object}          params.headers  The custom headers on an email
 */
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

  if(params.toname != null) {
    this.toname = params.toname;
  }
  if(params.fromname != null) {
    this.fromname = params.fromname;
  }
  // auto handle calling the constructor for the file handler
  this.files = [];
  if (params.files) {
    params.files.forEach(function(file) {
      this.files.push(new FileHandler(file));
    }, this);
  }
}

/**
 * Validates an email. This is used before sending, but
 * can still be invoked programatically
 *
 * @return  {Boolean}  The result of the validation
 */
Email.prototype.validate = function() {
  //TODO: add validation
};

/**
 * This method sets the headers on an email, if the value passed in is an object.
 *
 * @param  {object}  val  An object of custom headers
 */
Email.prototype.setHeaders = function(val) {
  if (_.isObject(val)) {
    this.headers = val;
  }
};

/**
 * This method will add a header, or multiple headers, to an email.
 *
 * @param  {object}  val  An object of custom headers
 */
Email.prototype.addHeaders = function(val) {
  if (_.isObject(val)) {
    _.extend(this.headers, val);
  }
};

/**
 * This method is a proxy for adding a to address to the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.addTo
 */
Email.prototype.addTo = function(to) {
  this.smtpapi.addTo(to);
};

/**
 * This method is a proxy for the add sub val on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.addSubVal
 */
Email.prototype.addSubVal = function(key, val) {
  this.smtpapi.addSubVal(key, val);
};

/**
 * This method is a proxy for setting unique args on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.setUniqueArgs
 */
Email.prototype.setUniqueArgs = function(val) {
  this.smtpapi.setUniqueArgs(val);
};

/**
 * This method is a proxy for adding unique args on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.addUniqueArgs
 */
Email.prototype.addUniqueArgs = function (val) {
  this.smtpapi.addUniqueArgs(val);
};

/**
 * This method is a proxy for setting categories on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.setCategory
 */
Email.prototype.setCategory = function(val) {
  this.smtpapi.setCategory(val);
};

/**
 * This method is a proxy for adding categories on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.addCategory
 */
Email.prototype.addCategory = function(val) {
  this.smtpapi.addCategory(val);
};

/**
 * This method is a proxy for setting sections on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.setSection
 */
Email.prototype.setSection = function(val) {
  this.smtpapi.setSection(val);
};

/**
 * This method is a proxy for adding sections on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.addSection
 */
Email.prototype.addSection = function(val) {
  this.smtpapi.addSection(val);
};

/**
 * This method is a proxy for adding a filter setting on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.addFilterSetting
 */
Email.prototype.addFilterSetting = function(filter, setting, val) {
  this.smtpapi.addFilterSetting(filter, setting, val);
};

/**
 * This method is a proxy for setting a filter setting on the SmtpapiHeaders
 *
 * @see SmtpapiHeaders.setFilterSetting
 */
Email.prototype.setFilterSetting = function(filters) {
  this.smtpapi.setFilterSetting(filters);
};

/**
 * This method adds a file to the email object as an attachment
 * It uses the FileHandler object.
 *
 * @param  {object}  file_object  The file object
 *
 * @see FileHandler
 */
Email.prototype.addFile = function(file_object) {
  this.files.push(new FileHandler(file_object));
};

/**
 * This method is used to process files. It uses step.js to asychronously load the contents of each file.
 *
 * @param  {function}  callback  The callback to call when the method returns
 */
Email.prototype.processFiles = function(callback) {
  var self = this;

  function handleFiles() {
    for(var i in self.files) {
      self.files[i].loadContent(this.parallel());
    }
  };

  function finish(err, messages) {
    if (err) {
      callback(false, messages);
    } else {
      callback(true);
    }
  };

  Step(handleFiles, finish);
};

/**
 * This method returns the email object is a format to be consumed by the SendGrid.send
 * using the web api
 *
 * @see SendGrid.send
 */
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

  if (this.fromname != null) {
    data.fromname = this.fromname;
  }
  if (this.toname != null) {
    data.toname = this.toname;
  }
  this.updateMissingTo(data);

  return data;
};

/**
 * This method returns the email object is a format to be consumed by the SendGrid.smtp
 * using the smtp api
 *
 * @see SendGrid.smtp
 */
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

/**
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

/**
 * This method is used to show if there are files on this email object
 *
 * @return boolean
 */
Email.prototype.hasFiles = function() {
  return _(this.files).size() > 0;
};

// export the object as the only object in this module
module.exports = Email;
