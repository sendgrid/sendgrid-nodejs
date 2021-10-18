'use strict';

/**
 * Dependencies
 */
const Personalization = require('../personalization');
const EmailAddress = require('../email-address');

/**
 * Tests
 */
describe('Personalization', function() {

  //Create new personalization before each test
  let p;
  beforeEach(function() {
    p = new Personalization();
  });

  //Set from
  describe('setFrom()', function() {
    it('should accept string values', function() {
      p.setFrom('test@example.org');
      expect(p.from).to.be.an.instanceof(EmailAddress);
      expect(p.from.email).to.equal('test@example.org');
    });
    it('should properly update from value', function() {
      p.setFrom('test1@example.com');
      p.setFrom('test2@example.com');
      p.setFrom('test3@example.com');
      p.setFrom('test4@example.com');
      expect(p.from.email).to.equal('test4@example.com');
    });
    it('should accept no input', function() {
      expect(function() {
        p.setFrom();
      }).not.to.throw(Error);
    });
    it('should not overwrite value with no input', function() {
      p.setFrom('test@example.org');
      p.setFrom();
      expect(p.from.email).to.equal('test@example.org');
    });
  });
});
