'use strict'
/**
 * Dependencies
 */
const CommonMethods = require('./common-methods');
const EmailAddress = require('./email-address');
const Personalization = require('./personalization');
const toCamelCase = require('../helpers/to-camel-case');
const toSnakeCase = require('../helpers/to-snake-case');
const deepClone = require('../helpers/deep-clone');
const arrayToJSON = require('../helpers/array-to-json');


class CommonMethods {
    /**
       * Set from email
       */
    static setFrom(instance, from) {
        if (typeof from === 'undefined') {
            return;
        }
        instance.from = EmailAddress.create(from);
    }

}
module.exports =CommonMethods();