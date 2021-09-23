'use strict';

/**
 * Dependencies
 */
const sgMail = require('./mail');
const sgClient = sgMail.client;

/**
 * Setup client
 */
before(() => {
  sgClient.setApiKey('SendGrid API Key');
});

/**
 * Default mock header
 */
beforeEach(() => {
  sgClient.setDefaultHeader('X-Mock', 202);
});

/**
 * Tests
 */
describe('sgMail.send()', () => {

  //Create mail data
  const data = {
    to: 'recipient@example.org',
    from: 'sender@example.org',
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
  };

  it('should throw an error when no data provided', () => {
    return expect(sgMail.send()).to.eventually.be.rejectedWith(Error);
  });

  it('should send a basic email', async () => {
    sgClient.setDefaultHeader('X-Mock', 202);
    return sgMail
      .send(data)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(202);
      });
  });

  it('should throw an error if callback is not a function', () => {
    return expect(function() {
      sgMail.send(data, false, {});
    }).to.throw(Error);
  });

  it('should include custom headers to the request', async () => {
    sgClient.setDefaultHeader('X-Mock', 202);
    const clientSpy = sinon.spy(sgClient, "request")
    return sgMail
      .send(Object.assign(data, { headers: { customHeader: "Custom Header Content" } }))
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(202);
        expect(clientSpy).to.have.been.calledWith(sinon.match({
          url: "/v3/mail/send",
          method: "POST",
          headers: { customHeader: "Custom Header Content" }
        }));
      });
  });

  it('should send email with correct replyToList format', async () => {
    sgClient.setDefaultHeader('X-Mock', 202);
    data["replyToList"] = [
      {
        "name": "Test Team",
        "email": "test@twilio.com"
      },
      {
        "name": "Support Test Team",
        "email": "support.test@twilio.com"
      }
    ];
    return sgMail
      .send(data)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(202);
      });
  });

  it('should throw error with wrong replyToList format', async () => {
    sgClient.setDefaultHeader('X-Mock', 202);
    data["replyToList"] = {
      "name": "Support Test Team",
      "email": "support.test@twilio.com"
    };
    return expect(function() {
      sgMail.send(data, false, {});
    }).to.throw(Error);
  });

  it('should throw error if any record in replyToList is without email', async () => {
    data["replyToList"] = [
      {
        "name": "Test Team",
        "email": "test@twilio.com"
      },
      {
        "name": "Support Test Team"
      }
    ];
    return expect(function() {
      sgMail.send(data, false, {});
    }).to.throw(Error);
  });

  it('should throw error if both replyTo and replyToList are mentioned', async () => {
    data["replyTo"] = {
        "name": "Test Team234234",
        "email": "test234235@twilio.com"
      };
    data["replyToList"] = [
      {
        "name": "Test Team",
        "email": "test@twilio.com"
      },
      {
        "name": "Support Test Team",
        "email": "support.test@twilio.com"
      }
    ];
    return expect(function() {
      sgMail.send(data, false, {});
    }).to.throw(Error);
  });
});

