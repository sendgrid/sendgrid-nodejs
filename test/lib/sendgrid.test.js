var default_payload = {
  to            : process.env.TO || "hello@example.com",
  from          : process.env.FROM || "swift@sendgrid.com",
  subject       : "[sendgrid-nodejs] ",
  text          : "This is a text body",
  html          : "<h2>This is an html body</h2>"
}

var sinon = require('sinon')
  , nock  = require('nock');

describe('SendGrid', function () {
  it('should export the Email object', function() {
    expect(sendgrid.Email).to.not.be.undefined;
  });

  it('should export the SmtpapiHeaders object', function() {
    expect(sendgrid.SmtpapiHeaders).to.not.be.undefined;
  });

  it('version should be set', function() {
    expect(sendgrid.version).to.equal("0.3.0-rc.1.7");
  });

  it('should attach a options object to self', function() {
    expect( typeof sendgrid.options).to.equal('object');
  });

  it('port should be set and settable', function() {
    expect(sendgrid.port).to.equal(587);
    sendgrid.port = 465;
    expect(sendgrid.port).to.equal(465);
  });

  it('options.port should be set and settable', function() {
    expect(sendgrid.options.port).to.equal(587);
    var sendgrid2 = require('../../lib/sendgrid')('username', 'password', {api: 'smtp', port: 465}); 
    expect(sendgrid2.options.port).to.equal(465);
  });

  describe('#send', function() {
    var payload, mock, webApi, postParams, postParamsString;

    beforeEach(function() {
      payload = Object.create(default_payload);

      webApi  = nock('https://sendgrid.com')
        .filteringRequestBody(function(path) {
          postParamsString = path;
          return '*';
        })
        .post('/api/mail.send.json', '*');
    });

    it('has an optional callback', function(done) {
      expect(function() {
        sendgrid.send(payload);
      }).to.not.throw(Error);

      done();
    });

    it('reports errors to the user', function(done) {
      mock = webApi.reply(500, { message: "error", errors: ["some error"] });

      sendgrid.send({}, function(err, json) {
        expect(err.stack);
        expect(err.message).to.equal("some error");
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

      sendgrid.send({}, function(err, json) {
        expect(err).to.equal("some http error");
        https.request.restore();
        done();
      });
    });

    it("returns success if message is 'success'", function(done) {
      mock = webApi.reply(200, { message: "success" });

      sendgrid.send({}, function(err, json) {
        expect(err).to.be.null;
        expect(json['message']).to.equal('success');
        done();
      });
    });

    it('sends the basic message parameters', function(done) {
      mock = webApi.reply(200, { message: "success" });

      sendgrid.send(payload, function(err, json) {
        expect(postParamsString).to.include(API_USER);
        expect(postParamsString).to.include(API_KEY);
        expect(postParamsString).to.include(default_payload.to);
        expect(postParamsString).to.include(default_payload.from);
        expect(postParamsString).to.include(default_payload.subject);
        expect(postParamsString).to.include(default_payload.text);
        expect(postParamsString).to.include(default_payload.html);

        done();
      });
    });

    it('supports an optional toname and fromname', function(done) {
      mock = webApi.reply(200, { message: "success" });

      payload.toname = "to name";
      payload.fromname= "from name";

      sendgrid.send(payload, function(err, json) {
        expect(postParamsString).to.include('to name');
        expect(postParamsString).to.include('from name');

        done();
      });
    });

    it('encodes unicode strings in parameters', function(done) {
      mock = webApi.reply(200, { message: "success" });

      payload.subject = "A unicode ✔ subject";

      sendgrid.send(payload, function(err, json) {
        var encodedCheckmark = '✔';

        expect(postParamsString).to.include(encodedCheckmark);
        done();
      });
    });

    afterEach(function() {
      if(mock) expect(mock.isDone()).to.be.true;
    });
  });
});
