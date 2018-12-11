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
const createAttachment = (file) => {
  const {originalname, fileName, mimetype, contentType, content} = file;
  const attachment = new Attachment();

  attachment.setFilename(originalname || fileName);
  attachment.setType(mimetype || contentType);
  attachment.setContent(content.toString('base64'));

  return attachment;
};

/**
 * Simple class that parses data received from SendGrid Inbound Parse Webhook
 *
 */
class Parse {

  /**
   * @constructor
   * @param {Object} config inbound configuration object
   * @param {Object} request request object of the parse webhook payload
   */
  constructor(config, request) {
    this.keys = config.keys;
    this.request = request;
    this.payload = request.body || request.payload || {};
    this.files = request.files || [];
  }

  /**
   * Return an object literal of key/values in the payload received from webhook
   * @return {Object} Valid key/values in the webhook payload
   */
  keyValues() {
    return this.keys
      .filter(key => this.payload[key])
      .map(key => ({ [key]: this.payload[key] }))
      .reduce((keyValues, keyPayload) => Object.assign(keyValues, keyPayload));
  }

  /**
   * Whether the payload contains the raw email (Only applies to raw payloads)
   * @return {Boolean}
   */
  hasRawEmail() {
    return !!this.payload.email;
  }

  /**
   * Parses the raw email and returns the mail object in a callback (Only applies to raw payloads)
   * @param {Function} callback Function which will receive the parsed email object as the sole argument
   */
  getRawEmail(callback) {
    const mailparser = new MailParser();
    const { rawEmail } = this.payload;

    if (!this.hasRawEmail()) {
      return callback(null);
    }

    mailparser.on('end', callback);
    mailparser.write(rawEmail);
    mailparser.end();
  }

  /**
   * Retrieves all attachments received from the webhook payload
   * @param {Function} callback Function which will receive an array, of attachments found, as the sole argument
   */
  attachments(callback) {
    return this[`_getAttachments${this.hasRawEmail() ? 'Raw' : ''}`](callback);
  }

  /**
   * Parses raw email to retrieve any encoded attachments (Only applies to raw payloads)
   * @private
   * @param {Function} callback Function which will receive an array, of attachments found, as the sole argument
   */
  _getAttachmentsRaw(callback) {
    this.getRawEmail(parsedEmail => {
      const attachments = (parsedEmail || {}).attachments || [];
      callback(attachments.map(createAttachment));
    });
  }

  /**
   * Retrieves webhook payload files from the file system (Only applies to non raw payloads)
   * @private
   * @param {Function} callback Function which will receive an array, of attachments found, as the sole argument
   */
  _getAttachments(callback) {
    return callback(this.files
      .filter(file => fs.existsSync(file.path))
      .map((exists, idx) => [exists, this.files[idx]])
      .filter(([exists, _]) => exists)
      .map(([_, file]) => {
        file.content = fs.readFileSync(file.path);
        return createAttachment(file);
      })
    );
  }
}

module.exports = Parse;
