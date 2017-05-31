'use strict';

/**
 * Merge data helper
 */
module.exports = function mergeData(base, data) {

  //Copy base
  const merged = Object.assign({}, base);

  //Add data
  if (data && typeof data === 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] && typeof data[key] === 'object') {
          merged[key] = Object.assign({}, data[key]);
        }
        else {
          merged[key] = data[key];
        }
      }
    }
  }

  //Return
  return merged;
};
