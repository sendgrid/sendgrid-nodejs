'use strict';

/**
 * Dependencies
 */
const Personalization = require('../personalization');
const EmailAddress = require('../email-address');

/**
 * Tests
 */
describe('Personalization', function () {

  //Create new personalization before each test
  let p;
  beforeEach(function () {
    p = new Personalization();
  });

  //Reverse merge substitutions
  describe('reverseMergeDynamicTemplateData()', function () {
    it('should reverse merge dynamicTemplateData', function () {
      p.setDynamicTemplateData({ test1: 'Test1' });
      p.reverseMergeDynamicTemplateData({ test2: 'Test2' });
      expect(p.dynamicTemplateData).to.have.a.property('test1');
      expect(p.dynamicTemplateData).to.have.a.property('test2');
      expect(p.dynamicTemplateData.test1).to.equal('Test1');
      expect(p.dynamicTemplateData.test2).to.equal('Test2');
    });
    it('should not overwrite existing keys', function () {
      p.setDynamicTemplateData({ test1: 'Test1' });
      p.reverseMergeDynamicTemplateData({ test1: 'Test3', test2: 'Test2' });
      expect(p.dynamicTemplateData).to.have.a.property('test1');
      expect(p.dynamicTemplateData).to.have.a.property('test2');
      expect(p.dynamicTemplateData.test1).to.equal('Test1');
      expect(p.dynamicTemplateData.test2).to.equal('Test2');
    });
    it('should work without prior dynamicTemplateData', function () {
      p.reverseMergeDynamicTemplateData({ test2: 'Test2' });
      expect(p.dynamicTemplateData).to.have.a.property('test2');
      expect(p.dynamicTemplateData.test2).to.equal('Test2');
    });
    it('should throw an error for invalid input', function () {
      expect(function () {
        p.reverseMergeDynamicTemplateData(3);
      }).to.throw(Error);
    });
    it('should accept no input', function () {
      expect(function () {
        p.reverseMergeDynamicTemplateData();
      }).not.to.throw(Error);
    });
  });
});
