'use strict';

/**
 * Dependencies
 */
const Personalization = require('./personalization');
const EmailAddress = require('./email-address');

/**
 * Tests
 */
describe('Personalization', function() {

  //Create new personalization before each test
  let p;
  beforeEach(function() {
    p = new Personalization();
  });

  //Set subject
  describe('setSubject()', function() {
    it('should set the given value', function() {
      p.setSubject('Test');
      expect(p.subject).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSubject(5);
      }).to.throw(Error);
      expect(function() {
        p.setSubject(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSubject();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSubject('Test');
      p.setSubject();
      expect(p.subject).to.equal('Test');
    });
  });

  //Set send at
  describe('setSendAt()', function() {
    it('should set the given value', function() {
      p.setSendAt(1500077141);
      expect(p.sendAt).to.equal(1500077141);
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSendAt('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setSendAt(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSendAt();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSendAt(1500077141);
      p.setSendAt();
      expect(p.sendAt).to.equal(1500077141);
    });
  });

  //Set to
  describe('setTo()', function() {
    it('should handle array values', function() {
      p.setTo(['test@example.org']);
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(1);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test@example.org');
    });
    it('should handle string values', function() {
      p.setTo('test@example.org');
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(1);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.setTo(['test1@example.org', 'test2@example.org']);
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(2);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test1@example.org');
      expect(p.to[1]).to.be.an.instanceof(EmailAddress);
      expect(p.to[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.setTo();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setTo('test@example.org');
      p.setTo();
      expect(p.to[0].email).to.equal('test@example.org');
    });
  });

  //Add to
  describe('addTo()', function() {
    it('should add the item', function() {
      p.addTo('test@example.org');
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(1);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.addTo('test1@example.org');
      p.addTo('test2@example.org');
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(2);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test1@example.org');
      expect(p.to[1]).to.be.an.instanceof(EmailAddress);
      expect(p.to[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.addTo();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.addTo('test@example.org');
      p.addTo();
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(1);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test@example.org');
    });
  });

  //Set cc
  describe('setCc()', function() {
    it('should handle array values', function() {
      p.setCc(['test@example.org']);
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
    it('should handle string values', function() {
      p.setCc('test@example.org');
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.setCc(['test1@example.org', 'test2@example.org']);
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(2);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test1@example.org');
      expect(p.cc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.setCc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setCc('test@example.org');
      p.setCc();
      expect(p.cc[0].email).to.equal('test@example.org');
    });
  });

  //Add cc
  describe('addCc()', function() {
    it('should add the item', function() {
      p.addCc('test@example.org');
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.addCc('test1@example.org');
      p.addCc('test2@example.org');
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(2);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test1@example.org');
      expect(p.cc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.addCc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.addCc('test@example.org');
      p.addCc();
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
  });

  //Set bcc
  describe('setBcc()', function() {
    it('should handle array values', function() {
      p.setBcc(['test@example.org']);
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
    it('should handle string values', function() {
      p.setBcc('test@example.org');
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.setBcc(['test1@example.org', 'test2@example.org']);
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(2);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test1@example.org');
      expect(p.bcc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.setBcc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setBcc('test@example.org');
      p.setBcc();
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
  });

  //Add bcc
  describe('addBcc()', function() {
    it('should add the item', function() {
      p.addBcc('test@example.org');
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.addBcc('test1@example.org');
      p.addBcc('test2@example.org');
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(2);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test1@example.org');
      expect(p.bcc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.addBcc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.addBcc('test@example.org');
      p.addBcc();
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
  });

  //Set headers
  describe('setHeaders()', function() {
    it('should set the given value', function() {
      p.setHeaders({test: 'Test'});
      expect(p.headers).to.be.an.instanceof(Object);
      expect(p.headers).to.have.a.property('test');
      expect(p.headers.test).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setHeaders('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setHeaders(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setHeaders();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setHeaders({test: 'Test'});
      p.setHeaders();
      expect(p.headers.test).to.equal('Test');
    });
  });

  //Add header
  describe('addHeader()', function() {
    it('should set the given value', function() {
      p.addHeader('test', 'Test');
      expect(p.headers).to.be.an.instanceof(Object);
      expect(p.headers).to.have.a.property('test');
      expect(p.headers.test).to.equal('Test');
    });
    it('should add multiple values', function() {
      p.addHeader('test1', 'Test1');
      p.addHeader('test2', 'Test2');
      expect(p.headers).to.have.a.property('test1');
      expect(p.headers).to.have.a.property('test2');
      expect(p.headers.test1).to.equal('Test1');
      expect(p.headers.test2).to.equal('Test2');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.addHeader('test');
      }).to.throw(Error);
      expect(function() {
        p.addHeader(null, 'test');
      }).to.throw(Error);
      expect(function() {
        p.addHeader(3, 5);
      }).to.throw(Error);
    });
  });

  //Set custom args
  describe('setCustomArgs()', function() {
    it('should set the given value', function() {
      p.setCustomArgs({test: 'Test'});
      expect(p.customArgs).to.be.an.instanceof(Object);
      expect(p.customArgs).to.have.a.property('test');
      expect(p.customArgs.test).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setCustomArgs('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setCustomArgs(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setCustomArgs();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setCustomArgs({test: 'Test'});
      p.setCustomArgs();
      expect(p.customArgs.test).to.equal('Test');
    });
  });

  //Add custom arg
  describe('addCustomArg()', function() {
    it('should set the given value', function() {
      p.addCustomArg('test', 'Test');
      expect(p.customArgs).to.be.an.instanceof(Object);
      expect(p.customArgs).to.have.a.property('test');
      expect(p.customArgs.test).to.equal('Test');
    });
    it('should add multiple values', function() {
      p.addCustomArg('test1', 'Test1');
      p.addCustomArg('test2', 'Test2');
      expect(p.customArgs).to.have.a.property('test1');
      expect(p.customArgs).to.have.a.property('test2');
      expect(p.customArgs.test1).to.equal('Test1');
      expect(p.customArgs.test2).to.equal('Test2');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.addCustomArg('test');
      }).to.throw(Error);
      expect(function() {
        p.addCustomArg(null, 'test');
      }).to.throw(Error);
      expect(function() {
        p.addCustomArg(3, 5);
      }).to.throw(Error);
    });
  });

  //Set substitutions
  describe('setSubstitutions()', function() {
    it('should set the given value', function() {
      p.setSubstitutions({test: 'Test'});
      expect(p.substitutions).to.be.an.instanceof(Object);
      expect(p.substitutions).to.have.a.property('test');
      expect(p.substitutions.test).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSubstitutions('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setSubstitutions(3);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSubstitutions();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSubstitutions({test: 'Test'});
      p.setSubstitutions();
      expect(p.substitutions.test).to.equal('Test');
    });
  });

  //Add substitution
  describe('addSubstitution()', function() {
    it('should set the given value', function() {
      p.addSubstitution('test', 'Test');
      expect(p.substitutions).to.be.an.instanceof(Object);
      expect(p.substitutions).to.have.a.property('test');
      expect(p.substitutions.test).to.equal('Test');
    });
    it('should add multiple values', function() {
      p.addSubstitution('test1', 'Test1');
      p.addSubstitution('test2', 2);
      expect(p.substitutions).to.have.a.property('test1');
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test1).to.equal('Test1');
      expect(p.substitutions.test2).to.equal(2);
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.addSubstitution('test');
      }).to.throw(Error);
      expect(function() {
        p.addSubstitution(null, 'test');
      }).to.throw(Error);
      expect(function() {
        p.addSubstitution(3, false);
      }).to.throw(Error);
    });
  });

  //Reverse merge substitutions
  describe('reverseMergeSubstitutions()', function() {
    it('should reverse merge substitutions', function() {
      p.setSubstitutions({test1: 'Test1'});
      p.reverseMergeSubstitutions({test2: 'Test2'});
      expect(p.substitutions).to.have.a.property('test1');
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test1).to.equal('Test1');
      expect(p.substitutions.test2).to.equal('Test2');
    });
    it('should not overwrite existing keys', function() {
      p.setSubstitutions({test1: 'Test1'});
      p.reverseMergeSubstitutions({test1: 'Test3', test2: 'Test2'});
      expect(p.substitutions).to.have.a.property('test1');
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test1).to.equal('Test1');
      expect(p.substitutions.test2).to.equal('Test2');
    });
    it('should work without prior substitutions', function() {
      p.reverseMergeSubstitutions({test2: 'Test2'});
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test2).to.equal('Test2');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.reverseMergeSubstitutions(3);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.reverseMergeSubstitutions();
      }).not.to.throw(Error);
    });
  });

  //Set substitutions
  describe('setSubstitutionWrappers()', function() {
    it('should have defaults', function() {
      expect(p.substitutionWrappers).to.be.an.instanceof(Array);
      expect(p.substitutionWrappers).to.have.a.lengthOf(2);
      expect(p.substitutionWrappers[0]).to.equal('{{');
      expect(p.substitutionWrappers[1]).to.equal('}}');
    });
    it('should set the given value', function() {
      p.setSubstitutionWrappers(['a', 'b']);
      expect(p.substitutionWrappers).to.be.an.instanceof(Array);
      expect(p.substitutionWrappers).to.have.a.lengthOf(2);
      expect(p.substitutionWrappers[0]).to.equal('a');
      expect(p.substitutionWrappers[1]).to.equal('b');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSubstitutionWrappers('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setSubstitutionWrappers(['a']);
      }).to.throw(Error);
      expect(function() {
        p.setSubstitutionWrappers(['a', 'b', 'c']);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSubstitutionWrappers();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSubstitutionWrappers(['a', 'b']);
      p.setSubstitutionWrappers();
      expect(p.substitutionWrappers[0]).to.equal('a');
      expect(p.substitutionWrappers[1]).to.equal('b');
    });
  });

  //JSON conversion
  describe('toJSON()', function() {
    beforeEach(function() {
      p.setTo('test@example.org');
    });

    it('should always have the to field', function() {
      const json = p.toJSON();
      expect(json).to.have.property('to');
      expect(json.to).to.be.an.instanceof(Array);
      expect(json.to).to.have.a.lengthOf(1);
      expect(json.to[0]).to.be.an.instanceof(EmailAddress);
      expect(json.to[0].email).to.equal('test@example.org');
    });
    it('should set the cc field', function() {
      p.setCc('testcc@example.org');
      const json = p.toJSON();
      expect(json).to.have.property('cc');
      expect(json.cc).to.be.an.instanceof(Array);
      expect(json.cc).to.have.a.lengthOf(1);
      expect(json.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(json.cc[0].email).to.equal('testcc@example.org');
    });
    it('should set the bcc field', function() {
      p.setBcc('testbcc@example.org');
      const json = p.toJSON();
      expect(json).to.have.property('bcc');
      expect(json.bcc).to.be.an.instanceof(Array);
      expect(json.bcc).to.have.a.lengthOf(1);
      expect(json.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(json.bcc[0].email).to.equal('testbcc@example.org');
    });
    it('should set the headers field', function() {
      p.setHeaders({test: 'Test'});
      const json = p.toJSON();
      expect(json).to.have.property('headers');
      expect(json.headers).to.be.an.instanceof(Object);
      expect(json.headers.test).to.equal('Test');
    });
    it('should set the custom_args field', function() {
      p.setCustomArgs({test: 'Test'});
      const json = p.toJSON();
      expect(json).to.have.property('custom_args');
      expect(json.custom_args).to.be.an.instanceof(Object);
      expect(json.custom_args.test).to.equal('Test');
    });
    it('should set the substitutions field', function() {
      p.setSubstitutions({test: 'Test'});
      const json = p.toJSON();
      expect(json).to.have.property('substitutions');
      expect(json.substitutions).to.be.an.instanceof(Object);
    });
    it('should apply wrappers to the substitutions', function() {
      p.setSubstitutions({test: 'Test', otherTest2: 'Test2'});
      p.setSubstitutionWrappers(['{{', '}}']);
      const json = p.toJSON();
      expect(json.substitutions).to.have.property('{{test}}');
      expect(json.substitutions).to.have.property('{{otherTest2}}');
      expect(json.substitutions['{{test}}']).to.equal('Test');
      expect(json.substitutions['{{otherTest2}}']).to.equal('Test2');
      expect(json.substitutions).not.to.have.property('test');
      expect(json.substitutions).not.to.have.property('otherTest2');
    });
    it('should set the subject field', function() {
      p.setSubject('Test');
      const json = p.toJSON();
      expect(json).to.have.property('subject');
      expect(json.subject).to.equal('Test');
    });
    it('should set the send_at field', function() {
      p.setSendAt(555);
      const json = p.toJSON();
      expect(json).to.have.property('send_at');
      expect(json.send_at).to.equal(555);
    });
    it('should not modify the keys of substitutions and custom args', () => {
      const data = {
        to: 'to@example.org',
        customArgs: {snake_case: 'Test', T_EST: 'Test', camelCase: 'Test'},
        substitutions: {snake_case: 'Test', T_EST: 'Test', camelCase: 'Test'},
      };
      p.fromData(data);
      const json = p.toJSON();
      expect(json.substitutions).to.have.property('{{T_EST}}');
      expect(json.substitutions).to.have.property('{{camelCase}}');
      expect(json.substitutions).to.have.property('{{snake_case}}');
      expect(json.substitutions['{{T_EST}}']).to.equal('Test');
      expect(json.substitutions['{{camelCase}}']).to.equal('Test');
      expect(json.substitutions['{{snake_case}}']).to.equal('Test');
      expect(json.custom_args).to.have.property('T_EST');
      expect(json.custom_args).to.have.property('camelCase');
      expect(json.custom_args).to.have.property('snake_case');
      expect(json.custom_args.T_EST).to.equal('Test');
      expect(json.custom_args.camelCase).to.equal('Test');
      expect(json.custom_args.snake_case).to.equal('Test');
    });
  });

  //From data
  describe('fromData()', function() {

    //Data
    const data = {
      to: 'to@example.org',
      cc: ['cc1@example.org', 'cc2@example.org'],
      bcc: ['bcc1@example.org', 'bcc2@example.org'],
      subject: 'Test',
      sendAt: 1000,
      headers: {test: 'Test'},
      customArgs: {snake_case: 'Test', T_EST: 'Test', camelCase: 'Test'},
      substitutions: {snake_case: 'Test', T_EST: 'Test', camelCase: 'Test'},
      substitutionWrappers: ['[', ']'],
    };

    //Tests
    it('should call fromData() from the constructor', () => {
      p = new Personalization(data);
      expect(p.to[0].email).to.equal('to@example.org');
      expect(p.subject).to.equal('Test');
    });
    it('should throw an error for invalid input', () => {
      expect(function() {
        p.fromData(5);
      }).to.throw(Error);
    });
    it('should have set all properties', () => {
      p.fromData(data);
      expect(p.to[0].email).to.equal('to@example.org');
      expect(p.cc[0].email).to.equal('cc1@example.org');
      expect(p.cc[1].email).to.equal('cc2@example.org');
      expect(p.bcc[0].email).to.equal('bcc1@example.org');
      expect(p.bcc[1].email).to.equal('bcc2@example.org');
      expect(p.subject).to.equal('Test');
      expect(p.sendAt).to.equal(1000);
      expect(p.headers.test).to.equal('Test');
      expect(p.customArgs.snake_case).to.equal('Test');
      expect(p.substitutions.snake_case).to.equal('Test');
      expect(p.substitutionWrappers).to.have.members(['[', ']']);
    });
    it('should not modify the keys of substitutions and custom args', () => {
      p.fromData(data);
      expect(p.substitutions.T_EST).to.equal('Test');
      expect(p.substitutions.camelCase).to.equal('Test');
      expect(p.substitutions.snake_case).to.equal('Test');
      expect(p.customArgs.T_EST).to.equal('Test');
      expect(p.customArgs.camelCase).to.equal('Test');
      expect(p.customArgs.snake_case).to.equal('Test');
    });
  });
});
