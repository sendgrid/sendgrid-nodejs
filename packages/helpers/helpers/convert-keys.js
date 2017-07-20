'use strict';

/**
 * Helper to convert an object's keys
 */
module.exports = function convertKeys(obj, converter) {

  //Validate
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Non object passed to convertKeys: ' + obj);
  }

  //Process all properties
  for (const key in obj) {
    //istanbul ignore else
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
