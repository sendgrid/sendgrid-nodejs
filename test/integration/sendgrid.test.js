process.env.NODE_ENV = 'test'; var dotenv = require('dotenv')(); dotenv.load();

var API_USER    = process.env.API_USER || 'some_sendgrid_username';
var API_KEY     = process.env.API_KEY || 'some_sendgrid_password';
var default_payload = {
  to            : process.env.TO || "hello@example.com",
  from          : process.env.FROM || "swift@sendgrid.com",
  subject       : "[sendgrid-nodejs] ",
  text          : "This is a text body",
  html          : "<h2>This is an html body</h2>"
}

var SendGrid = require('../../lib/sendgrid')
  , Email = require('../../lib/email');

describe('SendGrid #skip', function () {
  var sendgrid;

  beforeEach(function() {
    sendgrid  = new SendGrid(API_USER, API_KEY);
  });

  describe('#send', function() {
    var payload;

    beforeEach(function() {
      payload = Object.create(default_payload);
      payload.subject += "web ";
    });

    it('has a blank send payload', function(done) {
      sendgrid.send({}, function(success, message) {
        expect(success).to.be.false;
        
        done();
      });
    });

    it('has an optional callback', function(done) {
      payload.subject += "has an optional callback";

      expect(function() {
        sendgrid.send(payload);
      }).to.not.throw(Error);

      done();
    });

    it('has array of TOs', function(done) {
      payload.subject += "has array of TOs";
      payload.to = [process.env.TO]

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('has multiple array of TOs', function(done) {
      payload.subject += "has multiple array of TOs";
      payload.to = [process.env.TO, 'sendgrid-nodejs@mailinator.com']

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('encodes unicode like ✔', function(done) {
      payload.subject += "encodes unicode like ✔";

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('with optional TO name and FROM name', function(done) {
      payload.subject   += "with optional TO name and FROM name";
      payload.toname    = "to name";
      payload.fromname  = "from name";

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles content files', function(done) {
      payload.subject   += "handles content files";
      payload.files     = [
        {filename: 'secret.txt', content: new Buffer("File Content")}
      ];

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles content files addFile approach', function(done) {
      payload.subject   += "handles content files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'secret.txt', content: new Buffer("File Content")});

      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles url files', function(done) {
      payload.subject   += "handles url files";
      payload.files     = [
        {filename: 'icon.jpg', url: "http://i.imgur.com/2fDh8.jpg"}
      ];

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles url files addFile approach', function(done) {
      payload.subject   += "handles url files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'icon.jpg', url: "http://i.imgur.com/2fDh8.jpg"});

      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles path files', function(done) {
      payload.subject   += "handles path files";
      payload.files     = [
        {path: __dirname + '/../assets/logo.png'}
      ];

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles path files addFile approach', function(done) {
      payload.subject   += "handles path files addFile approach";
      var email         = new Email(payload);
      email.addFile({path: __dirname + '/../assets/logo.png'});

      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles empty files', function(done) {
      payload.subject   += "handles empty files";
      payload.files     = [
        {filename: 'empty-test'}
      ]

      sendgrid.send(payload, function(success, message) {
        console.log(message);
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles empty files addFile approach', function(done) {
      payload.subject   += "handles empty files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'empty-test'});

      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles inline content', function(done) {
      payload.subject   += "handles inline content";
      payload.files     = [
        {
          filename: 'icon.jpg', 
          cid:      'photo1', 
          url:      'http://i.imgur.com/2fDh8.jpg'
        }
      ]
      payload.html      = "<img src='cid:photo1'/>";

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles inline content addFile approach', function(done) {
      payload.subject   += "handles inline content addFile approach";
      var email         = new Email(payload);
      email.addFile({
        filename: 'icon.jpg', 
        cid:      'photo1', 
        url:      'http://i.imgur.com/2fDh8.jpg'
      }); 
      email.html      = "<img src='cid:photo1'/>";

      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles file even if contentType is empty', function(done) {
      payload.subject   += "handles file even if contentType is empty";
      payload.files     = [
        {
          filename:     'icon.jpg',
          url:          'http://i.imgur.com/2fDh8.jpg',
          contentType:  ''
        }
      ]
 
      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles file even if contentType is empty addFile approach', function(done) {
      payload.subject   += "handles file even if contentType is empty addFile approach";
      var email         = new Email(payload);
      email.addFile({
        filename:     'icon.jpg',
        url:          'http://i.imgur.com/2fDh8.jpg',
        contentType:  ''
      });      
 
      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles large files', function(done) {
      payload.subject   += "handles large files";
      payload.files     = [
        {filename: 'rails.zip', url: "https://github.com/rails/rails/archive/master.zip"}
      ];

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles multiple files', function(done) {
      payload.subject   += "handles multiple files";
      payload.files     = [
        {filename: 'rails.zip', url: "https://github.com/rails/rails/archive/master.zip"},
        {filename: 'icon.jpg', url: 'http://i.imgur.com/2fDh8.jpg'}
      ];

      sendgrid.send(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles the reply_to field', function(done) {
      payload.subject   += "handles the reply_to field";

      var email         = new Email(payload);
      email.replyto     = 'noreply@sendgrid.com';
      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles filters', function(done) {
      payload.subject   += "handles filters";

      var email = new Email(payload);
      email.addFilterSetting('footer', 'enable', 1);
      email.addFilterSetting('footer', 'text/plain', 'This is mah footer!');
      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles filters with unicode parameters', function(done) {
      payload.subject   += "handles filters with unicode parameters";
      
      var email = new Email(payload);
      email.addFilterSetting('footer', 'enable', 1);
      email.addFilterSetting('footer', 'text/plain', 'This is mah footer with a ✔ in it!');
      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles substitution values', function(done) {
      payload.subject   += "handles substitution values";
      
      var email = new Email(payload);
      email.addSubVal('-name-',['Panda', 'Cow']);
      email.html = 'You are a <strong>-name-</strong>';
      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles sections being set in the email', function(done) {
      payload.subject   += "handles sections being set in the email";
      
      var email = new Email(payload);
      //mail.addTo(setup.multi_to);
      email.addSubVal('-name-', ['Kyle', 'David']);
      email.addSubVal('-meme-', ['-kyleSection-', '-davidSection-']);
      email.addSection({'-kyleSection-': 'I heard you liked batman so I killed your parents'});
      email.addSection({'-davidSection-': 'Metal gear?!!?!!!!eleven'});
      email.html = "Yo -name-!<br /> Here's a meme for you:<br /> -meme-";
      sendgrid.send(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });
  });

  describe('#smtp', function() {
    var payload;

    beforeEach(function() {
      sendgrid.SMTP = "STUB";

      payload = Object.create(default_payload);
      payload.subject += "smtp ";
    });

    it('has an optional callback', function(done) {
      payload.subject += "has an optional callback";

      expect(function() {
        sendgrid.smtp(payload);
      }).to.not.throw(Error);

      done();
    });

    it('sends successfully', function(done) {
      payload.subject += "sends successfully";

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('encodes unicode like ✔', function(done) {
      payload.subject += "encodes unicode like ✔";

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('with optional TO name and FROM name', function(done) {
      payload.subject   += "with optional TO name and FROM name";
      payload.toname    = "to name";
      payload.fromname  = "from name";

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles content files', function(done) {
      payload.subject   += "handles content files";
      payload.files     = [
        {filename: 'secret.txt', content: new Buffer("File Content")}
      ];

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles content files addFile approach', function(done) {
      payload.subject   += "handles content files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'secret.txt', content: new Buffer("File Content")});

      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles url files', function(done) {
      payload.subject   += "handles url files";
      payload.files     = [
        {filename: 'icon.jpg', url: "http://i.imgur.com/2fDh8.jpg"}
      ];

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles url files addFile approach', function(done) {
      payload.subject   += "handles url files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'icon.jpg', url: "http://i.imgur.com/2fDh8.jpg"});

      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles path files', function(done) {
      payload.subject   += "handles path files";
      payload.files     = [
        {path: __dirname + '/../assets/logo.png'}
      ];

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles path files addFile approach', function(done) {
      payload.subject   += "handles path files addFile approach";
      var email         = new Email(payload);
      email.addFile({path: __dirname + '/../assets/logo.png'});

      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles empty files', function(done) {
      payload.subject   += "handles empty files";
      payload.files     = [
        {filename: 'empty-test'}
      ]

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles empty files addFile approach', function(done) {
      payload.subject   += "handles empty files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'empty-test'});

      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;
        
        done();
      });
    });

    it('handles inline content', function(done) {
      payload.subject   += "handles inline content";
      payload.files     = [
        {
          filename: 'icon.jpg', 
          cid:      'photo1', 
          url:      'http://i.imgur.com/2fDh8.jpg'
        }
      ]
      payload.html      = "<img src='cid:photo1'/>";

      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles inline content addFile approach', function(done) {
      payload.subject   += "handles inline content addFile approach";
      var email         = new Email(payload);
      email.addFile({
        filename: 'icon.jpg', 
        cid:      'photo1', 
        url:      'http://i.imgur.com/2fDh8.jpg'
      }); 
      email.html      = "<img src='cid:photo1'/>";

      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles file even if contentType is empty', function(done) {
      payload.subject   += "handles file even if contentType is empty";
      payload.files     = [
        {
          filename:     'icon.jpg',
          url:          'http://i.imgur.com/2fDh8.jpg',
          contentType:  ''
        }
      ]
 
      sendgrid.smtp(payload, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles file even if contentType is empty addFile approach', function(done) {
      payload.subject   += "handles file even if contentType is empty addFile approach";
      var email         = new Email(payload);
      email.addFile({
        filename:     'icon.jpg',
        url:          'http://i.imgur.com/2fDh8.jpg',
        contentType:  ''
      });      
 
      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;

        done();
      });
    });

    it('handles the reply_to field', function(done) {
      payload.subject   += "handles the reply_to field";

      var email         = new Email(payload);
      email.replyto     = 'noreply@sendgrid.com';
      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles filters', function(done) {
      payload.subject   += "handles filters";

      var email = new Email(payload);
      email.addFilterSetting('footer', 'enable', 1);
      email.addFilterSetting('footer', 'text/plain', 'This is mah footer!');
      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles filters with unicode parameters', function(done) {
      payload.subject   += "handles filters with unicode parameters";
      
      var email = new Email(payload);
      email.addFilterSetting('footer', 'enable', 1);
      email.addFilterSetting('footer', 'text/plain', 'This is mah footer with a ✔ in it!');
      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles substitution values', function(done) {
      payload.subject   += "handles substitution values";
      
      var email = new Email(payload);
      email.addSubVal('-name-',['Panda', 'Cow']);
      email.html = 'You are a <strong>-name-</strong>';
      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });

    it('handles sections being set in the email', function(done) {
      payload.subject   += "handles sections being set in the email";
      
      var email = new Email(payload);
      //mail.addTo(setup.multi_to);
      email.addSubVal('-name-', ['Kyle', 'David']);
      email.addSubVal('-meme-', ['-kyleSection-', '-davidSection-']);
      email.addSection({'-kyleSection-': 'I heard you liked batman so I killed your parents'});
      email.addSection({'-davidSection-': 'Metal gear?!!?!!!!eleven'});
      email.html = "Yo -name-!<br /> Here's a meme for you:<br /> -meme-";
      sendgrid.smtp(email, function(success, message) {
        expect(success).to.be.true;
        done();
      });
    });
  });
});
