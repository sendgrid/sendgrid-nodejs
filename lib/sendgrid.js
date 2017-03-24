/* eslint dot-notation: 'off' */
'use strict';

/**
 * Dependencies
 */
var pkg = require('./../package.json');
var sendgridRest = require('sendgrid-rest');
var emptyRequest = sendgridRest.emptyRequest;
var Client = sendgridRest.Client;
var SendGridError = require('./helpers/error');

/**
 * Helper to check if response is valid
 */
function isValidResponse(response) {
  return (
    response &&
    response.statusCode &&
    response.statusCode >= 200 &&
    response.statusCode <= 299
  );
}

/**
 * Helper to get a new empty request
 */
function getEmptyRequest(data) {
  var request = JSON.parse(JSON.stringify(emptyRequest));
  if (data && typeof data === 'object') {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        request[key] = JSON.parse(JSON.stringify(data[key]));
      }
    }
  }
  return request;
}

/**
 * Helper to make headers
 */
function makeHeaders(apiKey, globalHeaders) {
  var headers = {};
  headers['Authorization'] = 'Bearer '.concat(apiKey);
  headers['Accept'] = 'application/json';
  headers['User-Agent'] = 'sendgrid/' + pkg.version + ';nodejs';
  if (globalHeaders) {
    for (var obj in globalHeaders) {
      if (globalHeaders.hasOwnProperty(obj) &&
        typeof globalHeaders[obj] === 'object') {
        for (var key in globalHeaders[obj]) {
          if (globalHeaders[obj].hasOwnProperty(key)) {
            headers[key] = globalHeaders[obj][key];
          }
        }
      }
    }
  }
  return headers;
}

/**
 * SendGrid allows for quick and easy access to the v3 Web API
 */
function SendGrid(apiKey, host, globalHeaders) {
  return new SendGridInstance(apiKey, host, globalHeaders);
}

/**
 * SendGrid allows for quick and easy access to the v3 Web API
 */
function SendGridInstance(apiKey, host, globalHeaders) {
  //Create global request
  this.globalRequest = getEmptyRequest({
    host: host || 'api.sendgrid.com',
    headers: makeHeaders(apiKey, globalHeaders),
  });

  //Initialize new client
  this.client = new Client(this.globalRequest);
}

//Interact with the API with this function
SendGridInstance.prototype.API = function(request, callback) {
  var self = this;

  //If no callback provided, we will return a promise
  if (!callback) {
    if (!SendGrid.Promise) {
      throw new SendGridError('Promise API not supported');
    }
    return new SendGrid.Promise(function(resolve, reject) {
      self.client.API(request, function(response) {
        try {
          response.body = response.body ? JSON.parse(response.body) : response.body;
        } catch (e) {
          return reject(e)
        }
        if (isValidResponse(response)) {
          resolve(response);
        }
        else {
          var error = new SendGridError('Response error');
          error.response = response;
          reject(error);
        }
      });
    });
  }

  //Use callback
  self.client.API(request, function(response) {
    try {
      response.body = response.body ? JSON.parse(response.body) : response.body;
    } catch (e) {
      return callback(e)
    }
    if (isValidResponse(response)) {
      callback(null, response);
    }
    else {
      var error = new SendGridError('Response error');
      error.response = response;
      callback(error, response);
    }
  });
};

//Set requests
SendGridInstance.prototype.emptyRequest = getEmptyRequest;

//Try to use native promises by default
if (typeof Promise !== 'undefined') {
  SendGrid.Promise = Promise;
}
else {
  SendGrid.Promise = null;
}

//Export
module.exports = SendGrid;
