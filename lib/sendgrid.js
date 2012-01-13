"use strict";

var querystring = require('querystring');
var https = require('https');
var nodemailer = require('nodemailer');
var _ = require('underscore');
var path = require('path');
var mime = require('mime');

var Email = require('./email');

function SendGrid(credentials) {
  this.api_user = credentials.api_user;
  this.api_key = credentials.api_key;
}

var boundary = Math.random();

/*
 * Sends an email and returns true if the
 * message was sent successfully.
 *
 * @returns {Boolean}
*/
SendGrid.prototype.send = function(email, callback) {
  var self = this;

  if (email.constructor !== Email) {
    email = new Email(email);
  }

  function send_rest() {
    var post_data;
    var options = {
      host: 'sendgrid.com',
      path: '/api/mail.send.json',
      method: 'POST',
    };
    if (email.hasFiles()) {
      post_data = self.getMultipartData(email);
      var length = 0;
      for (var buf in post_data) {
        length += post_data[buf].length;
      }
      options.headers = {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': length
      };
    } else {
      post_data = self.getPostData(email);
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
      };
    }

    var request = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        var json = JSON.parse(chunk);
        callback.call(null, json.message == 'success', json.errors);
      });
    });

    for (var key in post_data) {
      request.write(post_data[key]);
    }
    request.end();
  }

  if (email.hasFiles()) {
    email.processFiles(function(success, message) {
      if (success) {
        send_rest();
      } else {
        callback(false, message);
      }
    });
  } else {
    send_rest();
  }
};

SendGrid.prototype.smtp = function(email, callback) {
  var self = this;

  // SMTP settings
  nodemailer.SMTP = {
    host: 'smtp.sendgrid.net',
    use_authentication: true,
    ssl: true,
    user: this.api_user,
    pass: this.api_key
  };

  function send_smtp() {
    nodemailer.send_mail(email.toSmtpFormat(), function(error, success) {
      callback.call(self, success, error);
    });
  }

  if (email.constructor !== Email) {
    email = new Email(email);
  }

  if (_.size(email.files) > 0) {
    email.processFiles(function(success, message) {
      if (success) {
        send_smtp();
      } else {
        callback(false, message);
      }
    });
  } else {
    send_smtp();
  }
};

SendGrid.prototype.getPostData = function(email) {
  var data = {
    api_user: this.api_user,
    api_key: this.api_key
  }

  _.extend(data, email.toWebFormat());

  return querystring.stringify(data);
};

SendGrid.prototype.getMultipartData = function(email) {
  var data = [];
  data.push(new Buffer(encodeField(boundary, 'api_user', this.api_user)));
  data.push(new Buffer(encodeField(boundary, 'api_key', this.api_key)));

  _(email.toWebFormat()).each(function(v, k) {
    data.push(new Buffer(encodeField(boundary, k, v)));
  });

  _(email.files).each(function(filepath, filename) {
    data.push(encodeFile(boundary, mime.lookup(filepath), 'files[' + filename + ']', path.basename(filepath)));
    data.push(new Buffer(email.file_data[filename]));
    data.push(new Buffer('\r\n'));
  });

  return data;
};

function encodeField(boundary,name,value) {
    var return_part = "--" + boundary + "\r\n";
    return_part += "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n";
    return_part += value + "\r\n";
    return return_part;
}

function encodeFile(boundary,type,name,filename) {
    var return_part = "--" + boundary + "\r\n";
    return_part += "Content-Disposition: form-data; name=\"" + name + "\"; filename=\"" + filename + "\"\r\n";
    return_part += "Content-Type: " + type + "\r\n\r\n";
    return return_part;
}

module.exports = SendGrid;
