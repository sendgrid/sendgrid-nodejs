var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/email');

describe('custom headers #skip', function() {
  var sendgrid;
  var custom_headers = {cow: 'moo', panda: 'brawr'};
  beforeEach(function() {
    sendgrid = new SendGrid(setup.api_user, setup.api_key);
  });

  describe('Smtp', function() {
    it('should allow an email with custom headers to be sent', function(done) {
      var mail = new Email({
        to: setup.single_to,
        from: setup.from,
        subject: '[SMTP]Testing custom headers',
        text: 'Custom headers in email'
      });

      mail.setHeaders(custom_headers);
      expect(mail.headers).to.eql(custom_headers);

      sendgrid.send(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });
  });

  describe('Web', function() {
    it('should allow an email with custom headers to be sent', function(done) {
      var mail = new Email({
        to: setup.single_to,
        from: setup.from,
        subject: '[WEB]Testing custom headers',
        text: 'Custom headers in email'
      });

      mail.setHeaders(custom_headers);
      expect(mail.headers).to.eql(custom_headers);

      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });
  });
});
