var index = require('../index');

describe("index.js", function () {
  it("should exist", function () {
    expect(index).to.not.be.undefined;
  });
  it('should export the SendGrid object', function() {
    expect(index.SendGrid).to.not.be.undefined;
  });
  it('should export the Email object', function() {
    expect(index.Email).to.not.be.undefined;
  });
  it('should export the SmtpapiHeaders object', function() {
    expect(index.SmtpapiHeaders).to.not.be.undefined;
  });
});
