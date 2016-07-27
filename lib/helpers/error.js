'use strict';

//Error constructor
function SendGridError(message) {
  this.message = message;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
  else {
    this.stack = (new Error()).stack;
  }
}

//Extend prototype
SendGridError.prototype = new Error();
SendGridError.prototype.constructor = SendGridError;
SendGridError.prototype.name = 'SendGridError';

//Export
module.exports = SendGridError;
