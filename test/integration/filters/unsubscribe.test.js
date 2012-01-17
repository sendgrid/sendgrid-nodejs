var SendGrid = require('../../../lib/sendgrid');
var Email = require('../../../lib/email');

var test = require('../../test.setup');

describe('unsubscribe', function() {
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(test.user, test.pass);
  });

  it('should send a message with unsubscribe', function(done) {
    var email = new Email({
      to: test.single_to,
      from: test.from,
      subject: 'Unsubscribe Test',
      html: '<h1>Hello</h1>',
      text: 'Hello'
    });

    email.smtpapi.addFilterSetting('subscriptiontrack', 'enable', 1);
    email.smtpapi.addFilterSetting('subscriptiontrack', 'text/html', 'Unsubscribe by clicking <%here%>');
    email.smtpapi.addFilterSetting('subscriptiontrack', 'text/plain', 'Unsub here: <% %>');

    sendgrid.send(email, function(success, message) {
      expect(success).to.be.true;
      done();
    })
  });
})
