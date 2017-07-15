'use strict';

/**
 * Dependencies
 */
const convertKeys = require('./convert-keys');
const strToCamelCase = require('./str-to-camel-case');

/**
 * Convert object keys to camel case
 */
module.exports = function toCamelCase(obj) {
  return convertKeys(obj, strToCamelCase);
};
