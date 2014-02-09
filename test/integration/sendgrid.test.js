process.env.NODE_ENV = 'test'; 
var dotenv = require('dotenv')(); 
dotenv.load();

var API_USER    = process.env.SENDGRID_USERNAME || 'some_sendgrid_username';
var API_KEY     = process.env.SENDGRID_PASSWORD || 'some_sendgrid_password';
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

  describe('#send', function() {
    var payload;

    beforeEach(function() {
      sendgrid  = new SendGrid(API_USER, API_KEY);
      payload   = Object.create(default_payload);
      payload.subject += "web ";
    });

    it('has a blank send payload', function(done) {
      sendgrid.send({}, function(err, json) {
        expect(err.message).to.equal("Missing destination email");
        
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

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;

        done();
      });
    });

    it('has multiple array of TOs', function(done) {
      payload.subject += "has multiple array of TOs";
      payload.to = [process.env.TO, 'sendgrid-nodejs@mailinator.com']

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;

        done();
      });
    });

    it('has multiple array of TOs using addTo', function(done) {
      payload.subject += "has multiple array of TOs using addTo";
      payload.to = [process.env.TO, 'sendgrid-nodejs@mailinator.com']
      var email  = new Email(payload);
      email.addTo(payload.to[0]);
      email.addTo(payload.to[1]);

      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;

        done();
      });
    });

    it('has array of BCCs', function(done) {
      payload.subject += "has array of BCCs";
      payload.bcc = ['sendgrid-nodejs@mailinator.com']

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;

        done();
      });
    });

    it('encodes unicode like ✔', function(done) {
      payload.subject += "encodes unicode like ✔";

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');
        
        done();
      });
    });

    it('with optional TO name and FROM name', function(done) {
      payload.subject   += "with optional TO name and FROM name";
      payload.toname    = "to name";
      payload.fromname  = "from name";

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles content files', function(done) {
      payload.subject   += "handles content files";
      payload.files     = [
        {filename: 'secret.txt', content: new Buffer("File Content")}
      ];

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles content files addFile approach', function(done) {
      payload.subject   += "handles content files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'secret.txt', content: new Buffer("File Content")});

      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles url files', function(done) {
      payload.subject   += "handles url files";
      payload.files     = [
        {filename: 'icon.jpg', url: "http://i.imgur.com/2fDh8.jpg"}
      ];

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles url files addFile approach', function(done) {
      payload.subject   += "handles url files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'icon.jpg', url: "http://i.imgur.com/2fDh8.jpg"});

      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles path files', function(done) {
      payload.subject   += "handles path files";
      payload.files     = [
        {path: __dirname + '/../assets/logo.png'}
      ];

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');
        
        done();
      });
    });

    it('handles path files addFile approach', function(done) {
      payload.subject   += "handles path files addFile approach";
      var email         = new Email(payload);
      email.addFile({path: __dirname + '/../assets/logo.png'});

      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');
        
        done();
      });
    });

    it('handles empty files', function(done) {
      payload.subject   += "handles empty files";
      payload.files     = [
        {filename: 'empty-test'}
      ]

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');
        
        done();
      });
    });

    it('handles empty files addFile approach', function(done) {
      payload.subject   += "handles empty files addFile approach";
      var email         = new Email(payload);
      email.addFile({filename: 'empty-test'});

      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');
        
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

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

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

      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

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
 
      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

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
 
      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles large files', function(done) {
      this.timeout(30000);

      payload.subject   += "handles large files";
      payload.files     = [
        {filename: 'rails.zip', url: "https://github.com/rails/rails/archive/master.zip"}
      ];

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles multiple files', function(done) {
      this.timeout(30000);

      payload.subject   += "handles multiple files";
      payload.files     = [
        {filename: 'rails.zip', url: "https://github.com/rails/rails/archive/master.zip"},
        {filename: 'icon.jpg', url: 'http://i.imgur.com/2fDh8.jpg'}
      ];

      sendgrid.send(payload, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles the reply_to field', function(done) {
      payload.subject   += "handles the reply_to field";

      var email         = new Email(payload);
      email.replyto     = 'noreply@sendgrid.com';
      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');
        done();
      });
    });

    it('handles filters', function(done) {
      payload.subject   += "handles filters";

      var email = new Email(payload);
      email.addFilter('footer', 'enable', 1);
      email.addFilter('footer', 'text/plain', 'This is mah footer!');
      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles filters with unicode parameters', function(done) {
      payload.subject   += "handles filters with unicode parameters";
      
      var email = new Email(payload);
      email.addFilter('footer', 'enable', 1);
      email.addFilter('footer', 'text/plain', 'This is mah footer with a ✔ in it!');
      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles substitution values', function(done) {
      payload.subject   += "handles substitution values";
      
      var email = new Email(payload);
      email.addSubstitution('-name-',['Panda', 'Cow']);
      email.html = 'You are a <strong>-name-</strong>';
      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });

    it('handles sections being set in the email', function(done) {
      payload.subject   += "handles sections being set in the email";
      
      var email = new Email(payload);
      //mail.addTo(setup.multi_to);
      email.addSubstitution('-name-', ['Kyle', 'David']);
      email.addSubstitution('-meme-', ['-kyleSection-', '-davidSection-']);
      email.addSection({'-kyleSection-': 'I heard you liked batman so I killed your parents'});
      email.addSection({'-davidSection-': 'Metal gear?!!?!!!!eleven'});
      email.html = "Yo -name-!<br /> Here's a meme for you:<br /> -meme-";
      sendgrid.send(email, function(err, json) {
        expect(err).to.be.null;
        expect(json.message).to.equal('success');

        done();
      });
    });
  });
});
