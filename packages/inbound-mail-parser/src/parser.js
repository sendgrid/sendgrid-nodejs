'use strict';

const fs = require('fs');
const { MailParser } = require('mailparser');
const {
  classes: {
    Attachment,
  },
} = require('@sendgrid/helpers');

/**
 * Normalises attachment files retrieved from file system or parsed raw email
 *
 * @param {Object} file The file object returned by file system or parsed email
 * @return {Object} A SendGrid Attachment object with the file data
 */
function createAttachment({originalname, fileName, mimetype, contentType, content}) {
  const attachment = new Attachment();

  attachment.setFilename(originalname || fileName);
  attachment.setType(mimetype || contentType);
  attachment.setContent(content.toString('base64'));

  return attachment;
}

/**
 * Simple class that parses data received from SendGrid Inbound Parse Webhook
 *
 * @constructor
 * @param {Object} config inbound configuration object
 * @param {Object} request request object of the parse webhook payload
 */
function Parse({ keys }, request) {
  this.keys = keys;
  this.request = request;
  this.payload = request.body || {};
  this.files = request.files || [];
}

/**
 * Return an object literal of key/values in the payload received from webhook
 * @return {Object} Valid key/values in the webhook payload
 */
Parse.prototype.keyValues = function() {
  const keyValues = {};
  let key;

  for (const index in this.keys) {
    key = this.keys[index];

    if (this.payload[key]) {
      keyValues[key] = this.payload[key];
    }
  }

  return keyValues;
};

/**
 * Whether the payload contains the raw email (Only applies to raw payloads)
 * @return {Boolean}
 */
Parse.prototype.hasRawEmail = function() {
  return Boolean(this.payload.email);
};

/**
 * Parses the raw email and returns the mail object in a callback (Only applies to raw payloads)
 * @param {Function} callback Function which will receive the parsed email object as the sole argument
 */
Parse.prototype.getRawEmail = function(callback) {
  const mailparser = new MailParser();
  const { email:rawEmail } = this.payload;

  if (!rawEmail) {
    return callback(null);
  }

  mailparser.on('end', callback);

  mailparser.write(rawEmail);
  mailparser.end();
};

/**
 * Retrieves all attachments received from the webhook payload
 * @param {Function} callback Function which will receive an array, of attachments found, as the sole argument
 */
Parse.prototype.attachments = function(callback) {
  if (this.hasRawEmail()) {
    return this._getAttachmentsRaw(callback);
  }

  this._getAttachments(callback);
};

/**
 * Parses raw email to retrieve any encoded attachments (Only applies to raw payloads)
 * @private
 * @param {Function} callback Function which will receive an array, of attachments found, as the sole argument
 */
Parse.prototype._getAttachmentsRaw = function(callback) {
  this.getRawEmail(parsedEmail => {
    if (!parsedEmail || !parsedEmail.attachments) {
      return callback([]);
    }

    const attachments = parsedEmail.attachments.map(file => createAttachment(file));

    callback(attachments);
  });
};

/**
 * Retrieves webhook payload files from the file system (Only applies to non raw payloads)
 * @private
 * @param {Function} callback Function which will receive an array, of attachments found, as the sole argument
 */
Parse.prototype._getAttachments = function(callback) {
  let file;
  const attachments = [];

  for (const index in this.files) {
    file = this.files[index];
    const { path } = file;

    if (fs.existsSync(path)) {
      file.content = fs.readFileSync(path);
      attachments.push(createAttachment(file));
    }
  }

  return callback(attachments);
};

module.exports = Parse;
