'use strict';

/**
 * Dependencies
 */
const sgTransport = require('./sendgrid-transport');
const sgClient = sgTransport.sendgrid;
const baseUrl = 'http://localhost:4010/';
const pkg = require('../package.json');

let transport = null;

/**
 * Setup client
 */
before(() => {
  sgClient.setApiKey('SendGrid API Key');
  sgClient.setDefaultRequest('baseUrl', baseUrl);
});

/**
 * Default mock header
 */
beforeEach(() => {
  sgClient.setDefaultHeader('X-Mock', 200);
});

/**
 * Tests
 */
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