"use strict";
var package_json = require('./../package.json');
var emptyRequest = JSON.parse(JSON.stringify(require('sendgrid-rest').emptyRequest));

// SendGrid allows for quick and easy access to the v3 Web API
function SendGrid (apiKey, host, globalHeaders) {
  var Client = require('sendgrid-rest').Client
  var globalRequest = JSON.parse(JSON.stringify(require('sendgrid-rest').emptyRequest));
  globalRequest.host = host || "api.sendgrid.com";
  globalRequest.headers['Authorization'] = 'Bearer '.concat(apiKey)
  globalRequest.headers['User-Agent'] = 'sendgrid/' + package_json.version + ';nodejs'
  globalRequest.headers['Accept'] = 'application/json'
  if (globalHeaders) {
    for (var obj in globalHeaders) {
      for (var key in globalHeaders[obj] ) {
        globalRequest.headers[key] = globalHeaders[obj][key]
      }
    }
  }
  var client = new Client(globalRequest)

  this.emptyRequest = function () {
    return JSON.parse(JSON.stringify(require('sendgrid-rest').emptyRequest));
  }

  // Interact with the API with this function
  this.API = function(request, callback) {
    client.API(request, function (response) {
      callback(response)
    })
  };

  this.globalRequest = globalRequest
  return this;
};

module.exports =
{
  SendGrid: SendGrid,
  emptyRequest: emptyRequest
}