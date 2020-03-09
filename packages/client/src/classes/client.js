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
      data: {},
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
    this.defaultRequest[key] = value;
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
  createRequest(data) {

    //Keep URL parameter consistent
    if (data.uri) {
      data.url = data.uri;
      delete data.uri;
    }
    // Ensure backwards compatibility from request module
    if (data.body) {
      data.data = data.body;
      delete data.body;
    }
    if (data.qs) {
      data.params = data.qs;
      delete data.qs;
    }

    //Merge data with empty request
    const request = mergeData(this.defaultRequest, data);

    //Add headers
    request.headers = this.createHeaders(request.headers);
    return request;
  }

  /**
   * Do a request
   */
  request(data, cb) {

    //Create request
    const request = this.createRequest(data);

    //Perform request
    const promise = new Promise((resolve, reject) => {
      axios(request)
        .then(response => {
          // Successful response
          var parsedResponse = {
            statusCode: response.status,
            body: response.data,
          };
          return resolve([parsedResponse, response.data]);
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
