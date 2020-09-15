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
  sgClient.setDefaultHeader('X-Mock', 200);
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

  it('should send a basic email', () => {
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgMail
      .send(data)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });

  it('should throw an error if callback is not a function', () => {
    return expect(function() {
      sgMail.send(data, false, {});
    }).to.throw(Error);
  });

  it('should throw an error if both "text" and "dynamicTemplateData" have values', () => {
    return expect(function() {
      const conflictingDynamicTemplateData = {
        to: 'recipient@example.org',
        from: 'sender@example.org',
        subject: 'Hello world',
        text: 'Hello plain world!',
        dynamicTemplateData: 'Some fancy template data'
      }
      sgMail.send(conflictingDynamicTemplateData, false, {});
    }).to.throw(Error);
  });

  it('should throw an error if both "text" and "html" have values', () => {
    return expect(function() {
      const conflictingTextandHTML = {
        to: 'recipient@example.org',
        from: 'sender@example.org',
        subject: 'Hello world',
        text: 'Hello plain world!',
        html: '<p>Hello HTML world!</p>',
      };
      sgMail.send(conflictingTextandHTML, false, {});
    }).to.throw(Error);
  });
});
