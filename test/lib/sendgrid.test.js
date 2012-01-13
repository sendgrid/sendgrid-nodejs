var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/email');

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

var unicode_params = {
  to: 'kyle.partridge@sendgrid.com',
  from: 'kyle.partridge@sendgrid.com',
  subject: 'Unicode Email!',
  text: 'I can haz unicode? ✔'
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

    it('should be able to send to multiple recipients', function(done) {
      var params = _.clone(text_params);
      params.to = ['kyle.partridge@sendgrid.com', 'david.tomberlin@sendgrid.com'];
      sendgrid.send(params, function(success, message) {
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

    it('should allow unicode in emails', function(done) {
      var mail = new Email(unicode_params);
      sendgrid.smtp(mail, function(success, message) {
        if (!success) should.fail(message);
        done();
      });
    });

    it('should support the reply_to field', function(done) {
      var mail = new Email(smtp_params);
      mail.subject += ' Reply To Test';
      mail.replyto = 'noreply@sendgrid.com';
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

  describe('x-smtpapi', function(done) {
    function setupEmail() {
      var mail = new Email({
        from: 'kyle.partridge@sendgrid.com',
        subject: 'Multiple Recipients with headers',
        text: 'Multiple recipients through x-smtpapi test'
      });
      mail.addTo('kyle.partridge@sendgrid.com');
      mail.addTo('david.tomberlin@sendgrid.com');

      return mail;
    }
    it('should be able to send an email to mutiple recipients through the Web Api', function(done) {
      var mail = setupEmail();
      mail.subject = '(Web) ' + mail.subject;
      sendgrid.send(mail, function(success, message) {
        if (!success) assert.ok(false, message);
        done();
      });
    });

    it('should be able to send an email to mutiple recipients through the Smtp Api', function(done) {
      var mail = setupEmail();
      mail.subject = '(SMTP) ' + mail.subject;
      sendgrid.smtp(mail, function(success, message) {
        if (!success) assert.ok(false, message);
        done();
      });
    });
  })
});

