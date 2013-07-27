"use strict";

var SmtpapiHeaders  = require('./smtpapi_headers');
var FileHandler     = require('./file_handler');
var _               = require('underscore');
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
  this.smtpapi = params.smtpapi || new SmtpapiHeaders();
  this.subject = params.subject || '';
  this.text    = params.text    || '';
  this.html    = params.html    || '';
  this.bcc     = params.bcc     || [];
  this.replyto = params.replyto || '';
  this.date    = params.date    || new Date();
  this.headers = params.headers || {};

  // auto handle any To arrays
  if ((this.to instanceof Array) && (this.to.length > 0)) {
    var first_to  = this.to[0];
    var self      = this;
    this.to.forEach(function(to) {
      self.addTo(to);
    });
    this.to = first_to;
  }
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
 * This method returns the email object is a format to be consumed by the SendGrid.web
 * using the web api
 *
 * @see SendGrid.web
 */
Email.prototype.toWebFormat = function() {
  var web  = {
    to          : this.to,
    from        : this.from,
    'x-smtpapi' : this.smtpapi.toJson(),
    subject     : this.subject,
    text        : this.text,
    html        : this.html,
    headers     : JSON.stringify(this.headers)
  }
  if (this.bcc)         { web.bcc          = this.bcc; }
  if (this.html)        { web.html         = this.html; }
  if (this.toname)      { web.toname       = this.toname; }
  if (this.fromname)    { web.fromname     = this.fromname; }
  if (this.replyto)     { web.replyto      = this.replyto; }

  this.updateMissingTo(web);

  if (this.files) {
    for (var index in this.files) {
      var content;
      var file        = this.files[index];

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
    }
  }

  return web;
};

/**
 * This method returns the email object is a format to be consumed by the SendGrid.smtp
 * using the smtp api
 *
 * @see SendGrid.smtp
 */
Email.prototype.toSmtpFormat = function() {
  var smtp = {
    to            : this.to,
    sender        : this.from,
    subject       : this.subject,
    body          : this.text,
    html          : this.html,
    reply_to      : this.replyto,
    headers       : this.headers 
  }; 

  smtp.headers['x-smtpapi'] = this.smtpapi.toJson();

  this._formatFilesForNodeMailer(this.files);
  
  this.updateMissingTo(smtp);
  smtp.attachments = this.files;

  return smtp;
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
 * This method modifies the data that will be sent via either Rest or SMTP.
 *
 * @param  {object}  data  The data parameter to send via Rest or SMTP
 */
Email.prototype.updateMissingTo = function(data) {
  if (data.to.length <= 0 && this.smtpapi.to && this.smtpapi.to.length > 0) {
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
