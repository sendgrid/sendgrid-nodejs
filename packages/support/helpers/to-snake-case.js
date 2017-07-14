'use strict';

/**
 * Dependencies
 */
const convertKeys = require('./convert-keys');

/**
 * Internal conversion helper
 */
function strToSnakeCase(str) {
  return str.replace(/(\s*\-*\b\w|[A-Z])/g, function($1) {
    $1 = $1.trim().toLowerCase().replace('-', '');
    return ($1[0] === '_' ? '' : '_') + $1;
  }).slice(1);
}

/**
 * Convert object keys to snake case
 */
module.exports = function toSnakeCase(obj) {
  return convertKeys(obj, strToSnakeCase);
};
