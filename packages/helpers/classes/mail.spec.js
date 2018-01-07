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
});
