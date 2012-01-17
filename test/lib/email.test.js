var Email = require('../../lib/email');
var querystring = require('querystring')

var text_params = {
  to: 'david.tomberlin@sendgrid.com',
  from: 'kyle.partridge@sendgrid.com',
  subject: 'Subject',
  text: 'This is an email.'
};

var files = [
  __dirname + '/../assets/logo.png',
  __dirname + '/../assets/sendgrid.txt'
]

describe('Email', function () {
  it('should allow attributes to be set in the constuctor', function() {
    var mail = new Email(text_params);

    for (var key in text_params) {
      expect(text_params[key]).to.eql(mail[key]);
    }
  });

  it('should return a Web Api format as expected', function() {
    var email = new Email(text_params);
    var webFormat = email.toWebFormat();
    expect(webFormat.to).to.equal(text_params.to);
    expect(webFormat.from).to.equal(text_params.from);
    expect(webFormat.subject).to.equal(text_params.subject);
    expect(webFormat.text).to.equal(text_params.text);
  });

  it('should not have a to address if there is no to or no smtpapi.to set via Web Api', function() {
    var email = new Email({from: 'test@test.com', subject: 'testing', text: 'testing'});
    var webFormat = email.toWebFormat();
    expect(webFormat.to).to.be.empty;
  });

  it('should return an Smtp Api format as expected', function() {
    var email = new Email(text_params);
    var smtpFormat = email.toSmtpFormat();
    expect(smtpFormat.to).to.equal(text_params.to);
    expect(smtpFormat.sender).to.equal(text_params.from);
    expect(smtpFormat.subject).to.equal(text_params.subject);
    expect(smtpFormat.body).to.equal(text_params.text);
  });

  it('should not have a to address if there is no to or no smtpapi.to set via Smtp Api', function() {
    var email = new Email({from: 'test@test.com', subject: 'testing', text: 'testing'});
    var smtpFormat = email.toSmtpFormat();
    expect(smtpFormat.to).to.be.empty;
  });

  it('should support file attachments', function() {
    var email = new Email();
    email.addFile('file1', files[0]);
    expect(email.files).to.eql({'file1': files[0]});
    email.addFile('file2', files[1]);
    expect(email.files).to.eql({'file1': files[0], 'file2': files[1]});
  });

  describe('validation', function() {
    it('should invalidate when there are no parameters');

    it('should return true when the mail is valid');
  });

  describe('custom headers', function() {
    var mail;
    var custom_headers = {cow: 'moo', panda: 'brawr'};
    beforeEach(function() {
      mail = new Email();
    });

    it('should allow setting custom headers via setHeaders', function() {
      mail.setHeaders(custom_headers);
      expect(mail.headers).to.eql(custom_headers);
    });

    it('should allow setting custom headers one at a time with addHeaders', function() {
      for(var key in custom_headers) {
        var args = {};
        args[key] = custom_headers[key];
        mail.addHeaders(args);
      }

      expect(mail.headers).to.eql(custom_headers);
      mail.addHeaders({fox: 'hound'});
      expect(mail.headers.fox).to.eql('hound');
    });

    it('should overwrite headers when calling addHeaders with the same value', function() {
      mail.addHeaders(custom_headers);
      expect(mail.headers).to.eql(custom_headers);
      mail.addHeaders({cow: 'in my mind'});
      expect(mail.headers).not.to.eql(custom_headers);
      expect(mail.headers.cow).to.eql('in my mind');
    });

  });
});
