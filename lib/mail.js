"use strict";

var Email = require('./email').Email;

function SmtpapiHeaders() {

}

function MailHeaders() {

}

function Mail(attributes) {
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
    callback.call(this, false, 'Not yet implemented!');
};

module.exports.Mail = Mail;
