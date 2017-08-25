'use strict';

/**
 * Dependencies
 */
const sgClient = require('./client');
const baseUrl = process.env.MOCK_HOST || 'http://localhost:4010/';

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

describe('test_access_settings_activity_get', () => {
  const queryParams = { limit: 1 };
  const request = {
    method: 'GET',
    url: '/v3/access_settings/activity',
    qs: queryParams,
  };
  it('should have the correct response code', () => {
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});
