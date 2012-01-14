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
      text_params[key].should.eql(mail[key]);
    }
  });

  it('should return a Web Api format as expected', function() {
    var email = new Email(text_params);
    var webFormat = email.toWebFormat();
    webFormat.to.should.equal(text_params.to);
    webFormat.from.should.equal(text_params.from);
    webFormat.subject.should.equal(text_params.subject);
    webFormat.text.should.equal(text_params.text);
  });

  it('should return an Smtp Api format as expected', function() {
    var email = new Email(text_params);
    var smtpFormat = email.toSmtpFormat();
    smtpFormat.to.should.equal(text_params.to);
    smtpFormat.sender.should.equal(text_params.from);
    smtpFormat.subject.should.equal(text_params.subject);
    smtpFormat.body.should.equal(text_params.text);
  });

  it('should support file attachments', function() {
    var email = new Email();
    email.addFile('file1', files[0]);
    email.files.should.eql({'file1': files[0]});
    email.addFile('file2', files[1]);
    email.files.should.eql({'file1': files[0], 'file2': files[1]});
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
      mail.headers.should.eql(custom_headers);
    });

    it('should allow setting custom headers one at a time with addHeaders', function() {
      for(var key in custom_headers) {
        var args = {};
        args[key] = custom_headers[key];
        mail.addHeaders(args);
      }

      mail.headers.should.eql(custom_headers);
      mail.addHeaders({fox: 'hound'});
      mail.headers.fox.should.eql('hound');
    });

    it('should overwrite headers when calling addHeaders with the same value', function() {
      mail.addHeaders(custom_headers);
      mail.headers.should.eql(custom_headers);
      mail.addHeaders({cow: 'in my mind'});
      mail.headers.should.not.eql(custom_headers);
      mail.headers.cow.should.eql('in my mind');
    });

  });
});
