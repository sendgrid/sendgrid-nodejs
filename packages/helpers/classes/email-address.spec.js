'use strict';

/**
 * Dependencies
 */
const EmailAddress = require('./email-address');

/**
 * Tests
 */
describe('EmailAddress', function() {

  //Test data
  const data = [
    'test@example.org',
    'Test <test@example.org>',
    {name: 'Test', email: 'test@example.org'},
  ];

  //Create emails individually and from array
  const emails = data.map(email => EmailAddress.create(email));
  const emailsArr = EmailAddress.create(data);

  //Set email
  describe('setEmail()', function() {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should set the email address', function() {
      email.setEmail('test@example.org');
      expect(email.email).to.equal('test@example.org');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        email.setEmail(5);
      }).to.throw(Error);
      expect(function() {
        email.setEmail(null);
      }).to.throw(Error);
    });
    it('should throw an error for no input', function() {
      expect(function() {
        email.setEmail();
      }).to.throw(Error);
    });
  });

  //Set name
  describe('setName()', function() {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should set the name', function() {
      email.setName('Test');
      expect(email.name).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        email.setName(5);
      }).to.throw(Error);
      expect(function() {
        email.setName(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        email.setName();
      }).not.to.throw(Error);
    });
  });

  //To JSON
  describe('toJSON()', function() {
    it('should always have the email field', function() {
      emails.forEach(email => {
        const json = email.toJSON();
        expect(json).to.have.property('email');
        expect(json.email).to.equal(email.email);
      });
    });
    it('should have the name field if given', function() {
      emails.filter(email => email.name !== '').forEach(email => {
        const json = email.toJSON();
        expect(json).to.have.property('name');
        expect(json.name).to.equal(email.name);
      });
    });
    it('should not have the name field if not given', function() {
      emails.filter(email => email.name === '').forEach(email => {
        const json = email.toJSON();
        expect(json).not.to.have.property('name');
      });
    });
  });

  //Static create method
  describe('create()', function() {
    it('smoke test', function() {
      expect(emails).to.be.an.instanceof(Array);
      expect(emails).to.have.length(3);
    });
    it('should create email address instances from given data', function() {
      emails.forEach(email => {
        expect(email).to.be.an.instanceof(EmailAddress);
      });
    });
    it('should have the expected properties', function() {
      emails.forEach(email => {
        expect(email).to.have.property('email');
        expect(email).to.have.property('name');
      });
    });
    it('should handle email address strings', function() {
      expect(emails[0].email).to.equal('test@example.org');
      expect(emails[0].name).to.equal('');
    });
    it('should handle name and email address strings', function() {
      expect(emails[1].email).to.equal('test@example.org');
      expect(emails[1].name).to.equal('Test');
    });
    it('should handle objects', function() {
      expect(emails[2].email).to.equal('test@example.org');
      expect(emails[2].name).to.equal('Test');
    });
    it('should handle arrays', function() {
      expect(emailsArr).to.be.an.instanceof(Array);
      expect(emailsArr).to.have.length(3);
    });
    it('should create email address instances from given data', function() {
      emailsArr.forEach(email => {
        expect(email).to.be.an.instanceof(EmailAddress);
      });
    });
    it('should have the expected properties', function() {
      emailsArr.forEach(email => {
        expect(email).to.have.property('email');
        expect(email).to.have.property('name');
      });
    });
    it('should handle email address strings', function() {
      expect(emailsArr[0].email).to.equal('test@example.org');
      expect(emailsArr[0].name).to.equal('');
    });
    it('should handle name and email address strings', function() {
      expect(emailsArr[1].email).to.equal('test@example.org');
      expect(emailsArr[1].name).to.equal('Test');
    });
    it('should handle objects', function() {
      expect(emailsArr[2].email).to.equal('test@example.org');
      expect(emailsArr[2].name).to.equal('Test');
    });
    it('should handle instances of EmailAddress', function() {
      const email1 = new EmailAddress({email: 'test@example.org'});
      const email2 = EmailAddress.create(email1);
      expect(email2).to.be.an.instanceof(EmailAddress);
      expect(email2.email).to.equal(email1.email);
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        EmailAddress.create(5);
      }).to.throw(Error);
    });
  });
});
