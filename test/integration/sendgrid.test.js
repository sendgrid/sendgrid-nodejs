var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/email');

var text_params = {
  to: setup.single_to,
  from: setup.from,
  subject: 'Subject',
  text: 'This is an email.'
};

var html_params = {
  to: setup.single_to,
  from: setup.from,
  subject: 'Subject',
  html: '<b>This is an email.</b>'
};

var smtp_params = {
  to: setup.single_to,
  from: setup.from,
  subject: 'Smtp Email',
  text: 'This is an email.'
};

var unicode_params = {
  to: setup.single_to,
  from: setup.from,
  subject: 'Unicode Email!',
  text: 'I can haz unicode? ✔'
};

describe('SendGrid #skip', function () {
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(setup.api_user, setup.api_key);
  });

  /* TODO: Figure out a way to mock this. */
  describe('Smtp Api', function() {
    it('should send an email', function(done) {
      var mail = new Email(smtp_params);
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should allow unicode in emails', function(done) {
      var mail = new Email(unicode_params);
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should support the reply_to field', function(done) {
      var mail = new Email(smtp_params);
      mail.subject += ' Reply To Test';
      mail.replyto = 'noreply@sendgrid.com';
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should support filters', function(done) {
      var mail = new Email(smtp_params);
      mail.subject += ' filters (Smtp)';
      mail.addFilterSetting('footer', 'enable', 1);
      mail.addFilterSetting('footer', 'text/plain', 'This is mah footer!');
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should support filters with unicode parameters', function(done) {
      var mail = new Email(smtp_params);
      mail.subject += ' filters w/ unicode ✔ (Smtp)';
      mail.addFilterSetting('footer', 'enable', 1);
      mail.addFilterSetting('footer', 'text/plain', 'This is mah footer with a ✔ in it!');
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should support substitution values', function(done) {
      var mail = new Email(smtp_params);
      mail.addTo(setup.single_to);
      mail.addSubVal('-name-',['Panda', 'Cow']);
      mail.html = 'You are a <strong>-name-</strong>';
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should support sections being set in the email', function(done) {
      var mail = new Email(smtp_params);
      mail.addTo(setup.multi_to);
      mail.addSubVal('-name-', ['Kyle', 'David']);
      mail.addSubVal('-meme-', ['-kyleSection-', '-davidSection-']);
      mail.addSection({'-kyleSection-': 'I heard you liked batman so I killed your parents'});
      mail.addSection({'-davidSection-': 'Metal gear?!!?!!!!eleven'});
      mail.html = "Yo -name-!<br /> Here's a meme for you:<br /> -meme-";
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should report errors to the user', function(done) {
      var mail = new Email({});
      sendgrid.smtp(mail, function(success, message) {
        if (success) assert.ok(false, 'An error should have been reported');
        done();
      });
    });

    it('has an optional callback', function(done) {
      var mail = new Email(text_params)

      expect(function() {
        sendgrid.smtp(mail);
      }).to.not.throw(Error);

      done();
    });
  });
});
