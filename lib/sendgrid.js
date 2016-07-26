/* eslint dot-notation: 'off' */
'use strict';
var package_json = require('./../package.json');
var emptyRequest = require('sendgrid-rest').emptyRequest;
var SendGridError = require('./helpers/error');

//Helper to check if response is valid
function isValidResponse(response) {
  return (
    response &&
    response.statusCode &&
    response.statusCode >= 200 &&
    response.statusCode <= 299
  );
}

//Helper to get a new empty request
function getEmptyRequest() {
  return JSON.parse(JSON.stringify(emptyRequest));
}

// SendGrid allows for quick and easy access to the v3 Web API
function SendGrid(apiKey, host, globalHeaders) {
  var Client = require('sendgrid-rest').Client;
  var globalRequest = getEmptyRequest();
  globalRequest.host = host || 'api.sendgrid.com';
  globalRequest.headers['Authorization'] = 'Bearer '.concat(apiKey);
  globalRequest.headers['Accept'] = 'application/json';
  globalRequest.headers['User-Agent'] =
    'sendgrid/' + package_json.version + ';nodejs';
  if (globalHeaders) {
    for (var obj in globalHeaders) {
      for (var key in globalHeaders[obj]) {
        globalRequest.headers[key] = globalHeaders[obj][key];
      }
    }
  }
  var client = new Client(globalRequest);

  this.emptyRequest = getEmptyRequest;

  // Interact with the API with this function
  this.API = function(request, callback) {

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
            reject(response);
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

  this.globalRequest = globalRequest;
  return this;
}

//Try to use native promises by default
SendGrid.Promise = Promise || null;

module.exports = {
  SendGrid: SendGrid,
  emptyRequest: getEmptyRequest(),
};
