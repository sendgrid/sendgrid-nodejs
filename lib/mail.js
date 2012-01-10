"use strict";

var querystring = require('querystring');
var https = require('https');
var Email = require('./email').Email;
var _ = require('underscore');

function SmtpapiHeaders() {

}

function MailHeaders() {

}

function Mail(credentials, params) {
    var self = this;

    this.username = credentials.username;
    this.password = credentials.password;

    this.params = _.extend(params, {
		to: [],
		from: '',
		smtpapi: new SmtpapiHeaders(),
		subject: '',
		text: null,
		html: null,
		bcc: [],
		replyto: null,
		date: new Date(),
		files: [],
		headers: new MailHeaders()
	});
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
Mail.prototype.send = function(params, callback) {
    _.extend(this.params, params);
    var post_data = this.getPostData();
    console.log(post_data);
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
        api_key: this.password
    }
    _(this.mailOptions).each(function(v, k) {
        data[k] = v;
    });

    return querystring.stringify(data);
};

module.exports.Mail = Mail;
