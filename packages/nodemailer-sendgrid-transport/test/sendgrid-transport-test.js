var sgTransport = require('../src/sendgrid-transport.js');
var expect = require('chai').expect;

var pkg = require('../package.json');

var transport = null;

describe('sendgrid-transport', function() {
	it('should take an api_user and api_key', function() {
		transport = sgTransport({ 'auth': { api_user: 'test', api_key: 'test' } })
	});

	it('should take an apikey', function() {
		transport = sgTransport({ 'auth': { api_key: 'test' } })
	});

	it('should have a name and version', function() {
		expect(transport.name).to.eq('SendGrid')
		expect(transport.version).to.eq(pkg.version)
	});
});
