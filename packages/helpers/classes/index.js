'use strict';

/**
 * Expose classes
 */
const Attachment = require('./attachment');
const EmailAddress = require('./email-address');
const Mail = require('./mail');
const Personalization = require('./personalization');
const Request = require('./request');
const Response = require('./response');
const ResponseError = require('./response-error');
const Statistics = require('./statistics');

/**
 * Export
 */
module.exports = {
  Attachment,
  EmailAddress,
  Mail,
  Personalization,
  Request,
  Response,
  ResponseError,
  Statistics,
};
