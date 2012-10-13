"use strict";

var querystring = require('querystring');
var https = require('https');
var nodemailer = require('nodemailer');
var _ = require('underscore');
var path = require('path');
var mime = require('mime');

var Email = require('./email');

/*
 * Class for handling communications with SendGrid.
 *
 * @param  {String}  api_user  The SendGrid username.
 * @param  {String}  api_key   The key credentials for SendGrid.
 */
function SendGrid(api_user, api_key) {
  this.api_user = api_user;
  this.api_key = api_key;
}

/*
 * Sends an email via REST and returns true if the
 * message was sent successfully.
 *
 * @param  {Email|Object}  email     An email object or a hash that has
 *                                   the values for the email to be sent.
 * @param  {Function}      callback  A function to call when the processing is done.
 *                                   This parameter is optional.
 */
SendGrid.prototype.send = function(email, callback) {
  var self = this
    , cb = callback || function() { };

  var boundary = Math.random();

  if (email.constructor !== Email) {
    email = new Email(email);
  }

  function send_rest() {
    var post_data;
    var options = {
      host: 'sendgrid.com',
      path: '/api/mail.send.json',
      method: 'POST'
    };

    if (email.hasFiles()) {
      post_data = self.getMultipartData(email, boundary);
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
      var content = '';
      res.on('data', function(chunk) {
        content += chunk;
      });
      res.on('end', function() {
        var json = JSON.parse(content);
        cb(json.message == 'success', json.errors);
      });
    });

    // If the email has files, it will be a multipart request.
    // TODO: make this feel less dirty.
    if (email.hasFiles()) {
      for (var key in post_data) {
        request.write(post_data[key]);
      }
    } else {
      request.write(post_data);
    }

    request.end();
  }

  if (email.hasFiles()) {
    email.processFiles(function(success, message) {
      if (success) {
        send_rest();
      } else {
        cb(false, message);
      }
    });
  } else {
    send_rest();
  }
};

/*
 * Sends an email via SMTP and returns true if the
 * message was sent successfully.
 *
 * @param    {Email|Object}  email     An email object or a hash that has
 *                                     the values for the email to be sent.
 * @param    {Function}      callback  A function to call when the processing is done.
 *                                     This parameter is optional.
 */
SendGrid.prototype.smtp = function(email, callback) {
  var self = this
    , smtpTransport
    , cb = callback || function() { };

  // SMTP settings
  smtpTransport = nodemailer.createTransport("SMTP", {
    service: 'SendGrid',
    auth: {
      user: this.api_user,
      pass: this.api_key
    }
  });

  function send_smtp() {
    smtpTransport.sendMail(email.toSmtpFormat(), function(error, response) {
      smtpTransport.close();
      if(error) {
        return cb(false, response);
      }
      return cb(true, response);
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
        cb(false, message);
      }
    });
  } else {
    send_smtp();
  }
};

/*
 * Function for internal use.
 *
 * Used for returning the parameters for sending an email via REST.
 *
 * This method is only used when there are no attachments on the email object.
 *
 * @param   {Email}  email  The email object to be sent via REST.
 * @return  {String}        Querystring format of the email to be sent.
 */
SendGrid.prototype.getPostData = function(email) {
  var data = {
    api_user: this.api_user,
    api_key: this.api_key
  }

  _.extend(data, email.toWebFormat());

  return querystring.stringify(data);
};

/*
 * Function for internal use.
 *
 * Used for returning the parameters for sending an email via REST.
 *
 * This method is used when there are attachments on the email object.
 *
 * @param   {Email}   email     The email object to be sent via REST.
 * @param   {String}  boundary  The boundary to use between multipart sections.
 * @return  {Array[Buffer]}     An array of buffers for each section of
 *                              the multipart/form-data request.
 */
SendGrid.prototype.getMultipartData = function(email, boundary) {
  var data = [];
  data.push(new Buffer(encodeField(boundary, 'api_user', this.api_user)));
  data.push(new Buffer(encodeField(boundary, 'api_key', this.api_key)));

  _(email.toWebFormat()).each(function(v, k) {
    data.push(new Buffer(encodeField(boundary, k, v)));
  });

  _(email.files).each(function(file) {
    data.push(encodeFile(boundary, file.contentType, 'files[' + file.filename + ']', file.filename));
    data.push(file.content);
    data.push(new Buffer('\r\n'));
  });

  return data;
};

/*
 * Function for encoding a field as a multipart/form-data request.
 *
 * @param   {String}  boundary  The boundary to use between requests.
 * @param   {String}  name      The name of the parameter.
 * @param   {String}  value     The value of the parameter.
 * @return  {String}            The string representing the multipart/form-data section.
 */
function encodeField(boundary, name, value) {
    var return_part = "--" + boundary + "\r\n";
    return_part += "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n";
    return_part += value + "\r\n";
    return return_part;
}

/*
 * Function for encoding a file as a multipart/form-data request.
 *
 * @param   {String}  boundary  The boundary to use between requests.
 * @param   {String}  type      The Content-Type of the file
 * @param   {String}  name      The name of the parameter.
 * @param   {String}  filename  The name of the file.
 * @return  {String}            The string representing the multipart/form-data section.
 */
function encodeFile(boundary, type, name, filename) {
    var return_part = "--" + boundary + "\r\n";
    return_part += "Content-Disposition: form-data; name=\"" + name + "\"; filename=\"" + filename + "\"\r\n";
    return_part += "Content-Type: " + type + "\r\n\r\n";
    return return_part;
}

module.exports = SendGrid;
