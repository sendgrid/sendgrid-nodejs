'use strict';

/**
 * Dependencies
 */
const EmailAddress = require('./email-address');

/**
 * Personalization class
 */
class Personalization {

	/**
	 * Constructor
	 */
  constructor(to, substitutions = {}) {

    //Init
    this.cc = [];
    this.headers = {};
    this.customArgs = {};
    this.substitutions = {};

    //Set recipient(s)
    if (to) {
      this.setTo(to);
    }

    //Set substitutions
    if (substitutions) {
      this.setSubstitutions(substitutions);
    }
  }

  /**
   * Set subject
   */
  setSubject(subject) {
    if (subject && typeof subject !== 'string') {
      throw new Error('String expected for `subject`');
    }
    this.subject = subject;
  }

  /**
   * Set send at
   */
  setSendAt(sendAt) {
    if (sendAt && !Number.isInteger(sendAt)) {
      throw new Error('Integer expected for `sendAt`');
    }
    this.sendAt = sendAt;
  }

  /**
   * Set to
   */
  setTo(to) {
    if (!Array.isArray(to)) {
      to = [to];
    }
    this.to = to
      .filter(item => !!item)
      .map(item => EmailAddress.create(item));
  }

  /**
   * Add a single to
   */
  addTo(email) {
    this.to.push(EmailAddress.create(email));
  }

  /**
   * Set cc
   */
  setCc(cc) {
    if (!Array.isArray(cc)) {
      cc = [cc];
    }
    this.cc = cc
      .filter(item => !!item)
      .map(item => EmailAddress.create(item));
  }

  /**
   * Add a single cc
   */
  addCc(email) {
    this.cc.push(EmailAddress.create(email));
  }

  /**
   * Set bcc
   */
  setBcc(bcc) {
    if (!Array.isArray(bcc)) {
      bcc = [bcc];
    }
    this.bcc = bcc
      .filter(item => !!item)
      .map(item => EmailAddress.create(item));
  }

  /**
   * Add a single bcc
   */
  addBcc(email) {
    this.bcc.push(EmailAddress.create(email));
  }

  /**
   * Set headers
   */
  setHeaders(headers) {
    if (!headers || typeof headers !== 'object') {
      throw new Error('Object expected for `headers`');
    }
    this.headers = headers;
  }

  /**
   * Add a header
   */
  addHeader(key, value) {
    this.headers[key] = value;
  }

  /**
   * Set substitutions
   */
  setSubstitutions(substitutions) {
    if (!substitutions || typeof substitutions !== 'object') {
      throw new Error('Object expected for `substitutions`');
    }
    this.substitutions = substitutions;
  }

  /**
   * Add a substitution
   */
  addSubstitution(key, value) {
    this.substitutions[key] = value;
  }

  /**
   * Set custom args
   */
  setCustomArgs(customArgs) {
    if (!customArgs || typeof customArgs !== 'object') {
      throw new Error('Object expected for `customArgs`');
    }
    this.customArgs = customArgs;
  }

  /**
   * Add a custom arg
   */
  addCustomArg(key, value) {
    this.customArgs[key] = value;
  }

  /**
	 * To JSON
	 */
  toJSON() {

    //Initialize with mandatory values
    const json = {
      to: this.to,
    };

    //Add whatever else we have
    if (Array.isArray(this.cc) && this.cc.length > 0) {
      json.cc = this.cc;
    }
    if (Array.isArray(this.bcc) && this.bcc.length > 0) {
      json.bcc = this.bcc;
    }
    if (Object.keys(this.headers).length > 0) {
      json.headers = this.headers;
    }
    if (Object.keys(this.substitutions).length > 0) {
      json.substitutions = this.substitutions;
    }
    if (Object.keys(this.customArgs).length > 0) {
      json.custom_args = this.customArgs;
    }
    if (this.subject) {
      json.subject = this.subject;
    }
    if (this.sendAt) {
      json.send_at = this.sendAt;
    }

    //Return
    return json;
  }
}

//Export class
module.exports = Personalization;
