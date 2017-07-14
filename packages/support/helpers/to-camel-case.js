'use strict';

/**
 * Dependencies
 */
const convertKeys = require('./convert-keys');

/**
 * Internal conversion helper
 */
function strToCamelCase(str) {
  return str
    .replace(/_+|\-+/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (Number(match) === 0) {
        return '';
      }
      return (index === 0) ? match.toLowerCase() : match.toUpperCase();
    });
}

/**
 * Convert object keys to camel case
 */
module.exports = function toCamelCase(obj) {
  return convertKeys(obj, strToCamelCase);
};
