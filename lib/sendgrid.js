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

  //Create global request
  var globalRequest = getEmptyRequest({
    host: host || 'api.sendgrid.com',
    headers: makeHeaders(apiKey, globalHeaders),
  });

  //Initialize new client
  var client = new Client(globalRequest);

  //Interact with the API with this function
  SendGrid.API = function(request, callback) {

    //If no callback provided, we will return a promise
    if (!callback) {
      if (!SendGrid.Promise) {
        throw new SendGridError('Promise API not supported');
      }
      return new SendGrid.Promise(function(resolve, reject) {
        client.API(request, function(response) {
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
    client.API(request, function(response) {
      if (isValidResponse(response)) {
        callback(null, response);
      }
      else {
        var error = new SendGridError('Response error');
        callback(error, response);
      }
    });
  };

  //Set requests
  SendGrid.emptyRequest = getEmptyRequest;
  SendGrid.globalRequest = globalRequest;
  return SendGrid;
}

//Try to use native promises by default
if (typeof Promise !== 'undefined') {
  SendGrid.Promise = Promise;
}
else {
  SendGrid.Promise = null;
}

//Export
module.exports = SendGrid;
