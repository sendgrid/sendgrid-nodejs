var index = require('../index');

describe("index.js", function () {
  it("should exist", function () {
    index.should.not.be.undefined;
  });
  it('should export the SendGrid object', function() {
    index.SendGrid.should.not.be.undefined;
  });
  it('should export the Email object', function() {
    index.Email.should.not.be.undefined;
  });
  it('should export the SmtpapiHeaders object', function() {
    index.SmtpapiHeaders.should.not.be.undefined;
  });
});
