var SendGrid = require('../../lib/sendgrid');
var Email = require('../../lib/Email');

var api_user = require('../test.setup').user;
var api_key = require('../test.setup').pass;
var single_to = require('../test.setup').single_to;
var t_from = require('../test.setup').from;

describe('attachments', function(){
  var sendgrid;
  beforeEach(function() {
    sendgrid = new SendGrid(api_user, api_key);
  });

  it('should be able to send files via web', function(done) {
    var mail = new Email({
      to: single_to,
      from: t_from,
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
      to: single_to,
      from: t_from,
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
