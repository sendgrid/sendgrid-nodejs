var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/email');

var api_user = 'kylep';
var api_key = 'testing';

describe('custom headers', function() {
  var sendgrid; 
  var custom_headers = {cow: 'moo', panda: 'brawr'};
  beforeEach(function() {
    sendgrid = new SendGrid(api_user, api_key);
  });

  describe('Smtp', function() {
    it('should allow an email with custom headers to be sent', function(done) {
      var mail = new Email({
        to: 'kyle.partridge@sendgrid.com',
        from: 'david.tomberlin@sendgrid.com',
        subject: '[SMTP]Testing custom headers',
        text: 'Custom headers in email'
      });

      mail.setHeaders(custom_headers);
      mail.headers.should.eql(custom_headers);

      sendgrid.send(mail, function(success, message) {
        if (!success) assert.ok(false, message);
        done();
      });
    });
  });

  describe('Web', function() {
    it('should allow an email with custom headers to be sent', function(done) {
      var mail = new Email({
        to: 'kyle.partridge@sendgrid.com',
        from: 'david.tomberlin@sendgrid.com',
        subject: '[WEB]Testing custom headers',
        text: 'Custom headers in email'
      });

      mail.setHeaders(custom_headers);
      mail.headers.should.eql(custom_headers);

      sendgrid.smtp(mail, function(success, message) {
        if (!success) assert.ok(false, message);
        done();
      });
    });
  });
});
