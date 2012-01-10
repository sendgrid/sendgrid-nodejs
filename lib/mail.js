"use strict";

var querystring = require('querystring');
var https = require('https');
var Email = require('./email').Email;

function SmtpapiHeaders() {

}

function MailHeaders() {

}

function Mail(attributes) {
    var self = this;
    attributes = attributes || {};

    this.username = attributes.username || '';
    this.password = attributes.password || '';

    this.to       = attributes.to       || new Email();
    this.from     = attributes.from     || new Email();
    this.smtpapi  = attributes.smtpapi  || new SmtpapiHeaders();
    this.subject  = attributes.subject  || '';
    this.text     = attributes.text     || '';
    this.html     = attributes.html     || '';
    this.bcc      = attributes.bcc      || [];
    this.replyto  = attributes.replyto  || '';
    this.date     = attributes.date     || new Date();
    this.files    = attributes.files    || [];
    this.headers  = attributes.headers  || new MailHeaders();
}

/*
 * Static mail sender
 */
Mail.send = function(options, callback) {
    callback.call(this, false, 'Not yet implemented!');
}

/*
 * Validates an email. This is used before sending, but
 * can still be invoked programatically
 *
 * @return {Boolean} The result of the validation
 */
Mail.prototype.validate = function() {
  return false;
}

/*
 * Sends an email and returns true if the
 * message was sent successfully.
 *
 * @returns {Boolean}
 */
Mail.prototype.send = function(callback) {
    var post_data = this.getPostData();
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

Mail.prototype.getPostData = function() {
    var data = {
        api_user: this.username,
        api_key: this.password,
        to: this.to,
        from: this.from,
        subject: this.subject,
        text: this.text,
        html: this.html
    }

    return querystring.stringify(data);
};

module.exports.Mail = Mail;
