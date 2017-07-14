'use strict';

/**
 * Response error class
 */
function ResponseError(response) {

  //Set response
  this.response = response;

  //Set message
  if (response.statusCode >= 500) {
    this.message = 'Server error';
  }
  else if (response.statusCode >= 400) {
    this.message = 'Client error';
  }

  //Capture stack trace
  if (!this.stack) {
    Error.captureStackTrace(this, this.constructor);
  }

  //Clean up stack trace
  const regex = new RegExp(process.cwd() + '/', 'gi');
  this.stack = this.stack.replace(regex, '');
}

/**
 * Extend prototype
 */
ResponseError.prototype = Object.create(Error.prototype);
ResponseError.prototype.constructor = ResponseError;

/**
 * Convert to string
 */
ResponseError.prototype.toString = function() {
  return `${this.name}: ${this.message}`;
};

/**
 * Convert to simple object for JSON responses
 */
ResponseError.prototype.toJSON = function() {
  const {message, response} = this;
  return {message, response};
};

//Export
module.exports = ResponseError;
