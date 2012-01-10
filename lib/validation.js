var _ = require('underscore');

var VALID_TYPE = {
  EMAIL     : {name: "Email", error: "is not a valid email"},
  STRING    : {name: "String", error: "is not a string"},
  DEPENDENT : {name: "Dependent", error: "depencency is also not valid"},
  DATE      : {name: "Date", error: "is not a valid RFC 2822 formatted date"}
};

function Validation(validType, required, optionalDependent) {
  this.validType = validType;
  this.required = required;
  if (validType === VALID_TYPE.DEPENDENT) {
    if (_.isUndefined(optionalDependent) {
      throw new Error("Missing dependent field");
    } else {
      this.dependent = optionalDependent;
    }
  }
}

Validation.prototype.isValid = function(first_argument) {
  // body...
};

module.exports.Validate = Validate;
