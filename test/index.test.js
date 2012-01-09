var should = require('should');

describe('index', function() {
  it('should have a sendgrid object', function() {
    should.exist(require('../index').Sendgrid);
  });
})
