'use strict';

/*
 * Remove all null items in array
 */
module.exports = function removeNull(obj = {}) {
  const keys = Object.keys(obj);
  keys.forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
};