'use strict';

/**
 * Response error class
 */
class ResponseError extends Error {

  /**
   * Constructor
   */
  constructor(response) {

    //Super
    super();

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
   * Convert to string
   */
  toString() {
    return `${this.name}: ${this.message}`;
  }

  /**
   * Convert to simple object for JSON responses
   */
  toJSON() {
    const {message, response} = this;
    return {message, response};
  }
}

//Export
module.exports = ResponseError;
