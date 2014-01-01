"use strict";

var FileHandler     = require('./file_handler');
var smtpapi         = require('smtpapi');
var _               = require('lodash');
var request         = require('request');
var fs              = require('fs');

/**
 * Class to handle storing the properties relative to an email.
 *
 * @param  {Object}          params
 * @param  {string|array}    params.to       The to address(es) of the email
 * @param  {string|array}    params.toname   The display name of the email recipients
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
  this.smtpapi = params.smtpapi || new smtpapi.Header();
  this.subject = params.subject || '';
  this.text    = params.text    || '';
  this.html    = params.html    || '';
  this.bcc     = params.bcc     || [];
  this.replyto = params.replyto || '';
  this.date    = params.date    || new Date();
  this.headers = params.headers || {};

  if(params.toname !== null) {
    this.toname = params.toname;
  }
  if(params.fromname !== null) {
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

Email.prototype.addHeader = function(object_literal) {
  if (_.isObject(object_literal)) {
    _.extend(this.headers, object_literal);
  }
};

Email.prototype.setHeaders = function(object_literal) {
  if (_.isObject(object_literal)) {
    this.headers = object_literal;
  }
};

Email.prototype.addTo = function(to) {
  this.smtpapi.addTo(to);
};

Email.prototype.setTos = function(tos) {
  this.smtpapi.setTos(tos);
};

Email.prototype.setFrom = function(from) {
  this.from = from;
};

Email.prototype.setSubject = function(subject) {
  this.subject = subject;
};

Email.prototype.setText = function(text) {
  this.text = text;
};

Email.prototype.setHtml = function(html) {
  this.html = html;
};

Email.prototype.addSubstitution = function(key, val) {
  this.smtpapi.addSubstitution(key, val);
};

Email.prototype.setSubstitutions = function(substitutions) {
  this.smtpapi.setSubstitutions(substitutions);
};

Email.prototype.addUniqueArg = function (object_literal) {
  this.smtpapi.addUniqueArg(object_literal);
};

Email.prototype.setUniqueArgs = function(object_literal) {
  this.smtpapi.setUniqueArgs(object_literal);
};

Email.prototype.addCategory = function(val) {
  this.smtpapi.addCategory(val);
};

Email.prototype.setCategories = function(val) {
  this.smtpapi.setCategories(val);
};

Email.prototype.addSection = function(object_literal) {
  this.smtpapi.addSection(object_literal);
};

Email.prototype.setSections = function(object_literal) {
  this.smtpapi.setSections(object_literal);
};


Email.prototype.addFilter = function(filter, setting, val) {
  this.smtpapi.addFilter(filter, setting, val);
};

Email.prototype.setFilters = function(filters) {
  this.smtpapi.setFilters(filters);
};

Email.prototype.addFile = function(file_object) {
  this.files.push(new FileHandler(file_object));
};

Email.prototype.toWebFormat = function() {
  var web  = {
    to          : this.to,
    from        : this.from,
    'x-smtpapi' : this.smtpapi.jsonString(),
    subject     : this.subject,
    text        : this.text,
    html        : this.html,
    headers     : JSON.stringify(this.headers)
  };

  if (this.bcc)         { web.bcc          = this.bcc; }
  if (this.html)        { web.html         = this.html; }
  if (this.toname)      { web.toname       = this.toname; }
  if (this.fromname)    { web.fromname     = this.fromname; }
  if (this.replyto)     { web.replyto      = this.replyto; }
  if (this.smtpapi.to && this.smtpapi.to.length)  { web.to = ""; }

  this.updateMissingTo(web);

  if (this.files) {
    this.files.forEach(function(file) {

      if (file.url) {
        file.content  = request(file.url);
      } else if (file.path) {
        file.content  = fs.createReadStream(file.path);
      }

      web['files[' + file.filename + ']'] = {
        filename      : file.filename,
        content       : file.content || " ",
        contentType   : file.contentType,
        cid           : file.cid
      };
    });
  }

  return web;
};

Email.prototype._formatFilesForNodeMailer = function(files) {
  var self = this;
  if (files && files.length > 0) {
    files.forEach(function(file) {
      self._formatFileForNodeMailer(file);
    });
  }
};

Email.prototype._formatFileForNodeMailer = function(file) {
  if (file.filename) {
    file.fileName = file.filename;
  }
  if (file.path) {
    file.filePath = file.path;
  }
  if (file.url) {
    file.filePath = file.url;
  }
  if (file.content) {
    file.contents = file.content;
  }
  if (!file.filePath && !file.content && file.filename) {
    file.contents = " ";
  }
};

/**
 * There needs to be at least 1 to address, or else the mail won't send.
 * This method modifies the data that will be sent via either Rest 
 *
 * @param  {object}  data  The data parameter to send via Rest
 */
Email.prototype.updateMissingTo = function(data) {
  if (this.smtpapi.to && this.smtpapi.to.length > 0) {
    data.to = this.from;
  }
};

/**
 * This method is used to show if there are files on this email object
 *
 * @return boolean
 */
Email.prototype.hasFiles = function() {
  return this.files.length > 0;
};

// export the object as the only object in this module
module.exports = Email;
