var Email = require('../../lib/email');
var fs = require('fs');

var default_payload = {
  to        : 'david.tomberlin@sendgrid.com',
  from      : 'kyle.partridge@sendgrid.com',
  subject   : 'Subject',
  text      : 'This is an email.'
};

var files = [
  __dirname + '/../assets/logo.png',
  __dirname + '/../assets/sendgrid.txt'
];

describe('Email', function () {
  it('should allow attributes to be set in the constructor', function() {
    var payload     = Object.create(default_payload);
    var email       = new Email(payload);
    for (var key in payload) {
      expect(payload[key]).to.eql(email[key]);
    }
  });

  describe("#toWebFormat", function() {
    it('should return a Web Api format as expected', function() {
      var payload     = Object.create(default_payload);
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.to);
      expect(format.from).to.equal(payload.from);
      expect(format.subject).to.equal(payload.subject);
      expect(format.text).to.equal(payload.text);
      expect(format.fromname).to.be.empty;
      expect(format.toname).to.be.empty;
    });

    it('should have multiple TOs if as an array', function() {
      var payload     = Object.create(default_payload);
      payload.to      = ['david.tomberlin@sendgrid.com', 'otherguy@sendgrid.com'];
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.to);
    });

    it('should not have multiple TOs if as an array but also set on smtpapi via addTo', function() {
      var payload     = Object.create(default_payload);
      payload.to      = ['david.tomberlin@sendgrid.com', 'otherguy@sendgrid.com'];
      var email       = new Email(payload);
      email.addTo(payload.to[0]);
      email.addTo(payload.to[1]);

      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.from);
    });

    it('should have multiple BCCs if as an array', function() {
      var payload     = Object.create(default_payload);
      payload.bcc     = ['david.tomberlin@sendgrid.com', 'otherguy@sendgrid.com'];
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.bcc).to.equal(payload.bcc);
    });

    it('should have multiple CCs if as an array', function() {
      var payload     = Object.create(default_payload);
      payload.cc     = ['david.tomberlin@sendgrid.com', 'otherguy@sendgrid.com'];
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.cc).to.equal(payload.cc);
    });

    it('should not have a field for undefined file', function() {
      var payload     = Object.create(default_payload);
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.to);
      expect(format.from).to.equal(payload.from);
      expect(format.subject).to.equal(payload.subject);
      expect(format.text).to.equal(payload.text);
      expect(format.fromname).to.be.empty;
      expect(format.toname).to.be.empty;
      expect(format['files[undefined]']).to.be.undefined;
    });

    it('should not have a field for undefined file even with Array prototype overridden', function() {

      Array.prototype.testMethod = function() {
        return 'testMethod';
      };

      var payload     = Object.create(default_payload);
      var email       = new Email(payload);
      var format      = email.toWebFormat();

      expect(format.to).to.equal(payload.to);
      expect(format.from).to.equal(payload.from);
      expect(format.subject).to.equal(payload.subject);
      expect(format.text).to.equal(payload.text);
      expect(format.fromname).to.be.empty;
      expect(format.toname).to.be.empty;
      expect(format['files[undefined]']).to.be.undefined;
    });

    it('should not have a to address if there is no to or no smtpapi.', function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', subject: 'testing', text: 'testing'});
      var format = email.toWebFormat();
      expect(format.to).to.be.empty;
    });

    it('should have a to address if there is no to but there is an smtpapi to', function() {
      var payload     = Object.create(default_payload);
      payload.to      = "";
      var email       = new Email(payload);
      email.addTo("test@test.com");
      var format = email.toWebFormat();

      expect(JSON.parse(format['x-smtpapi']).to).to.not.be.empty;
      expect(format.to).to.not.be.empty;
    });

    it("should set a fromname if one is provided", function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', fromname:'Tester T. Testerson', subject: 'testing', text: 'testing'});
      var format = email.toWebFormat();

      expect(format.fromname).to.equal('Tester T. Testerson');
    });

    it("should set a date if one is provided", function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', fromname:'Tester T. Testerson', subject: 'testing', text: 'testing', date: 'Wed, 17 Dec 2014 19:21:16 +0000'});
      var format = email.toWebFormat();

      expect(format.date).to.equal('Wed, 17 Dec 2014 19:21:16 +0000');

      email.setDate('Wed, 17 Dec 2013 19:21:16 +0000');
      format = email.toWebFormat();
      expect(format.date).to.equal('Wed, 17 Dec 2013 19:21:16 +0000');
    });

    it("should set a toname if one is provided", function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', to:'test@test.com', toname:'Tester T. Testerson', subject: 'testing', text: 'testing'});
      var format = email.toWebFormat();

      expect(format.toname).to.equal('Tester T. Testerson');
    });

    it("should set multiple tonames if several are provided", function() {
      var payload     = Object.create(default_payload);
      var email       = new Email({from: 'test@test.com', to: ['test@test.com', 'test2@test.com'], toname:['Tester T. Testerson', 'Test2 M. Testerson'], subject: 'testing', text: 'testing'});
      var format = email.toWebFormat();

      expect(format.toname[0]).to.equal('Tester T. Testerson');
      expect(format.toname[1]).to.equal('Test2 M. Testerson');
    });
  });

  it('should be possible to setFrom', function() {
    var email = new Email();
    expect(email.from).to.be.empty;
    email.setFrom('kyle.partridge@sendgrid.com');
    expect(email.from).to.eql('kyle.partridge@sendgrid.com');
  });

  it('should be possible to setSubject', function() {
    var email = new Email();
    expect(email.subject).to.be.empty;
    email.setSubject('A subject');
    expect(email.subject).to.eql('A subject');
  });

  it('should be possible to setText', function() {
    var email = new Email();
    expect(email.text).to.be.empty;
    email.setText('Some text');
    expect(email.text).to.eql('Some text');
  });

  it('should be possible to setHtml', function() {
    var email = new Email();
    expect(email.html).to.be.empty;
    email.setHtml('<p>Some html</p>');
    expect(email.html).to.eql('<p>Some html</p>');
  });

  it('should be possible to addUniqueArg', function() {
    var email = new Email();
    expect(email.smtpapi.header.unique_args).to.eql({});
    email.addUniqueArg('unique_arg1', 'value');
    expect(email.smtpapi.header.unique_args).to.eql({unique_arg1: 'value'});
    email.addUniqueArg('unique_arg2', 'value');
    expect(email.smtpapi.header.unique_args).to.eql({unique_arg1: 'value', unique_arg2: 'value'});
  });

  it('should be possible to setDate', function() {
    var email = new Email();
    expect(email.date).to.be.empty;
    email.setDate('Wed, 17 Dec 2014 19:21:16 +0000');
    expect(email.date).to.eql('Wed, 17 Dec 2014 19:21:16 +0000');
  });

  it('should be possible to setSendAt', function() {
    var email = new Email();
    expect(email.smtpapi.header.send_at).to.be.empty;
    expect(email.smtpapi.header.send_each_at).to.eql([]);
    email.setSendAt(1409348513);
    expect(email.smtpapi.header.send_at).to.eql(1409348513);
    expect(email.smtpapi.header.send_each_at).to.eql([]);
  });

  it('should be possible to setSendEachAt', function() {
    var email = new Email();
    expect(email.smtpapi.header.send_at).to.be.empty;
    expect(email.smtpapi.header.send_each_at).to.eql([]);
    email.setSendEachAt([1409348513, 1409348514]);
    expect(email.smtpapi.header.send_at).to.be.empty;
    expect(email.smtpapi.header.send_each_at).to.eql([1409348513, 1409348514]);
  });

  it('should be possible to addSendEachAt', function() {
    var email = new Email();
    expect(email.smtpapi.header.send_at).to.be.empty;
    expect(email.smtpapi.header.send_each_at).to.eql([]);
    email.addSendEachAt(1409348513);
    email.addSendEachAt(1409348514);
    expect(email.smtpapi.header.send_at).to.be.empty;
    expect(email.smtpapi.header.send_each_at).to.eql([1409348513, 1409348514]);
  });

  it('should be possible to setSendEachAt and addSendEachAt', function() {
    var email = new Email();
    expect(email.smtpapi.header.send_at).to.be.empty;
    expect(email.smtpapi.header.send_each_at).to.eql([]);
    email.setSendEachAt([1409348513]);
    email.addSendEachAt(1409348514);
    expect(email.smtpapi.header.send_at).to.be.empty;
    expect(email.smtpapi.header.send_each_at).to.eql([1409348513, 1409348514]);
  });

  it('should be possible to setUniqueArgs', function() {
    var email = new Email();
    expect(email.smtpapi.header.unique_args).to.eql({});
    email.setUniqueArgs({unique_arg1: 'value'});
    expect(email.smtpapi.header.unique_args).to.eql({unique_arg1: 'value'});
    email.setUniqueArgs({unique_arg2: 'value'});
    expect(email.smtpapi.header.unique_args).to.eql({unique_arg2: 'value'});
  });

  it('should be possible to setUniqueArgs and addUniqueArg', function() {
    var email = new Email();
    expect(email.smtpapi.header.unique_args).to.eql({});
    email.setUniqueArgs({unique_arg1: 'value'});
    expect(email.smtpapi.header.unique_args).to.eql({unique_arg1: 'value'});
    email.addUniqueArg('unique_arg2', 'value');
    expect(email.smtpapi.header.unique_args).to.eql({unique_arg1: 'value', unique_arg2: 'value'});
  });

  it('should be possible to setASMGroupID', function() {
    var email = new Email();
    expect(email.smtpapi.header.asm_group_id).to.eql({});
    email.setASMGroupID(123);
    expect(email.smtpapi.header.asm_group_id).to.eql(123);
  });

  it('should be possible to addCc', function() {
    var email = new Email();
    expect(email.cc).to.eql([]);
    email.addCc('sorin@domain.com');
    expect(email.cc).to.eql(['sorin@domain.com']);
    email.addCc('sorin2@domain.com');
    expect(email.cc).to.eql(['sorin@domain.com', 'sorin2@domain.com']);
  });

  it('should be possible to setCcs', function() {
    var email = new Email();
    expect(email.cc).to.eql([]);
    email.setCcs(['sorin@domain.com']);
    expect(email.cc).to.eql(['sorin@domain.com']);
    email.setCcs(['sorin2@domain.com']);
    expect(email.cc).to.eql(['sorin2@domain.com']);
  });

  it('should be possible to setCcs and addCc', function() {
    var email = new Email();
    expect(email.cc).to.eql([]);
    email.setCcs(['sorin@domain.com']);
    expect(email.cc).to.eql(['sorin@domain.com']);
    email.addCc('sorin2@domain.com');
    expect(email.cc).to.eql(['sorin@domain.com', 'sorin2@domain.com']);
  });

  describe('files', function() {
    it('should support adding attachments via path', function() {
      var email = new Email();
      email.addFile({filename: 'path-image.png', path: files[0]});
      expect(email.files[0].filename).to.equal('path-image.png');
      expect(email.files[0].contentType).to.equal('image/png');
    });

    it('should support attachments via url', function() {
      var email = new Email();
      email.addFile({filename: 'url-image.jpg', url: 'http://i.imgur.com/2fDh8.jpg'});
      expect(email.files[0].filename).to.equal('url-image.jpg');
      expect(email.files[0].contentType).to.equal('image/jpeg');
    });

    it('should support attachments via content', function() {
      var email = new Email();
      fs.readFile(files[0], function(err, data) {
        expect(err).to.not.be.ok;
        email.addFile({filename: 'content-image.png', content: data, contentType: 'image/png'});
        expect(email.files[0].filename).to.equal('content-image.png');
        expect(email.files[0].contentType).to.equal('image/png');
      });
    });

    it('should support inline content', function() {
      var email = new Email();
      fs.readFile(files[0], function(err, data) {
        expect(err).to.not.be.ok;
        email.addFile({filename: 'content-image.png', content: data, contentType: 'image/png', cid: 'testcid'});
        expect(email.files[0].cid).to.equal('testcid');
        expect(email.files[0].filename).to.equal('content-image.png');
        expect(email.files[0].contentType).to.equal('image/png');
      });
    });
  });

  describe('custom headers', function() {
    var mail;
    var custom_headers = {cow: 'moo', panda: 'brawr'};
    beforeEach(function() {
      mail = new Email();
    });

    it('should allow setting custom headers via setHeaders', function() {
      mail.setHeaders(custom_headers);
      expect(mail.headers).to.eql(custom_headers);
    });

    it('should allow setting custom headers with key, value approach', function() {
      mail.addHeader('fox', 'hound');
      expect(mail.headers.fox).to.eql('hound');
    });

    it('should overwrite headers when calling addHeader with the same value', function() {
      mail.addHeader(custom_headers);
      expect(mail.headers).to.eql(custom_headers);
      mail.addHeader('cow', 'in my mind');
      expect(mail.headers).not.to.eql(custom_headers);
      expect(mail.headers.cow).to.eql('in my mind');
    });

    it('should allow setting custom headers one at a time with addHeader as a hash (temporary. deprecate this ability for key, value approach instead)', function() {
      for(var key in custom_headers) {
        var args = {};
        args[key] = custom_headers[key];
        mail.addHeader(args);
      }

      expect(mail.headers).to.eql(custom_headers);
      mail.addHeader({fox: 'hound'});
      expect(mail.headers.fox).to.eql('hound');
    });

  });

  describe('file handling the constructor', function() {
    it('should be able to add content files easily', function(done) {
      var file = {
        filename: 'hello_snowman.txt',
        content: new Buffer("Hello ☃, I hope you don't melt", 'utf-8')
      };
      var email = new Email({
        files: [
          file
        ]
      });

      email.files[0].loadContent(function(error, message) {
        expect(error).to.not.be.true;
        expect(email.files[0].content).to.eql(file.content);
        done();
      });
    });

    it('should be able to add url files easily', function(done) {
      var file = {
        filename: 'icon.jpg',
        url: 'http://i.imgur.com/2fDh8.jpg'
      };
      var email = new Email({
        files: [
          file
        ]
      });

      expect(email.files[0].filename).to.equal(file.filename);
      expect(email.files[0].content).to.eql(file.content);
      expect(email.files[0].contentType).to.equal('image/jpeg');

      email.files[0].loadContent(function(error, message) {
        expect(error).to.not.be.true;
        expect(email.files[0].content).to.not.be.undefined;
        done();
      });
    });

    it('should be able to add path files easily', function(done) {
      var file = {
        path: __dirname + '/../assets/secret.txt'
      };
      var email = new Email({
        files: [
          file
        ]
      });

      email.files[0].loadContent(function(error, message) {
        expect(error).to.not.be.true;
        expect(email.files[0].content).to.not.be.undefined;
        done();
      });
    });

    it('should be able to add filters', function(done) {
      var email = new Email();

      email.addFilter('subscriptiontrack', 'enable', 1);
      email.addFilter('subscriptiontrack', "text/plain", "If you would like to unsubscribe and stop receiving these emails click here: <% %>.");

      expect(email.smtpapi.jsonString()).to.eql("{\"filters\":{\"subscriptiontrack\":{\"settings\":{\"enable\":1,\"text/plain\":\"If you would like to unsubscribe and stop receiving these emails click here: <% %>.\"}}}}");

      done();
    });
  });
});
