var Email = require('../../lib/email');
var fs = require('fs');

var default_payload = {
  to        : 'david.tomberlin@sendgrid.com',
  from      : 'kyle.partridge@sendgrid.com',
  subject   : 'Subject',
  text      : 'This is an email.'
};

var files = [
  __dirname + '/../assets/logo.png',
  __dirname + '/../assets/sendgrid.txt'
]

describe('Email', function () {
  it('should allow attributes to be set in the constructor', function() {
    var payload     = Object.create(default_payload);
    var email       = new Email(payload);
    for (var key in payload) {
      expect(payload[key]).to.eql(email[key]);
    }
  });

  describe("#toWebFormat", function() {
    it('should return a Web Api format as expected', function() {
      var payload     = Object.create(default_payload);
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.to);
      expect(format.from).to.equal(payload.from);
      expect(format.subject).to.equal(payload.subject);
      expect(format.text).to.equal(payload.text);
      expect(format.fromname).to.be.empty;
      expect(format.toname).to.be.empty;
    });

    it('should not have a field for undefined file', function() {
      var payload     = Object.create(default_payload);
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.to);
      expect(format.from).to.equal(payload.from);
      expect(format.subject).to.equal(payload.subject);
      expect(format.text).to.equal(payload.text);
      expect(format.fromname).to.be.empty;
      expect(format.toname).to.be.empty;
      expect(format['files[undefined]']).to.be.undefined;
    });

    it('should not have a field for undefined file even with Array prototype overridden', function() {
      
      Array.prototype['testMethod'] = function() {
        return 'testMethod';
      };
      
      var payload     = Object.create(default_payload);
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.to);
      expect(format.from).to.equal(payload.from);
      expect(format.subject).to.equal(payload.subject);
      expect(format.text).to.equal(payload.text);
      expect(format.fromname).to.be.empty;
      expect(format.toname).to.be.empty;
      expect(format['files[undefined]']).to.be.undefined;
    });
    
    it('should not have a to address if there is no to or no smtpapi.', function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', subject: 'testing', text: 'testing'});  
      var format = email.toWebFormat();
      expect(format.to).to.be.empty;
    });

    it('should have a to address if there is no to but there is an smtpapi to', function() {
      var payload     = Object.create(default_payload);
      payload.to      = "";
      var email       = new Email(payload);
      email.addTo("test@test.com");
      var format = email.toWebFormat();

      expect(JSON.parse(format['x-smtpapi']).to).to.not.be.empty;
      expect(format.to).to.not.be.empty; 
    });

    it("should set a fromname if one is provided", function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', fromname:'Tester T. Testerson', subject: 'testing', text: 'testing'});
      var format = email.toWebFormat();

      expect(format.fromname).to.equal('Tester T. Testerson');
    });

    it("should set a toname if one is provided", function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', to:'test@test.com', toname:'Tester T. Testerson', subject: 'testing', text: 'testing'});
      var format = email.toWebFormat();

      expect(format.toname).to.equal('Tester T. Testerson');
    });

    it("should set multiple tonames if several are provided", function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', to: ['test@test.com', 'test2@test.com'], toname:['Tester T. Testerson', 'Test2 M. Testerson'], subject: 'testing', text: 'testing'});
      var format = email.toWebFormat();

      expect(format.toname[0]).to.equal('Tester T. Testerson');
      expect(format.toname[1]).to.equal('Test2 M. Testerson');
    });
  });

  describe("#toSmtpFormat", function() {
    it('should return an Smtp Api format as expected', function() {
      var payload     = Object.create(default_payload);
      var email       = new Email(payload);
      var format      = email.toSmtpFormat();

      expect(format.to).to.equal(payload.to);
      expect(format.sender).to.equal(payload.from);
      expect(format.subject).to.equal(payload.subject);
      expect(format.body).to.equal(payload.text);
    });

    it('should not have a to address if there is no to or no smtpapi.to set via Smtp Api', function() {
      var email = new Email({from: 'test@test.com', subject: 'testing', text: 'testing'});
      var format = email.toSmtpFormat();
      expect(format.to).to.be.empty;
    });
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
