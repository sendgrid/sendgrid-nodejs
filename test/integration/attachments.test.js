var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/Email');

var api_user = 'kylep';
var api_key = 'testing';

describe('attachments', function(){
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(api_user, api_key);
  });

  it('should be able to send files via web', function(done) {
    var mail = new Email({
      to: 'kyle.partridge@sendgrid.com',
      from: 'david.tomberlin@sendgrid.com',
      subject: '(Web) File attachments',
      text: 'test of files',
      files: {
        'Logo.png': __dirname + '/../assets/logo.png',
        'Secret.txt': __dirname + '/../assets/secret.txt'
      }
    });

    sendgrid.send(mail, function(success, message) {
      if (!success) assert.ok(false, message);
      done();
    });
  });

  it('should be able to send files via Smtp', function(done) {
    var mail = new Email({
      to: 'kyle.partridge@sendgrid.com',
      from: 'david.tomberlin@sendgrid.com',
      subject: '(Smtp) File attachments',
      text: 'test of files',
      files: {
        'Logo.png': __dirname + '/../assets/logo.png',
        'Secret.txt': __dirname + '/../assets/secret.txt'
      }
    });

    sendgrid.smtp(mail, function(success, message) {
      if (!success) assert.ok(false, message);
      done();
    });
  });
});
