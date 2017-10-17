'use strict';

/**
 * Dependencies
 */
const {Client} = require('@sendgrid/client');
const {classes: {Mail}} = require('@sendgrid/helpers');

/**
 * Mail service class
 */
class MailService {

  /**
   * Constructor
   */
  constructor() {

    //Set client, initialize substitution wrappers and secret rules
    //filter
    this.setClient(new Client());
    this.setSubstitutionWrappers('{{', '}}');
    this.secretRules = {};
  }

  /**
   * Set client
   */
  setClient(client) {
    this.client = client;
  }

  /**
   * API key pass through for convenience
   */
  setApiKey(apiKey) {
    this.client.setApiKey(apiKey);
  }

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(left, right) {
    if (typeof left === 'undefined' || typeof right === 'undefined') {
      throw new Error('Must provide both left and right side wrappers');
    }
    if (!Array.isArray(this.substitutionWrappers)) {
      this.substitutionWrappers = [];
    }
    this.substitutionWrappers[0] = left;
    this.substitutionWrappers[1] = right;
  }

  /**
   * Set secret rules for filtering the e-mail content
   */
  setSecretRules(rules) {
    if (typeof rules === 'string') {
      rules = {
        0: new RegExp(rules)
      };
    } else if (typeof rules !== 'object') {
      return;
    }

    this.secretRules = rules;
  }

  /**
   * Check if the e-mail is safe to be sent
   */
  filterSecrets(body) {
    if ((typeof body === 'object') && !body.hasOwnProperty('content')) {
      return;
    }

    const self = this;
    const secretRulesKeys = Object.keys(this.secretRules);

    body.content.forEach(function (data) {
      secretRulesKeys.forEach(function (id) {
        if (self.secretRules.hasOwnProperty(id)
          && !self.secretRules[id].test(data.value)
        ) {
          return;
        }

        const errorMsg = `The pattern \'${self.secretRules[id]}\' identified by \'${id}\' was found in the message!`;

        throw errorMsg;
      });
    });
  }

  /**
   * Send email
   */
  send(data, isMultiple = false, cb) {

    //Callback as second parameter
    if (typeof isMultiple === 'function') {
      cb = isMultiple;
      isMultiple = false;
    }

    //Array? Send in parallel
    if (Array.isArray(data)) {

      //Create promise
      const promise = Promise.all(data.map(item => {
        return this.send(item, isMultiple);
      }));

      //Execute callback if provided
      if (cb) {
        promise
          .then(result => cb(null, result))
          .catch(error => cb(error, null));
      }

      //Return promise
      return promise;
    }

    //Send mail
    try {

      //Append multiple flag to data if not set
      if (typeof data.isMultiple === 'undefined') {
        data.isMultiple = isMultiple;
      }

      //Append global substitution wrappers if not set in data
      if (typeof data.substitutionWrappers === 'undefined') {
        data.substitutionWrappers = this.substitutionWrappers;
      }

      //Create Mail instance from data and get JSON body for request
      const mail = Mail.create(data);
      const body = mail.toJSON();

      //Filters the Mail body to avoid sensitive content leakage
      this.filterSecrets(body);

      //Create request
      const request = {
        method: 'POST',
        url: '/v3/mail/send',
        body,
      };

      //Send
      return this.client.request(request, cb);
    }

    //Catch sync errors
    catch (error) {

      //Pass to callback if provided
      if (cb) {
        cb(error, null);
      }

      //Reject promise
      return Promise.reject(error);
    }
  }

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data, cb) {
    return this.send(data, true, cb);
  }
}

//Export class
module.exports = MailService;
