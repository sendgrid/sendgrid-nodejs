var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/email');
var should = require('should');

var credentials = {
  api_user: 'kylep',
  api_key: 'testing'
}

var text_params = {
  to: 'david.tomberlin@sendgrid.com',
  from: 'kyle.partridge@sendgrid.com',
  subject: 'Subject',
  text: 'This is an email.'
};

var html_params = {
  to: 'david.tomberlin@sendgrid.com',
  from: 'kyle.partridge@sendgrid.com',
  subject: 'Subject',
  html: '<b>This is an email.</b>'
};

var smtp_params = {
  to: 'kyle.partridge@sendgrid.com',
  from: 'kyle.partridge@sendgrid.com',
  subject: 'Smtp Email',
  text: 'This is an email.'
};

describe('SendGrid', function () {
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(credentials);
  });

  describe('Web Api', function() {
    it('should be able to send text messages', function(done) {
      var mail = new Email(text_params);
      sendgrid.send(mail, function(success, message) {
        if (!success) should.fail(message);
        done();
      });
    });

    it('should be able to send html messages', function(done) {
      var mail = new Email(html_params);
      sendgrid.send(mail, function(success, message) {
        if (!success) should.fail(message);
        done();
      });
    });

    it('should allow a user to easily send email', function(done) {
      sendgrid.send(text_params, function(success, message) {
        if (!success) should.fail(message);
        done();
      });
    });
  });

  describe('Smtp Api', function() {
    it('should send an email', function(done) {
      var mail = new Email(smtp_params);
      sendgrid.smtp(mail, function(success, message) {
        if (!success) should.fail(message);
        done();
      });
    });

    it('should report errors back to the user', function(done) {
      var mail = new Email({});
      sendgrid.smtp(mail, function(success, message) {
        if (success) should.fail('An error should have been reported');
        done();
      });
    });
  });
});

