var Parse = require('../../../lib/helpers/inbound/parse.js');

var expect = require('chai').expect;

describe('test_parse', function() {
  describe('test_parse_key_values', function() {
    it('should return the key values specified in the config from the payload', function() {
      var config = {
        keys: ['to', 'from']
      };
      var request = {
        body: {
          to: 'inbound@inbound.example.com',
          from: 'Test User <test@example.com>',
          subject: 'Test Subject'
        }
      };

      var parse = new Parse(config, request);
      var keyValues = parse.keyValues();
      var expectedValues = {
        to: 'inbound@inbound.example.com',
        from: 'Test User <test@example.com>'
      };

      expect(keyValues).to.be.an('object');
      expect(keyValues).to.deep.equal(expectedValues);
    })
  })

  describe('test_parse_get_raw_email', function() {
    it('should return null if no raw email property in payload', function(done) {
      var parse = new Parse({}, {});

      function callback(email) {
        expect(email).to.be.null;
        done();
      }

      parse.getRawEmail(callback);
    });

    it('should parse raw email from payload and return a mail object', function(done) {
      var request = {
        body: {
          email: 'MIME-Version: 1.0\r\nReceived: by 0.0.0.0 with HTTP; Wed, 10 Aug 2016 14:44:21 -0700 (PDT)\r\nFrom: Example User <test@example.com>\r\nDate: Wed, 10 Aug 2016 14:44:21 -0700\r\nSubject: Inbound Parse Test Raw Data\r\nTo: inbound@inbound.inbound.com\r\nContent-Type: multipart/alternative; boundary=001a113ee97c89842f0539be8e7a\r\n\r\n--001a113ee97c89842f0539be8e7a\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\nHello SendGrid!\r\n\r\n--001a113ee97c89842f0539be8e7a\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n<html><body><strong>Hello SendGrid!</body></html>\r\n\r\n--001a113ee97c89842f0539be8e7a--\r\n'
        }
      };

      var parse = new Parse({}, request);

      function callback(email) {
        expect(email).to.be.an('object');
        done();
      }

      parse.getRawEmail(callback);
    });
  });
});
