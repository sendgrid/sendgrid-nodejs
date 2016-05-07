var assert = require('chai').assert

// Test if the SendGrid object is initilized correctly
describe('SendGrid', function () {
  var TEST_HOST = 'api.test.com'
  var API_KEY = 'SendGrid API Key'
  var globalHeaders = [];
  globalHeaders.push({"X-Test": "True"});
  globalHeaders.push({"X-Test1": "False"});
  var sg = require('../lib/sendgrid.js').SendGrid(API_KEY, TEST_HOST, globalHeaders)

  it('returns the correct host name', function() {
      assert.equal(sg.globalRequest.host, 'api.test.com', 'host is correct')
  });

  it('returns the correct method', function() {
      assert.equal(sg.globalRequest.method, '', 'method is empty')
  });

  it('returns the correct path', function() {
      assert.equal(sg.globalRequest.path, '', 'path is empty')
  });

  testHeaders = {}
  testHeaders['Content-Type'] = 'application/json';
  testHeaders['Authorization'] = 'Bearer SendGrid API Key'
  testHeaders['User-Agent'] = 'sendgrid/3.0.0;nodejs'
  testHeaders['X-Test'] = 'True'
  testHeaders['X-Test1'] = 'False'

  it('returns the correct global headers', function() {
      assert.equal(JSON.stringify(sg.globalRequest.headers), JSON.stringify(testHeaders), 'headers are correct')
  });

  it('returns the correct request body', function() {
      assert.equal(JSON.stringify(sg.globalRequest.requestBody), '{}', 'request body is empty')
  });

  it('returns the correct query params', function() {
      assert.equal(JSON.stringify(sg.globalRequest.queryParams), '{}', 'query params is empty')
  });
})
