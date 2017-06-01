'use strict';

/**
 * Dependencies
 */
const http = require('http-as-promised');
const pkg = require('../package.json');
const mergeData = require('./helpers/merge-data');

/**
 * Sendgrid REST Client
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
      'User-agent': 'sendgrid/' + pkg.version + ';nodejs',
    };

    //Empty default request
    this.defaultRequest = {
      baseUrl: 'https://api.sendgrid.com/',
      uri: '',
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
    const promise = http(request);

    //Execute callback if provided
    if (cb) {
      promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    //Return promise
    return promise;
  }
}

//Export singleton instance
module.exports = new Client();
