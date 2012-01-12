"use strict";

var querystring = require('querystring');
var https = require('https');
var nodemailer = require('nodemailer');
var _ = require('underscore');

function SendGrid(credentials) {
  this.api_user = credentials.api_user;
  this.api_key = credentials.api_key;
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

SendGrid.prototype.smtp = function(email, callback) {
  var self = this;

  nodemailer.SMTP = {
    host: 'smtp.sendgrid.net',
    use_authentication: true,
    ssl: true,
    user: this.api_user,
    pass: this.api_key
  };

  email = email.params || email;

  nodemailer.send_mail({
    sender: email.from,
    to: email.to,
    subject: email.subject,
    body: email.text,
    html: email.html,
    headers: {
      "x-smtpapi": JSON.stringify(email['x-smtpapi'])
    }
  }, function(error, success) {
    callback.call(self, success, error);
  });

}

SendGrid.prototype.getPostData = function(params) {
  var data = {
    api_user: this.api_user,
    api_key: this.api_key
  }
  _(params).each(function(v, k) {
    if (_(v).isObject() && !_(v).isDate() && !_(v).isArray())
      v = JSON.stringify(v);
    data[k] = v;
  });

  return querystring.stringify(data);
};

module.exports = SendGrid;

