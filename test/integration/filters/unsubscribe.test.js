var SendGrid = require('../../../lib/sendgrid');
var Email = require('../../../lib/email');

describe('unsubscribe #skip', function() {
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(setup.api_user, setup.api_key);
  });

  it('should send a message with unsubscribe', function(done) {
    var email = new Email({
      to: setup.single_to,
      from: setup.from,
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
