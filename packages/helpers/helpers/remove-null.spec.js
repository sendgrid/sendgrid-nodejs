'use strict';

/**
 * Dependencies
 */
const removeNull = require('./remove-null');

/**
 * Tests
 */
describe('removeNull', function() {
  it('should not remove defined items', function() {
    const { name } = removeNull({
      name: 'string',
    });
    expect(name).to.equal('string');
  });
  it('should remove null items', function() {
    const obj = removeNull({
      name: null,
      score: 2
    });
    expect(obj.name).to.be.undefined;
    expect(obj.score).to.equal(2);
  });
});
