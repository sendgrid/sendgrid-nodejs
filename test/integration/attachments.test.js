var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/Email');

describe('attachments', function(){
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(setup.api_user, setup.api_key);
  });

  it('should be able to send files via web', function(done) {
    var mail = new Email({
      to: setup.single_to,
      from: setup.from,
      subject: '(Web) File attachments',
      text: 'test of files',
      files: {
        'Logo.png': __dirname + '/../assets/logo.png',
        'Secret.txt': __dirname + '/../assets/secret.txt'
      }
    });

    sendgrid.send(mail, function(success, message) {
      expect(success).to.be.true;
      done();
    });
  });

  it('should be able to send files via Smtp', function(done) {
    var mail = new Email({
      to: setup.single_to,
      from: setup.from,
      subject: '(Smtp) File attachments',
      text: 'test of files',
      files: {
        'Logo.png': __dirname + '/../assets/logo.png',
        'Secret.txt': __dirname + '/../assets/secret.txt'
      }
    });

    sendgrid.smtp(mail, function(success, message) {
      expect(success).to.be.true;
      done();
    });
  });
});
