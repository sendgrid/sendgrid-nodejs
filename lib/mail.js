"use strict";

var Email = require('./email').Email;

function SmtpapiHeaders() {

}

function MailHeaders() {

}

function Mail(attributes) {
    attributes = attributes || {};

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
 * Sends an email and returns true if the
 * message was sent successfully.
 *
 * @returns boolean
 */
Mail.prototype.send = function () {
    return false;
};

module.exports.Mail = Mail;
