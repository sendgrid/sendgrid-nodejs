var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/email');

describe('attachments #skip', function(){
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(setup.api_user, setup.api_key);
  });

  describe('web', function() {
    var mail;
    beforeEach(function() {
      mail = new Email({
        to: setup.single_to,
        from: setup.from,
        text: 'test of web files'
      });
    });

    it('should be able to send files via path', function(done) {
      var file = {
        filename: 'logo.png',
        path: __dirname + '/../assets/logo.png'
      };

      mail.subject = '(Web-path) File attachments';
      mail.addFile(file);
      sendgrid.send(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should be able to send files via url', function(done) {
      var file = {
        filename: 'icon.jpg',
        url: 'http://i.imgur.com/2fDh8.jpg'
      };

      mail.subject = '(Web-url) File attachments';
      mail.addFile(file);
      sendgrid.send(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should be able to send files via content', function(done) {
      var file = {
        filename: 'hello_snowman.txt',
        content: new Buffer("Hello ☃, I hope you don't melt", 'utf-8'),
        contentType: 'text/plain'
      };

      mail.subject = '(Web-content) File attachments';
      mail.addFile(file);
      sendgrid.send(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should be able to send files as inline content', function(done) {
      var file = {
        cid: 'the_logo',
        filename: 'logo.png',
        path: __dirname + '/../assets/logo.png'
      };

      mail.subject = '(Web) File inline attachments'; 
      mail.html = 'The inline image should appear between the arrows:'
                  + '<br/>vvvvvvvvvvvvvvvvv<br/>'
                  + '<img src="cid:the_logo">'
                  + '<br/>^^^^^^^^^^^^^^<br/>'
                  + '<br/>The image may also appear as an attachment below.<br/>',
      mail.addFile(file);
      sendgrid.send(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });
  });

  describe('smtp', function() {
    var mail;
    beforeEach(function() {
      mail = new Email({
        to: setup.single_to,
        from: setup.from,
        text: 'test of smtp files'
      });
    });

    it('should be able to send files via path', function(done) {
      var file = {
        filename: 'logo.png',
        path: __dirname + '/../assets/logo.png'
      };

      mail.subject = '(Smtp-path) File attachments';
      mail.addFile(file);
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should be able to send files via url', function(done) {
      var file = {
        filename: 'icon.jpg',
        url: 'http://i.imgur.com/2fDh8.jpg'
      };

      mail.subject = '(Smtp-url) File attachments';
      mail.addFile(file);
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should be able to send files via content', function(done) {
      var file = {
        filename: 'hello_snowman.txt',
        content: new Buffer("Hello ☃, I hope you don't melt", 'utf-8'),
        contentType: 'text/plain'
      };

      mail.subject = '(Smtp-content) File attachments';
      mail.addFile(file);
      mail.addFile(file);
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should be able to send multiple files via content', function(done) {
      mail.subject = '(Smtp-content) File attachments';
      mail.addFile({
        filename: 'hello_snowman.txt',
        content: new Buffer("Hello ☃, I hope you don't melt", 'utf-8'),
        contentType: 'text/plain'
      });
      mail.addFile({
        filename: 'hello_snowman2.txt',
        content: new Buffer("Hello ☃, I hope you melt", 'utf-8'),
        contentType: 'text/plain'
      });
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('should respond with an error when no content is given', function(done) {
      mail.subject = '(Smtp-content) File attachments (failure expected)';
      mail.addFile({
        filename: 'hello_snowman.txt',
        contentType: 'text/plain'
      });
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.false;
        expect(message).to.equal('File was not included');
        done();
      });
    });

    it('should respond with an error when no content is given, even if other files are successful', function(done) {
      mail.subject = '(Smtp-content) File attachments (failure expected)';
      mail.addFile({
        filename: 'hello_snowman.txt',
        contentType: 'text/plain'
      });
      mail.addFile({
        filename: 'hello_snowman2.txt',
        content: new Buffer("Hello ☃, I hope you melt", 'utf-8'),
        contentType: 'text/plain'
      });
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.false;
        expect(message).to.equal('File was not included');
        done();
      });
    });

    it('should be able to inline content', function(done) {
      var file = {
        cid: 'the_logo',
        filename: 'logo.png',
        path: __dirname + '/../assets/logo.png'
      };

      mail.subject = '(Smtp) Inline file attachment';
      mail.html = 'The inline image should appear between the arrows:'
                  + '<br/>vvvvvvvvvvvvvvvvv<br/>'
                  + '<img src="cid:the_logo">'
                  + '<br/>^^^^^^^^^^^^^^<br/>'
                  + '<br/>The image may also appear as an attachment below.<br/>',
      mail.addFile(file);
      sendgrid.smtp(mail, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

  });
});
