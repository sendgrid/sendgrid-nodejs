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

describe('SendGrid', function () {

  describe('instance', function() {
    var sendgrid;
    beforeEach(function() {
      sendgrid = new SendGrid(credentials);
    });

    it('should allow attributes to be set in the constuctor', function() {
      var mail = new Email(text_params);

      for (var key in text_params) {
        text_params[key].should.eql(mail.params[key]);
      }
    });

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
});

