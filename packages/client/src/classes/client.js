'use strict';
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

const API_KEY_PREFIX = 'SG.';

class Client {
  constructor() {
    this.apiKey = '';

    this.defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-agent': 'sendgrid/' + pkg.version + ';nodejs',
    };

    this.defaultRequest = {
      baseUrl: 'https://api.sendgrid.com/',
      url: '',
      method: 'GET',
      headers: {},
    };
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;

    if (!this.isValidApiKey(apiKey)) {
      console.warn(`API key does not start with "${API_KEY_PREFIX}".`);
    }
  }

  isValidApiKey(apiKey) {
    return this.isString(apiKey) && apiKey.trim().startsWith(API_KEY_PREFIX);
  }

  isString(value) {
    return typeof value === 'string' || value instanceof String;
  }

  setDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
    return this;
  }

  setDefaultRequest(key, value) {
    this.defaultRequest[key] = value;
    return this;
  }

  createHeaders(data) {
    // Merge data with default headers.
    const headers = mergeData(this.defaultHeaders, data);

    // Add API key, but don't overwrite if header already set.
    if (typeof headers.Authorization === 'undefined' && this.apiKey) {
      headers.Authorization = 'Bearer ' + this.apiKey;
    }

    return headers;
  }

  createRequest(data) {
    let options = {
      url: data.uri || data.url,
      baseUrl: data.baseUrl,
      method: data.method,
      data: data.body,
      params: data.qs,
      headers: data.headers,
    };

    // Merge data with default request.
    options = mergeData(this.defaultRequest, options);
    options.headers = this.createHeaders(options.headers);
    options.baseURL = options.baseUrl;
    delete options.baseUrl;

    return options;
  }

  request(data, cb) {
    data = this.createRequest(data);

    const promise = new Promise((resolve, reject) => {
      axios(data)
        .then(response => {
          return resolve([
            new Response(response.status, response.data, response.headers),
            response.data,
          ]);
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status >= 400) {
              return reject(new ResponseError(error.response));
            }
          }
          return reject(error);
        });
    });

    // Throw an error in case a callback function was not passed.
    if (cb && typeof cb !== 'function') {
      throw new Error('Callback passed is not a function.');
    }

    if (cb) {
      return promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    return promise;
  }
}

module.exports = Client;
