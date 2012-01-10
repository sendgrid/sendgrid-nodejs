var Mail = require('../../lib/mail').Mail;
var should = require('should');

var text_params = {
    username: 'kylep',
    password: 'testing',
    to: 'kyle.partridge@sendgrid.com',
    from: 'kyle.partridge@sendgrid.com',
    subject: 'Subject',
    text: 'This is an email.'
};

var html_params = {
    username: 'kylep',
    password: 'testing',
    to: 'kyle.partridge@sendgrid.com',
    from: 'kyle.partridge@sendgrid.com',
    subject: 'Subject',
    html: '<b>This is an email.</b>'
};

describe('Mail', function () {
    describe('statically', function() {
        it('should be able to send text messages', function() {
            Mail.send(text_params, function(success, message) {
                if (!success) should.fail(message);
            });
        });

        it('should be able to send html messages', function() {
            Mail.send(html_params, function(success, message) {
                if (!success) should.fail(message);
            });
        });
    });

    describe('instance', function() {
        it('should allow attributes to be set in the constuctor', function() {
            var mail = new Mail(text_params);

            for (var key in text_params) {
                text_params[key].should.eql(mail[key]);
            }
        });

        it('should be able to send text messages', function(done) {
            var mail = new Mail(text_params);
            mail.send(function(success, message) {
                if (!success) should.fail(message);
                done();
            });
        });

        it('should be able to send html messages', function(done) {
            var mail = new Mail(html_params);
            mail.send(function(success, message) {
                if (!success) should.fail(message);
                done();
            });
        });
    });

    describe('validation', function() {
        it('should invalidate when there are no parameters', function() {
            var mail = new Mail();

            mail.validate().should.be.false;
        });

        it('should return true when the mail is valid', function() {
            var mail = new Mail(text_params);

            mail.validate().should.be.true;
        });
    });
});
