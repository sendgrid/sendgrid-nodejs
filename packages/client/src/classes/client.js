'use strict';

/**
 * Dependencies
 */
const axios = require('axios');
const pkg = require('../../package.json');
const {
  helpers: {
    mergeData,
  },
  classes: {
    Response,
    ResponseError,
  },
} = require('@sendgrid/helpers');

/**
 * Twilio SendGrid REST Client
 */
class Client {
  /**
   * Constructor
   */
  constructor() {

    //API key
    this.apiKey = '';

    //Default headers
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-agent': 'sendgrid/' + pkg.version + ';nodejs',
    };

    //Empty default request
    this.defaultRequest = {
      baseURL: 'https://api.sendgrid.com/',
      url: '',
      method: 'GET',
      headers: {},
    };
  }

  /**
   * Set API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Set default header
   */
  setDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
    return this;
  }

  /**
   * Set default request
   */
  setDefaultRequest(key, value) {
    if (key === 'baseUrl') {
      this.defaultRequest.baseURL = value;
    } else {
      this.defaultRequest[key] = value;
    }
    return this;
  }

  /**
   * Create headers for request
   */
  createHeaders(data) {

    //Merge data with default headers
    const headers = mergeData(this.defaultHeaders, data);

    //Add API key, but don't overwrite if header already set
    if (typeof headers.Authorization === 'undefined' && this.apiKey) {
      headers.Authorization = 'Bearer ' + this.apiKey;
    }

    //Return
    return headers;
  }

  /**
   * Create request
   */
  createRequest(opts) {

    let options = {
      url: opts.uri || opts.url,
      baseURL: opts.baseUrl,
      method: opts.method,
      data: opts.body,
      params: opts.qs,
      headers: opts.headers,
    };

    //Merge data with empty request
    options = mergeData(this.defaultRequest, options);

    options.headers = this.createHeaders(options.headers);
    return options;
  }

  /**
   * Do a request
   */
  request(opts, cb) {

    //Create request
    opts = this.createRequest(opts);

    //Perform request
    const promise = new Promise((resolve, reject) => {
      axios(opts)
        .then(response => {
          // Successful response
          return resolve([
            new Response(response.status, response.data, response.headers),
            response.data,
          ]);
        })
        .catch(error => {
          // Response error
          if (error.response) {
            if (error.response.status >= 400) {
              return reject(new ResponseError(error.response));
            }
          }
          // Request error
          return reject(error);
        });
    });

    // Throw and error incase function not passed
    if (cb && typeof cb !== 'function') {
      throw new Error('Callback passed is not a function.');
    }

    //Execute callback if provided
    if (cb) {
      return promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    //Return promise
    return promise;
  }
}

//Export class
module.exports = Client;
