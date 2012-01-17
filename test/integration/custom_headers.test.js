var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/email');

var api_user = require('../test.setup').user;
var api_key = require('../test.setup').pass;
var single_to = require('../test.setup').single_to;
var t_from = require('../test.setup').from;

describe('custom headers', function() {
  var sendgrid; 
  var custom_headers = {cow: 'moo', panda: 'brawr'};
  beforeEach(function() {
    sendgrid = new SendGrid(api_user, api_key);
  });

  describe('Smtp', function() {
    it('should allow an email with custom headers to be sent', function(done) {
      var mail = new Email({
        to: single_to,
        from: t_from,
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
        to: single_to,
        from: t_from,
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
