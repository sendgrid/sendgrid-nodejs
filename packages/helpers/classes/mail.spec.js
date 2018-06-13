'use strict';

/**
 * Dependencies
 */
const Mail = require('./mail');

/**
 * Tests
 */
describe('Mail', function() {

  describe('#527', function() {
    it('shouldn\'t convert the headers to camel/snake case', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
        }],
        from: {
          email: 'test@example.com',
        },
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
        category: 'test',
        headers: {
          'List-Unsubscribe': '<mailto:test@test.com>',
        },
      });

      expect(mail.headers['List-Unsubscribe']).to
        .equal('<mailto:test@test.com>');

      expect(mail.toJSON().headers['List-Unsubscribe']).to
        .equal('<mailto:test@test.com>');
    });
  });
  describe('#689', function() {

    it('should detect dynamic template id', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
        }],
        from: {
          email: 'test@example.com',
        },
        templateId: 'd-df80613cccc6441ea5cd7c95377bc1ef',
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
      });
      expect(mail.isDynamic).to.equal(true);
    });
    it('should detect legacy template id', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
        }],
        from: {
          email: 'test@example.com',
        },
        templateId: 'df80613cccc6441ea5cd7c95377bc1ef',
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
      });
      expect(mail.isDynamic).to.equal(false);
    });
    it('should ignore substitutions if templateId is dynamic', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
          substitutions: {
            test2: 'Test2',
          },
          dynamicTemplateData: {
            test2: 'Testy 2',
            test3: 'Testy 3',
          },
        }],
        dynamicTemplateData: {
          test1: 'Test 1',
          test2: 'Test 2',
        },
        substitutions: {
          test1: 'Test1',
        },
        from: {
          email: 'test@example.com',
        },
        templateId: 'd-df80613cccc6441ea5cd7c95377bc1ef',
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
      });
      expect(mail.substitutions).to.equal(null);
      expect(mail.personalizations[0].substitutions).to.deep.equal({});

      expect(mail.dynamicTemplateData).to.deep.equal({ test1: 'Test 1', test2: 'Test 2' });
      expect(mail.personalizations[0].dynamicTemplateData).to.deep.equal({ test1: 'Test 1', test2: 'Testy 2', test3: 'Testy 3' });

      expect(mail.toJSON()).to.deep.equal({
        'content': [
          {
            'type': 'text/plain',
            'value': 'test',
          },
        ],
        'from': {
          'email': 'test@example.com',
        },
        'personalizations': [
          {
            'dynamic_template_data': {
              'test1': 'Test 1',
              'test2': 'Testy 2',
              'test3': 'Testy 3',
            },
            'headers': {
              'test-header': 'test',
            },
            'to': [
              {
                'email': 'test@example.com',
                'name': '',
              },
            ],
          },
        ],
        'subject': 'test',
        'template_id': 'd-df80613cccc6441ea5cd7c95377bc1ef',
      });
    });

  });
});
