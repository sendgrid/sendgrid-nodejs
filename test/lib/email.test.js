var Email = require('../../lib/email');

var text_params = {
  to: 'david.tomberlin@sendgrid.com',
  from: 'kyle.partridge@sendgrid.com',
  subject: 'Subject',
  text: 'This is an email.'
};

describe('Email', function () {
  describe('validation', function() {
    it('should invalidate when there are no parameters', function() {
      var mail = new Email();

      mail.validate().should.be.false;
    });

    it('should return true when the mail is valid', function() {
      var mail = new Email(text_params);

      mail.validate().should.be.true;
    });
  });
});
