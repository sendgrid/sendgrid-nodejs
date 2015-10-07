var default_payload = {
  to            : process.env.TO || "hello@example.com",
  from          : process.env.FROM || "swift@sendgrid.com",
  subject       : "[sendgrid-nodejs] ",
  text          : "This is a text body",
  html          : "<h2>This is an html body</h2>"
}

var sinon = require('sinon');
var nock  = require('nock');

describe('SendGrid', function () {
  it('version should be set', function() {
    var sendgrid = SendGrid(API_USER, API_KEY);
    expect(sendgrid.version).to.equal("2.0.0");
  });

  it('should be an instance of SendGrid', function() {
    var sendgrid = SendGrid(API_USER, API_KEY);
    expect(sendgrid).to.be.an.instanceof(SendGrid);
  });

  it('should work with a username and password', function() {
    var sendgrid = SendGrid(API_USER, API_KEY);
    expect(sendgrid.api_user).to.equal(API_USER);
    expect(sendgrid.api_key).to.equal(API_KEY);
  });

  it('should work with a username, password, and options', function() {
    var sendgrid = SendGrid(API_USER, API_KEY, {foo: 'bar'});
    expect(sendgrid.api_user).to.equal(API_USER);
    expect(sendgrid.api_key).to.equal(API_KEY);
    expect(sendgrid.options.foo).to.equal('bar');
  });

  it('should work with an api key', function() {
    var sendgrid = SendGrid(API_KEY);
    expect(sendgrid.api_key).to.equal(API_KEY);
    expect(sendgrid.api_user).to.be.null;
  });

  it('should work with an api key and options', function() {
    var sendgrid = SendGrid(API_KEY, {foo: 'bar'});
    expect(sendgrid.api_key).to.equal(API_KEY);
    expect(sendgrid.api_user).to.be.null;
    expect(sendgrid.options.foo).to.equal('bar');
  });

  it('should export the Email object', function() {
    var sendgrid = SendGrid(API_USER, API_KEY);
    expect(sendgrid.Email).to.not.be.undefined;
  });

  it('should attach a options object to self', function() {
    var sendgrid = SendGrid(API_USER, API_KEY);
    expect( typeof sendgrid.options).to.equal('object');
  });

  it('should have uri set to the default', function() {
    var sendgrid = SendGrid(API_USER, API_KEY);
    expect(sendgrid.options.uri).to.equal("https://api.sendgrid.com/api/mail.send.json");
  });

  it('should allow uri to change', function() {
    var options   = { "protocol" : "http", "host" : "sendgrid.org", "endpoint" : "/send", "port" : "80" };
    var sendgrid2 = require('../../lib/sendgrid')(API_USER, API_KEY, options);
    expect(sendgrid2.options.uri).to.equal("http://sendgrid.org:80/send");
  });

  it('should have web options agent global', function() {
    var options   = { web: { pool: global.http.globalAgent } };
    var sendgrid2 = require('../../lib/sendgrid')(API_USER, API_KEY, options);
    expect(sendgrid2.options.web.pool).to.equal(http.globalAgent);
  });

  describe('#send', function() {
    var payload, mock, webApi, postParams, postParamsString;

    beforeEach(function() {
      payload = Object.create(default_payload);

      webApi  = nock('https://api.sendgrid.com')
        .filteringRequestBody(function(path) {
          postParamsString = path;
          return '*';
        })
        .post('/api/mail.send.json', '*');
    });

    it('has an optional callback', function(done) {
      var sendgrid = SendGrid(API_USER, API_KEY);
      expect(function() {
        sendgrid.send(payload);
      }).to.not.throw(Error);

      done();
    });

    it('reports errors to the user', function(done) {
      var sendgrid = SendGrid(API_USER, API_KEY);
      mock = webApi.reply(500, { message: "error", errors: ["some error"] });

      sendgrid.send({}, function(err, json) {
        expect(err.stack);
        expect(err.message).to.equal("some error");
        done();
      });
    });

    it('reports http errors to the user', function(done) {
      var https = require('https');
      var realRequest = https.request;
      var stub;
      var sendgrid = SendGrid(API_USER, API_KEY);

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
      var sendgrid = SendGrid(API_USER, API_KEY);
      mock = webApi.reply(200, { message: "success" });

      sendgrid.send({}, function(err, json) {
        expect(err).to.be.null;
        expect(json['message']).to.equal('success');
        done();
      });
    });

    it('sends the basic message parameters', function(done) {
      var sendgrid = SendGrid(API_USER, API_KEY);
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
      var sendgrid = SendGrid(API_USER, API_KEY);
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
      var sendgrid = SendGrid(API_USER, API_KEY);
      mock = webApi.reply(200, { message: "success" });

      payload.subject = "A unicode ✔ subject";

      sendgrid.send(payload, function(err, json) {
        var encodedCheckmark = '✔';

        expect(postParamsString).to.include(encodedCheckmark);
        done();
      });
    });

    it('should have an authorization header when using an api key', function(done) {
      var sendgrid = SendGrid(API_KEY);
      mock = webApi.matchHeader('Authorization', 'Bearer ' + API_KEY).reply(200, { message: "success" });

      sendgrid.send({}, function(err, json) {
        expect(err).to.be.null;
        expect(json['message']).to.equal('success');
        done();
      });
    });

    afterEach(function() {
      if(mock) expect(mock.isDone()).to.be.true;
    });
  });
});
