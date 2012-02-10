var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/Email');

describe('attachments', function(){
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
      console.log('now sending');
      sendgrid.send(mail, function(success, message) {
        console.log('message: %s', message);
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
        console.log('message: %s', message);
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
  });

});
