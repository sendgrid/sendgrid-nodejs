'use strict';

/**
 * Dependencies
 */
const mergeData = require('./merge-data');

/**
 * Tests
 */
describe('mergeData', function() {

  //Test objects
  const obj1 = {
    a: 1,
    b: 2,
  };
  const obj2 = {
    c: 3,
    d: 4,
    e: {f: 6},
  };

  //Merge
  const merged = mergeData(obj1, obj2);

  //Tests
  it('should merge the two objects', function() {
    expect(merged).to.have.property('a');
    expect(merged).to.have.property('b');
    expect(merged).to.have.property('c');
    expect(merged).to.have.property('d');
    expect(merged).to.have.property('e');
    expect(merged.e).to.have.property('f');
  });
  it('should throw on invalid input', function() {
    expect(function() {
      mergeData(null, obj2);
    }).to.throw(Error);
    expect(function() {
      mergeData(obj1, 4);
    }).to.throw(Error);
  });
});
