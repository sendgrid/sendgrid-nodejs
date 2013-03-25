var SendGrid = require('../../lib/sendgrid')
  , querystring = require('querystring')
  , sinon = require('sinon')
  , nock = require('nock');

describe('SendGrid', function () {
  var sendgrid, defaults;

  beforeEach(function() {
    sendgrid = new SendGrid('some_sendgrid_username', 'some_sendgrid_password');

    defaults = {
      to: "hello@example.com",
      from: "swift@sendgrid.com",
      subject: "Test subject",
      text: "This is a text body",
      html: "<p>This is an html body</p>"
    };
  });

  describe('#send', function() {
    var mock, webApi, postParams, postParamsString;

    beforeEach(function() {
      webApi = nock('https://sendgrid.com:443')
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .filteringRequestBody(function(path) {
          postParamsString = path;
          postParams = querystring.parse(path);
          return '*';
        })
        .post('/api/mail.send.json', '*');
    });


    it('has an optional callback', function(done) {
      expect(function() {
        sendgrid.send(defaults);
      }).to.not.throw(Error);

      done();
    });

    it('reports errors to the user', function(done) {
      mock = webApi.reply(500, { message: "error", errors: "some error" });

      sendgrid.send({}, function(success, message) {
        expect(success).to.be.false;
        expect(message).to.equal("some error");
        done();
      });
    });

    it('reports http errors to the user', function(done) {
      var https = require('https')
        , realRequest = https.request
        , stub;

      function fakeRequest(options, cb) {
        var req = realRequest(options, cb);
        process.nextTick(function() {
          req.emit('error', 'some http error');
        });
        return req;
      }

      stub = sinon.stub(https, 'request', fakeRequest);

      sendgrid.send({}, function(success, message) {
        expect(success).to.be.false;
        expect(message).to.equal("some http error");
        https.request.restore();
        done();
      });
    });

    it("returns success if message is 'success'", function(done) {
      mock = webApi.reply(200, { message: "success" });

      sendgrid.send({}, function(success, message) {
        expect(success).to.be.true;
        expect(message).to.be.undefined;
        done();
      });
    });

    it('sends the basic message parameters', function(done) {
      mock = webApi.reply(200, { message: "success" });

      sendgrid.send(defaults, function(success, message) {
        expect(postParams).to.include.keys(['api_user', 'api_key', 'to', 'from', 'subject', 'text', 'html', 'x-smtpapi']);
        expect(postParams).not.to.include.keys(['toname', 'fromname']);

        expect(postParams.api_user).to.equal('some_sendgrid_username');
        expect(postParams.api_key).to.equal('some_sendgrid_password');
        expect(postParams.to).to.equal('hello@example.com');
        expect(postParams.from).to.equal('swift@sendgrid.com');
        expect(postParams.subject).to.equal('Test subject');
        expect(postParams.text).to.equal('This is a text body');
        expect(postParams.html).to.equal('<p>This is an html body</p>');
        expect(postParams['x-smtpapi']).to.equal('{}');

        done();
      });
    });

    it('supports an optional toname and fromname', function(done) {
      mock = webApi.reply(200, { message: "success" });

      defaults.toname = "to name";
      defaults.fromname= "from name";

      sendgrid.send(defaults, function(success, message) {
        expect(postParams).to.include.keys(['toname', 'fromname']);

        expect(postParams.toname).to.equal('to name');
        expect(postParams.fromname).to.equal('from name');

        done();
      });
    });

    it('encodes unicode strings in parameters', function(done) {
      mock = webApi.reply(200, { message: "success" });

      defaults.subject = "A unicode ✔ subject";

      sendgrid.send(defaults, function(success, message) {
        var encodedCheckmark = '%E2%9C%94';

        expect(postParamsString).to.include(encodedCheckmark);
        done();
      });
    });

    afterEach(function() {
      if(mock) expect(mock.isDone()).to.be.true;
    });
  });
});
