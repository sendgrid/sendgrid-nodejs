const { assert } = require('chai');

const MailService = require('./mail-service');
describe('MailService send', () => {
  it('should not mutate original data variable', () => {
    const mailService = new MailService();
    mailService.setClient({
      request: (req, cb) => {
        return new Promise((resolve) => {
          resolve();
        });
      },
    });
    const data = {
      to: 'test@example.com',
      from: 'test@example.com', // Use the email address or domain you verified above
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    return mailService.send(data).then(() => {
      assert.deepStrictEqual(data,
        {
          to: 'test@example.com',
          from: 'test@example.com', // Use the email address or domain you verified above
          subject: 'Sending with Twilio SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        });

    });
  });
});
