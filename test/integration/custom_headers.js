var Email = require('../../lib/email');

describe('custom headers', function() {
  var mail;
  var custom_headers = {cow: 'moo', panda: 'brawr'};
  beforeEach(function() {
    mail = new Email();
  });

  it('should allow setting custom headers via setHeaders', function() {
    mail.setHeaders(custom_headers);
    mail.headers.should.eql(custom_headers);
  });

  it('should allow setting custom headers one at a time with addHeaders', function() {
    for(var key in custom_headers) {
      var args = {};
      args[key] = custom_headers[key];
      mail.addHeaders(args);
    }

    mail.headers.should.eql(custom_headers);
    mail.addHeaders({fox: 'hound'});
    mail.headers.fox.should.eql('hound');
  });

  it('should overwrite headers when calling addHeaders with the same value', function() {
    mail.addHeaders(custom_headers);
    mail.headers.should.eql(custom_headers);
    mail.addHeaders({cow: 'in my mind'});
    mail.headers.should.not.eql(custom_headers);
    mail.headers.cow.should.eql('in my mind');
  });

});
