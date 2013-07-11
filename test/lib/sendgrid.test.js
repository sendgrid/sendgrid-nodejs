process.env.NODE_ENV = 'test';
var dotenv = require('dotenv')();
dotenv.load();

var API_USER    = process.env.API_USER || 'some_sendgrid_username';
var API_KEY     = process.env.API_KEY || 'some_sendgrid_password';
var default_payload = {
  to            : process.env.TO || "hello@example.com",
  from          : process.env.FROM || "swift@sendgrid.com",
  subject       : "[sendgrid-nodejs] ",
  text          : "This is a text body",
  html          : "<h2>This is an html body</h2>"
}

var SendGrid = require('../../lib/sendgrid')
  , Email = require('../../lib/email')
  , querystring = require('querystring')
  , sinon = require('sinon')
  , nock = require('nock');

describe('SendGrid', function () {
  var sendgrid;

  beforeEach(function() {
    sendgrid  = new SendGrid(API_USER, API_KEY);
  });

  describe('#send', function() {
    var payload, mock, webApi, postParams, postParamsString;

    beforeEach(function() {
      payload = Object.create(default_payload);

      webApi  = nock('https://sendgrid.com:443')
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
        sendgrid.send(payload);
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

      sendgrid.send(payload, function(success, message) {
        expect(postParams).to.include.keys(['api_user', 'api_key', 'to', 'from', 'subject', 'text', 'html', 'x-smtpapi']);
        expect(postParams).not.to.include.keys(['toname', 'fromname']);

        expect(postParams.api_user).to.equal(API_USER);
        expect(postParams.api_key).to.equal(API_KEY);
        expect(postParams.to).to.equal(default_payload.to);
        expect(postParams.from).to.equal(default_payload.from);
        expect(postParams.subject).to.equal(default_payload.subject);
        expect(postParams.text).to.equal(default_payload.text);
        expect(postParams.html).to.equal(default_payload.html);
        expect(postParams['x-smtpapi']).to.equal('{}');

        done();
      });
    });

    it('supports an optional toname and fromname', function(done) {
      mock = webApi.reply(200, { message: "success" });

      payload.toname = "to name";
      payload.fromname= "from name";

      sendgrid.send(payload, function(success, message) {
        expect(postParams).to.include.keys(['toname', 'fromname']);

        expect(postParams.toname).to.equal('to name');
        expect(postParams.fromname).to.equal('from name');

        done();
      });
    });

    it('encodes unicode strings in parameters', function(done) {
      mock = webApi.reply(200, { message: "success" });

      payload.subject = "A unicode ✔ subject";

      sendgrid.send(payload, function(success, message) {
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
