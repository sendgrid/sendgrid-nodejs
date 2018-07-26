'use strict';

/**
 * Dependencies
 */
const SendgridTransport = require('./classes/sendgrid-transport');

//Export singleton instance
module.exports = new SendgridTransport();