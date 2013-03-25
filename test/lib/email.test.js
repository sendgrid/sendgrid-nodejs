var Email = require('../../lib/email');
var querystring = require('querystring');
var fs = require('fs');

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

  it("should not set a fromname if one isn't provided", function() {
    var email = new Email({from: 'test@test.com', subject: 'testing', text: 'testing'});
    var webFormat = email.toWebFormat();
    expect(webFormat.fromname).to.be.empty;
  });

  it("should set a fromname if one is provided", function() {
    var email = new Email({from: 'test@test.com', fromname:'Tester T. Testerson', subject: 'testing', text: 'testing'});
    var webFormat = email.toWebFormat();
    expect(webFormat.fromname).to.equal('Tester T. Testerson');
  });

  it("should not set a toname if one isn't provided", function() {
    var email = new Email({from: 'test@test.com', subject: 'testing', text: 'testing'});
    var webFormat = email.toWebFormat();
    expect(webFormat.toname).to.be.empty;
  });

  it("should set a toname if one is provided", function() {
    var email = new Email({from: 'test@test.com', to:'test@test.com', toname:'Tester T. Testerson', subject: 'testing', text: 'testing'});
    var webFormat = email.toWebFormat();
    expect(webFormat.toname).to.equal('Tester T. Testerson');
  });

  it("should set multiple tonames if several are provided", function() {
    var email = new Email({from: 'test@test.com', to: ['test@test.com', 'test2@test.com'], toname:['Tester T. Testerson', 'Test2 M. Testerson'], subject: 'testing', text: 'testing'});
    var webFormat = email.toWebFormat();
    expect(webFormat.toname[0]).to.equal('Tester T. Testerson');
    expect(webFormat.toname[1]).to.equal('Test2 M. Testerson');
  });

  describe('files', function() {
    it('should support adding attachments via path', function() {
      var email = new Email();
      email.addFile({filename: 'path-image.png', path: files[0]});
      expect(email.files[0].filename).to.equal('path-image.png');
      expect(email.files[0].contentType).to.equal('image/png');
    });

    it('should support attachments via url', function() {
      var email = new Email();
      email.addFile({filename: 'url-image.jpg', url: 'http://i.imgur.com/2fDh8.jpg'});
      expect(email.files[0].filename).to.equal('url-image.jpg');
      expect(email.files[0].contentType).to.equal('image/jpeg');
    });

    it('should support attachments via content', function() {
      var email = new Email();
      fs.readFile(files[0], function(err, data) {
        expect(err).to.not.be.ok;
        email.addFile({filename: 'content-image.png', content: data, contentType: 'image/png'});
        expect(email.files[0].filename).to.equal('content-image.png');
        expect(email.files[0].contentType).to.equal('image/png');
      });
    });

    it('should support inline content', function() {
      var email = new Email();
      fs.readFile(files[0], function(err, data) {
        expect(err).to.not.be.ok;
        email.addFile({filename: 'content-image.png', content: data, contentType: 'image/png', cid: 'testcid'});
        expect(email.files[0].cid).to.equal('testcid');
        expect(email.files[0].filename).to.equal('content-image.png');
        expect(email.files[0].contentType).to.equal('image/png');
      });
    });
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

  describe('file handling the constructor', function() {
    it('should be able to add content files easily', function(done) {
      var file = {
        filename: 'hello_snowman.txt',
        content: new Buffer("Hello ☃, I hope you don't melt", 'utf-8')
      };
      var email = new Email({
        files: [
          file
        ]
      });

      email.files[0].loadContent(function(error, message) {
        expect(error).to.not.be.true;
        expect(email.files[0].content).to.eql(file.content);
        done();
      });
    });

    it('should be able to add url files easily', function(done) {
      var file = {
        filename: 'icon.jpg',
        url: 'http://i.imgur.com/2fDh8.jpg'
      };
      var email = new Email({
        files: [
          file
        ]
      });

      expect(email.files[0].filename).to.equal(file.filename);
      expect(email.files[0].content).to.eql(file.content);
      expect(email.files[0].contentType).to.equal('image/jpeg');

      email.files[0].loadContent(function(error, message) {
        expect(error).to.not.be.true;
        expect(email.files[0].content).to.not.be.undefined;
        done();
      });
    });

    it('should be able to add path files easily', function(done) {
      var file = {
        path: __dirname + '/../assets/secret.txt'
      };
      var email = new Email({
        files: [
          file
        ]
      });

      email.files[0].loadContent(function(error, message) {
        expect(error).to.not.be.true;
        expect(email.files[0].content).to.not.be.undefined;
        done();
      });
    });
  });
});
