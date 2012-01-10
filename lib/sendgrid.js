"use strict";

var querystring = require('querystring');
var https = require('https');
var _ = require('underscore');

function SendGrid(credentials) {
  var self = this;

  this.api_user = credentials.api_user;
  this.api_key = credentials.api_key;
}

/*
 * Static mail sender
*/
SendGrid.send = function(options, callback) {
  callback.call(this, false, 'Not yet implemented!');
}

/*
 * Sends an email and returns true if the
 * message was sent successfully.
 *
 * @returns {Boolean}
*/
SendGrid.prototype.send = function(email, callback) {
  var post_data = this.getPostData(email.params || email);
  var options = {
    host: 'sendgrid.com',
    path: '/api/mail.send.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  };

  var request = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      var json = JSON.parse(chunk);
      callback.call(null, json.message == 'success', json.errors);
    });
  });

  request.write(post_data);
  request.end();
};

SendGrid.prototype.getPostData = function(params) {
  var data = {
    api_user: this.api_user,
    api_key: this.api_key
  }
  _(params).each(function(v, k) {
    data[k] = v;
  });

  return querystring.stringify(data);
};

module.exports = SendGrid;

