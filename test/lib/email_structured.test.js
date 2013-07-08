var Email = require('../../lib/email');
var querystring = require('querystring');
var fs = require('fs');
var _ = require('underscore');

var testvars = {
	fmt: 'test <test@test.com>'
	,fmtq: '" test " <test@test.com>'
	,fmtary: ['test <test@test.com>','"test2"  <test2@test.com>', 'test3@test.com']
	,name: 'test'
	,addr: 'test@test.com'
	,name2: 'test2'
	,addr2: 'test2@test.com'
	,addr3: 'test3@test.com'
}

describe('Email (structured)', function () {

  it('should handle structured address in from', function(){
    var email = new Email({from: testvars.fmt});
    expect(email.from).to.equal(testvars.fmt);
    email.handleFormattedAddresses();
    expect(email.fromname).to.equal(testvars.name);
    expect(email.from).to.equal(testvars.addr);
  });

  it('should handle quoted structured address in from', function(){
    var email = new Email({from: testvars.fmtq});
    expect(email.from).to.equal(testvars.fmtq);
    email.handleFormattedAddresses();
    expect(email.fromname).to.equal(testvars.name);
    expect(email.from).to.equal(testvars.addr);
  });

  it('should handle structured address in to as a string', function(){
    var email = new Email({to: testvars.fmt});
    expect(email.to).to.equal(testvars.fmt);
    email.handleFormattedAddresses();
    expect(email.toname[0]).to.equal(testvars.name);
    expect(email.to[0]).to.equal(testvars.addr);
  });

  it('should handle structured address in to in an array', function(){
    var email = new Email({to: testvars.fmtary});
    expect(email.to).to.equal(testvars.fmtary);
    email.handleFormattedAddresses();
    expect(email.toname[0]).to.equal(testvars.name);
    expect(email.to[0]).to.equal(testvars.addr);
    expect(email.toname[1]).to.equal(testvars.name2);
    expect(email.to[1]).to.equal(testvars.addr2);
    expect(email.toname[2]).to.equal(testvars.addr3);
    expect(email.to[2]).to.equal(testvars.addr3);
  });

  it('should handle structured address in bcc as a string', function(){
    var email = new Email({bcc: testvars.fmt});
    expect(email.bcc).to.equal(testvars.fmt);
    email.handleFormattedAddresses();
    expect(email.bcc[0]).to.equal(testvars.addr);
  });

  it('should handle structured address in bcc in an array', function(){
    var email = new Email({bcc: testvars.fmtary});
    expect(email.bcc).to.equal(testvars.fmtary);
    email.handleFormattedAddresses();
    expect(email.bcc[0]).to.equal(testvars.addr);
    expect(email.bcc[1]).to.equal(testvars.addr2);
    expect(email.bcc[2]).to.equal(testvars.addr3);
  });

  it('should ignore structured address in from when fromname is defined', function(){
    var email = new Email({from: testvars.fmt, fromname: testvars.name2});
    email.handleFormattedAddresses();
    expect(email.from).to.equal(testvars.fmt);
    expect(email.fromname).to.equal(testvars.name2);
  });

  it('should ignore structured address in to when toname is defined', function(){
    var email = new Email({to: testvars.fmt, toname: testvars.name2});
    email.handleFormattedAddresses();
    expect(email.to).to.equal(testvars.fmt);
    expect(email.toname).to.equal(testvars.name2);
  });

});