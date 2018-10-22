'use strict';

/**
 * Dependencies
 */
const chalk = require('chalk');

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

    //Extract data from response
    const {headers, statusCode, statusMessage, body} = response;

    //Set data
    this.code = statusCode;
    this.message = statusMessage;
    this.response = {headers, body};

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
    const {body} = this.response;
    let err = chalk.red(`${this.message} (${this.code})`);
    if (body && Array.isArray(body.errors)) {
      body.errors.forEach(error => {
        const message = chalk.yellow(error.message);
        const field = chalk.grey(error.field);
        const help = chalk.grey(error.help);
        err += `\n  ${message}\n    ${field}\n    ${help}`;
      });
    }
    return err;
  }

  /**
   * Convert to simple object for JSON responses
   */
  toJSON() {
    const {message, code, response} = this;
    return {message, code, response};
  }
}

//Export
module.exports = ResponseError;
