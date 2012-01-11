describe("index.js", function () {
  it("should exist", function () {
    require('../index').should.not.be.undefined;
  });
  it('should export the SendGrid object', function() {
    require('../index').SendGrid.should.not.be.undefined;
  });
  it('should export the Email object', function() {
    require('../index').Email.should.not.be.undefined;
  });
});
