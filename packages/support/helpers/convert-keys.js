'use strict';

/**
 * Helper to convert an object's keys
 */
module.exports = function convertKeys(obj, converter) {

  //Validate
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  //Process all properties
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {

      //Recursive for child objects
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = convertKeys(obj[key], converter);
      }

      //Convert key to snake case and set if needed
      const converted = converter(key);
      if (converted !== key) {
        obj[converted] = obj[key];
        delete obj[key];
      }
    }
  }

  //Return object copy
  return obj;
};
