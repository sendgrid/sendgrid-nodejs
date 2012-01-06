describe('Mail', function () {
    it("should be able to send mail", function () {
        var mail = new Mail();
        mail.send().should.be.true;
    });
});
