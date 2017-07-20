'use strict';

/**
 * Dependencies
 */
const convertKeys = require('./convert-keys');
const strToCamelCase = require('./str-to-camel-case');

/**
 * Tests
 */
describe('convertKeys', function() {

  //Test object
  const obj = {
    a: 1,
    snake_case: 2,
    camelCase: 3,
    nested_snake_case: {
      a: 1,
      snake_case: 2,
      camelCase: 3,
    },
    nestedCamelCase: {
      a: 1,
      snake_case: 2,
      camelCase: 3,
    },
  };

  //Create clone
  const clone = convertKeys(obj, strToCamelCase);

  //Tests
  it('should convert top level keys properly', function() {
    expect(clone).to.have.property('a');
    expect(clone).to.have.property('snakeCase');
    expect(clone).to.have.property('camelCase');
    expect(clone).to.have.property('nestedSnakeCase');
    expect(clone).to.have.property('nestedCamelCase');
    expect(clone).not.to.have.property('snake_case');
    expect(clone).not.to.have.property('nested_snake_case');
  });
  it('should convert nested keys properly', function() {
    expect(clone.nestedSnakeCase).to.have.property('a');
    expect(clone.nestedSnakeCase).to.have.property('snakeCase');
    expect(clone.nestedSnakeCase).to.have.property('camelCase');
    expect(clone.nestedSnakeCase).not.to.have.property('snake_case');
    expect(clone.nestedCamelCase).to.have.property('a');
    expect(clone.nestedCamelCase).to.have.property('snakeCase');
    expect(clone.nestedCamelCase).to.have.property('camelCase');
    expect(clone.nestedCamelCase).not.to.have.property('snake_case');
  });
  it('should throw an error for non object input', function() {
    expect(function() {
      convertKeys(null);
    }).to.throw(Error);
    expect(function() {
      convertKeys(5);
    }).to.throw(Error);
  });
});
