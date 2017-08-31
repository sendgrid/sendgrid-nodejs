'use strict';
const baseUrl = 'http://localhost:4010/';

/**
 * Tests
 */
describe('test_access_settings_activity_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/access_settings/activity';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_access_settings_whitelist_post', () => {
  var request = {};
  const data = {
  "ips": [
    {
      "ip": "192.168.1.1"
    }, 
    {
      "ip": "192.*.*.*"
    }, 
    {
      "ip": "192.168.1.3/32"
    }
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/access_settings/whitelist';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_access_settings_whitelist_delete', () => {
  var request = {};
  const data = {
  "ids": [
    1, 
    2, 
    3
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/access_settings/whitelist';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_access_settings_whitelist_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/access_settings/whitelist';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_access_settings_whitelist__rule_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/access_settings/whitelist/{rule_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_access_settings_whitelist__rule_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/access_settings/whitelist/{rule_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_alerts_post', () => {
  var request = {};
  const data = {
  "email_to": "example@example.com", 
  "frequency": "daily", 
  "type": "stats_notification"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/alerts';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_alerts_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/alerts';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_alerts__alert_id__patch', () => {
  var request = {};
  const data = {
  "email_to": "example@example.com"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/alerts/{alert_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_alerts__alert_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/alerts/{alert_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_alerts__alert_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/alerts/{alert_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_api_keys_post', () => {
  var request = {};
  const data = {
  "name": "My API Key", 
  "sample": "data", 
  "scopes": [
    "mail.send", 
    "alerts.create", 
    "alerts.read"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/api_keys';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_api_keys_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/api_keys';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_api_keys__api_key_id__put', () => {
  var request = {};
  const data = {
  "name": "A New Hope", 
  "scopes": [
    "user.profile.read", 
    "user.profile.update"
  ]
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_api_keys__api_key_id__patch', () => {
  var request = {};
  const data = {
  "name": "A New Hope"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_api_keys__api_key_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_api_keys__api_key_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/api_keys/{api_key_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_asm_groups_post', () => {
  var request = {};
  const data = {
  "description": "Suggestions for products our users might like.", 
  "is_default": true, 
  "name": "Product Suggestions"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/groups';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_asm_groups_get', () => {
  var request = {};
  const queryParams = {
  'id': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/asm/groups';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_asm_groups__group_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/asm/groups/{group_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_asm_groups__group_id__patch', () => {
  var request = {};
  const data = {
  "description": "Suggestions for items our users might like.", 
  "id": 103, 
  "name": "Item Suggestions"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/asm/groups/{group_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_asm_groups__group_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/asm/groups/{group_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_asm_groups__group_id__suppressions_post', () => {
  var request = {};
  const data = {
  "recipient_emails": [
    "test1@example.com", 
    "test2@example.com"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/groups/{group_id}/suppressions';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_asm_groups__group_id__suppressions_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/asm/groups/{group_id}/suppressions';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_asm_groups__group_id__suppressions_search_post', () => {
  var request = {};
  const data = {
  "recipient_emails": [
    "exists1@example.com", 
    "exists2@example.com", 
    "doesnotexists@example.com"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/groups/{group_id}/suppressions/search';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_asm_groups__group_id__suppressions__email__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/asm/groups/{group_id}/suppressions/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_asm_suppressions_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/asm/suppressions';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_asm_suppressions_global_post', () => {
  var request = {};
  const data = {
  "recipient_emails": [
    "test1@example.com", 
    "test2@example.com"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/suppressions/global';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_asm_suppressions_global__email__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/asm/suppressions/global/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_asm_suppressions_global__email__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/asm/suppressions/global/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_asm_suppressions__email__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/asm/suppressions/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_browsers_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'browsers': 'test_string', 
  'end_date': '2016-04-01', 
  'limit': 'test_string', 
  'offset': 'test_string', 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/browsers/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_campaigns_post', () => {
  var request = {};
  const data = {
  "categories": [
    "spring line"
  ], 
  "custom_unsubscribe_url": "", 
  "html_content": "<html><head><title></title></head><body><p>Check out our spring line!</p></body></html>", 
  "ip_pool": "marketing", 
  "list_ids": [
    110, 
    124
  ], 
  "plain_content": "Check out our spring line!", 
  "segment_ids": [
    110
  ], 
  "sender_id": 124451, 
  "subject": "New Products for Spring!", 
  "suppression_group_id": 42, 
  "title": "March Newsletter"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/campaigns';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_campaigns_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/campaigns';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_campaigns__campaign_id__patch', () => {
  var request = {};
  const data = {
  "categories": [
    "summer line"
  ], 
  "html_content": "<html><head><title></title></head><body><p>Check out our summer line!</p></body></html>", 
  "plain_content": "Check out our summer line!", 
  "subject": "New Products for Summer!", 
  "title": "May Newsletter"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/campaigns/{campaign_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_campaigns__campaign_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/campaigns/{campaign_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_campaigns__campaign_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/campaigns/{campaign_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_campaigns__campaign_id__schedules_delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_campaigns__campaign_id__schedules_post', () => {
  var request = {};
  const data = {
  "send_at": 1489771528
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_campaigns__campaign_id__schedules_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_campaigns__campaign_id__schedules_patch', () => {
  var request = {};
  const data = {
  "send_at": 1489451436
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_campaigns__campaign_id__schedules_now_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules/now';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_campaigns__campaign_id__schedules_test_post', () => {
  var request = {};
  const data = {
  "to": "your.email@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules/test';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_categories_get', () => {
  var request = {};
  const queryParams = {
  'category': 'test_string', 
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/categories';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_categories_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'categories': 'test_string', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'offset': 1, 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/categories/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_categories_stats_sums_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'offset': 1, 
  'sort_by_direction': 'asc', 
  'sort_by_metric': 'test_string', 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/categories/stats/sums';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_clients_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/clients/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_clients__client_type__stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/clients/{client_type}/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_custom_fields_post', () => {
  var request = {};
  const data = {
  "name": "pet", 
  "type": "text"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/custom_fields';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_contactdb_custom_fields_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/custom_fields';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_custom_fields__custom_field_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/contactdb/custom_fields/{custom_field_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 202);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(202);
      });
  });
});

describe('test_contactdb_custom_fields__custom_field_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/custom_fields/{custom_field_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_lists_post', () => {
  var request = {};
  const data = {
  "name": "your list name"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/lists';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_contactdb_lists_delete', () => {
  var request = {};
  const data = [
  1, 
  2, 
  3, 
  4
];
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_contactdb_lists_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/lists';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_lists__list_id__delete', () => {
  var request = {};
  const queryParams = {
  'delete_contacts': 'true'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists/{list_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 202);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(202);
      });
  });
});

describe('test_contactdb_lists__list_id__patch', () => {
  var request = {};
  const data = {
  "name": "newlistname"
};
  request.body = data;
  const queryParams = {
  'list_id': 1
};
  request.qs = queryParams;
  request.method = 'PATCH';
  request.url = '/v3/contactdb/lists/{list_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_lists__list_id__get', () => {
  var request = {};
  const queryParams = {
  'list_id': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/lists/{list_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_lists__list_id__recipients_post', () => {
  var request = {};
  const data = [
  "recipient_id1", 
  "recipient_id2"
];
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/lists/{list_id}/recipients';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_contactdb_lists__list_id__recipients_get', () => {
  var request = {};
  const queryParams = {
  'list_id': 1, 
  'page': 1, 
  'page_size': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/lists/{list_id}/recipients';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_lists__list_id__recipients__recipient_id__post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_contactdb_lists__list_id__recipients__recipient_id__delete', () => {
  var request = {};
  const queryParams = {
  'list_id': 1, 
  'recipient_id': 1
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_contactdb_recipients_post', () => {
  var request = {};
  const data = [
  {
    "age": 25, 
    "email": "example@example.com", 
    "first_name": "", 
    "last_name": "User"
  }, 
  {
    "age": 25, 
    "email": "example2@example.com", 
    "first_name": "Example", 
    "last_name": "User"
  }
];
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_contactdb_recipients_delete', () => {
  var request = {};
  const data = [
  "recipient_id1", 
  "recipient_id2"
];
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_recipients_get', () => {
  var request = {};
  const queryParams = {
  'page': 1, 
  'page_size': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_recipients_patch', () => {
  var request = {};
  const data = [
  {
    "email": "jones@example.com", 
    "first_name": "Guy", 
    "last_name": "Jones"
  }
];
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/contactdb/recipients';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_contactdb_recipients_billable_count_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/billable_count';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_recipients_count_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/count';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_recipients_search_get', () => {
  var request = {};
  const queryParams = {
  '{field_name}': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/search';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_recipients__recipient_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/contactdb/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_contactdb_recipients__recipient_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/{recipient_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_recipients__recipient_id__lists_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/{recipient_id}/lists';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_reserved_fields_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/reserved_fields';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_segments_post', () => {
  var request = {};
  const data = {
  "conditions": [
    {
      "and_or": "", 
      "field": "last_name", 
      "operator": "eq", 
      "value": "Miller"
    }, 
    {
      "and_or": "and", 
      "field": "last_clicked", 
      "operator": "gt", 
      "value": "01/02/2015"
    }, 
    {
      "and_or": "or", 
      "field": "clicks.campaign_identifier", 
      "operator": "eq", 
      "value": "513"
    }
  ], 
  "list_id": 4, 
  "name": "Last Name Miller"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/segments';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_segments_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/segments';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_segments__segment_id__delete', () => {
  var request = {};
  const queryParams = {
  'delete_contacts': 'true'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/segments/{segment_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_contactdb_segments__segment_id__patch', () => {
  var request = {};
  const data = {
  "conditions": [
    {
      "and_or": "", 
      "field": "last_name", 
      "operator": "eq", 
      "value": "Miller"
    }
  ], 
  "list_id": 5, 
  "name": "The Millers"
};
  request.body = data;
  const queryParams = {
  'segment_id': 'test_string'
};
  request.qs = queryParams;
  request.method = 'PATCH';
  request.url = '/v3/contactdb/segments/{segment_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_segments__segment_id__get', () => {
  var request = {};
  const queryParams = {
  'segment_id': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/segments/{segment_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_segments__segment_id__recipients_get', () => {
  var request = {};
  const queryParams = {
  'page': 1, 
  'page_size': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/segments/{segment_id}/recipients';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_contactdb_status_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/contactdb/status';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_devices_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'offset': 1, 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/devices/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_geo_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'country': 'US', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'offset': 1, 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/geo/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_post', () => {
  var request = {};
  const data = {
  "count": 90323478, 
  "subusers": [
    "subuser1", 
    "subuser2"
  ], 
  "user_can_send": true, 
  "warmup": true
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_ips_get', () => {
  var request = {};
  const queryParams = {
  'exclude_whitelabels': 'true', 
  'ip': 'test_string', 
  'limit': 1, 
  'offset': 1, 
  'sort_by_direction': 'asc', 
  'subuser': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/ips';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_assigned_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/ips/assigned';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_pools_post', () => {
  var request = {};
  const data = {
  "name": "marketing"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips/pools';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_pools_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/ips/pools';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_pools__pool_name__put', () => {
  var request = {};
  const data = {
  "name": "new_pool_name"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/ips/pools/{pool_name}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_pools__pool_name__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/ips/pools/{pool_name}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_ips_pools__pool_name__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/ips/pools/{pool_name}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_pools__pool_name__ips_post', () => {
  var request = {};
  const data = {
  "ip": "0.0.0.0"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips/pools/{pool_name}/ips';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_ips_pools__pool_name__ips__ip__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/ips/pools/{pool_name}/ips/{ip}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_ips_remaining_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/ips/remaining';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_warmup_post', () => {
  var request = {};
  const data = {
  "ip": "0.0.0.0"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips/warmup';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_warmup_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/ips/warmup';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips_warmup__ip_address__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/ips/warmup/{ip_address}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_ips_warmup__ip_address__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/ips/warmup/{ip_address}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_ips__ip_address__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/ips/{ip_address}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_batch_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/mail/batch';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_mail_batch__batch_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail/batch/{batch_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_send_post', () => {
  var request = {};
  const data = {
  "content": [
    {
      "type": "text/html", 
      "value": "<html><p>Hello, world!</p></html>"
    }
  ], 
  "from": {
    "email": "sam.smith@example.com", 
    "name": "Sam Smith"
  }, 
  "personalizations": [
    {
      "subject": "Hello, World!", 
      "to": [
        {
          "email": "john.doe@example.com", 
          "name": "John Doe"
        }
      ]
    }
  ], 
  "reply_to": {
    "email": "sam.smith@example.com", 
    "name": "Sam Smith"
  }, 
  "subject": "Hello, World!"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/mail/send';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 202);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(202);
      });
  });
});

describe('test_mail_settings_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/mail_settings';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_address_whitelist_patch', () => {
  var request = {};
  const data = {
  "enabled": true, 
  "list": [
    "email1@example.com", 
    "example.com"
  ]
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/address_whitelist';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_address_whitelist_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/address_whitelist';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_bcc_patch', () => {
  var request = {};
  const data = {
  "email": "email@example.com", 
  "enabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/bcc';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_bcc_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/bcc';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_bounce_purge_patch', () => {
  var request = {};
  const data = {
  "enabled": true, 
  "hard_bounces": 5, 
  "soft_bounces": 5
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/bounce_purge';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_bounce_purge_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/bounce_purge';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_footer_patch', () => {
  var request = {};
  const data = {
  "enabled": true, 
  "html_content": "...", 
  "plain_content": "..."
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/footer';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_footer_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/footer';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_forward_bounce_patch', () => {
  var request = {};
  const data = {
  "email": "example@example.com", 
  "enabled": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/forward_bounce';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_forward_bounce_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/forward_bounce';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_forward_spam_patch', () => {
  var request = {};
  const data = {
  "email": "", 
  "enabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/forward_spam';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_forward_spam_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/forward_spam';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_plain_content_patch', () => {
  var request = {};
  const data = {
  "enabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/plain_content';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_plain_content_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/plain_content';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_spam_check_patch', () => {
  var request = {};
  const data = {
  "enabled": true, 
  "max_score": 5, 
  "url": "url"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/spam_check';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_spam_check_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/spam_check';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_template_patch', () => {
  var request = {};
  const data = {
  "enabled": true, 
  "html_content": "<% body %>"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/template';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mail_settings_template_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/mail_settings/template';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_mailbox_providers_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'mailbox_providers': 'test_string', 
  'offset': 1, 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/mailbox_providers/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_partner_settings_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/partner_settings';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_partner_settings_new_relic_patch', () => {
  var request = {};
  const data = {
  "enable_subuser_statistics": true, 
  "enabled": true, 
  "license_key": ""
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/partner_settings/new_relic';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_partner_settings_new_relic_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/partner_settings/new_relic';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_scopes_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/scopes';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_scopes_requests_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/scopes/requests';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_scopes_requests__request_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/scopes/requests/{request_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_scopes_requests__request_id__approve_patch', () => {
  var request = {};
  request.method = 'PATCH';
  request.url = '/v3/scopes/requests/{request_id}/approve';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_senders_post', () => {
  var request = {};
  const data = {
  "address": "123 Elm St.", 
  "address_2": "Apt. 456", 
  "city": "Denver", 
  "country": "United States", 
  "from": {
    "email": "from@example.com", 
    "name": "Example INC"
  }, 
  "nickname": "My Sender ID", 
  "reply_to": {
    "email": "replyto@example.com", 
    "name": "Example INC"
  }, 
  "state": "Colorado", 
  "zip": "80202"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/senders';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_senders_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/senders';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_senders__sender_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/senders/{sender_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_senders__sender_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/senders/{sender_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_senders__sender_id__patch', () => {
  var request = {};
  const data = {
  "address": "123 Elm St.", 
  "address_2": "Apt. 456", 
  "city": "Denver", 
  "country": "United States", 
  "from": {
    "email": "from@example.com", 
    "name": "Example INC"
  }, 
  "nickname": "My Sender ID", 
  "reply_to": {
    "email": "replyto@example.com", 
    "name": "Example INC"
  }, 
  "state": "Colorado", 
  "zip": "80202"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/senders/{sender_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_senders__sender_id__resend_verification_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/senders/{sender_id}/resend_verification';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'offset': 1, 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers_post', () => {
  var request = {};
  const data = {
  "email": "John@example.com", 
  "ips": [
    "1.1.1.1", 
    "2.2.2.2"
  ], 
  "password": "johns_password", 
  "username": "John@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/subusers';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1, 
  'offset': 1, 
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers_reputations_get', () => {
  var request = {};
  const queryParams = {
  'usernames': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/reputations';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'offset': 1, 
  'start_date': '2016-01-01', 
  'subusers': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers_stats_monthly_get', () => {
  var request = {};
  const queryParams = {
  'date': 'test_string', 
  'limit': 1, 
  'offset': 1, 
  'sort_by_direction': 'asc', 
  'sort_by_metric': 'test_string', 
  'subuser': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/stats/monthly';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers_stats_sums_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'limit': 1, 
  'offset': 1, 
  'sort_by_direction': 'asc', 
  'sort_by_metric': 'test_string', 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/stats/sums';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers__subuser_name__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/subusers/{subuser_name}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_subusers__subuser_name__patch', () => {
  var request = {};
  const data = {
  "disabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/subusers/{subuser_name}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_subusers__subuser_name__ips_put', () => {
  var request = {};
  const data = [
  "127.0.0.1"
];
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/subusers/{subuser_name}/ips';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers__subuser_name__monitor_put', () => {
  var request = {};
  const data = {
  "email": "example@example.com", 
  "frequency": 500
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers__subuser_name__monitor_post', () => {
  var request = {};
  const data = {
  "email": "example@example.com", 
  "frequency": 50000
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers__subuser_name__monitor_delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_subusers__subuser_name__monitor_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_subusers__subuser_name__stats_monthly_get', () => {
  var request = {};
  const queryParams = {
  'date': 'test_string', 
  'limit': 1, 
  'offset': 1, 
  'sort_by_direction': 'asc', 
  'sort_by_metric': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/{subuser_name}/stats/monthly';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_blocks_delete', () => {
  var request = {};
  const data = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/blocks';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_blocks_get', () => {
  var request = {};
  const queryParams = {
  'end_time': 1, 
  'limit': 1, 
  'offset': 1, 
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/blocks';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_blocks__email__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/suppression/blocks/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_blocks__email__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/blocks/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_bounces_delete', () => {
  var request = {};
  const data = {
  "delete_all": true, 
  "emails": [
    "example@example.com", 
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/bounces';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_bounces_get', () => {
  var request = {};
  const queryParams = {
  'end_time': 1, 
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/bounces';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_bounces__email__delete', () => {
  var request = {};
  const queryParams = {
  'email_address': 'example@example.com'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/suppression/bounces/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_bounces__email__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/bounces/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_invalid_emails_delete', () => {
  var request = {};
  const data = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/invalid_emails';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_invalid_emails_get', () => {
  var request = {};
  const queryParams = {
  'end_time': 1, 
  'limit': 1, 
  'offset': 1, 
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/invalid_emails';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_invalid_emails__email__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/suppression/invalid_emails/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_invalid_emails__email__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/invalid_emails/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_spam_reports_delete', () => {
  var request = {};
  const data = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/spam_reports';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_spam_reports_get', () => {
  var request = {};
  const queryParams = {
  'end_time': 1, 
  'limit': 1, 
  'offset': 1, 
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/spam_reports';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_spam_reports__email__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/suppression/spam_reports/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_suppression_spam_reports__email__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/suppression/spam_reports/{email}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_suppression_unsubscribes_get', () => {
  var request = {};
  const queryParams = {
  'end_time': 1, 
  'limit': 1, 
  'offset': 1, 
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/unsubscribes';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_teammates_post', () => {
  var request = {};
  const data = {
  "email": "teammate1@example.com", 
  "is_admin": false, 
  "scopes": [
    "user.profile.read", 
    "user.profile.update"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/teammates';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_teammates_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/teammates';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_teammates_pending_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/teammates/pending';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_teammates_pending__token__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/teammates/pending/{token}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_teammates_pending__token__resend_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/teammates/pending/{token}/resend';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_teammates__username__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/teammates/{username}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_teammates__username__patch', () => {
  var request = {};
  const data = {
  "is_admin": false, 
  "scopes": [
    "user.profile.read", 
    "user.profile.edit"
  ]
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/teammates/{username}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_teammates__username__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/teammates/{username}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_templates_post', () => {
  var request = {};
  const data = {
  "name": "example_name"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/templates';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_templates_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/templates';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_templates__template_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/templates/{template_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_templates__template_id__patch', () => {
  var request = {};
  const data = {
  "name": "new_example_name"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/templates/{template_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_templates__template_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/templates/{template_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_templates__template_id__versions_post', () => {
  var request = {};
  const data = {
  "active": 1, 
  "html_content": "<%body%>", 
  "name": "example_version_name", 
  "plain_content": "<%body%>", 
  "subject": "<%subject%>", 
  "template_id": "ddb96bbc-9b92-425e-8979-99464621b543"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/templates/{template_id}/versions';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_templates__template_id__versions__version_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_templates__template_id__versions__version_id__patch', () => {
  var request = {};
  const data = {
  "active": 1, 
  "html_content": "<%body%>", 
  "name": "updated_example_name", 
  "plain_content": "<%body%>", 
  "subject": "<%subject%>"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_templates__template_id__versions__version_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_templates__template_id__versions__version_id__activate_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/templates/{template_id}/versions/{version_id}/activate';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/tracking_settings';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_click_patch', () => {
  var request = {};
  const data = {
  "enabled": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/click';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_click_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/click';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_google_analytics_patch', () => {
  var request = {};
  const data = {
  "enabled": true, 
  "utm_campaign": "website", 
  "utm_content": "", 
  "utm_medium": "email", 
  "utm_source": "sendgrid.com", 
  "utm_term": ""
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/google_analytics';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_google_analytics_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/google_analytics';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_open_patch', () => {
  var request = {};
  const data = {
  "enabled": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/open';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_open_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/open';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_subscription_patch', () => {
  var request = {};
  const data = {
  "enabled": true, 
  "html_content": "html content", 
  "landing": "landing page html", 
  "plain_content": "text content", 
  "replace": "replacement tag", 
  "url": "url"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/subscription';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_tracking_settings_subscription_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/tracking_settings/subscription';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_account_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/account';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_credits_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/credits';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_email_put', () => {
  var request = {};
  const data = {
  "email": "example@example.com"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/user/email';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_email_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/email';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_password_put', () => {
  var request = {};
  const data = {
  "new_password": "new_password", 
  "old_password": "old_password"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/user/password';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_profile_patch', () => {
  var request = {};
  const data = {
  "city": "Orange", 
  "first_name": "Example", 
  "last_name": "User"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/profile';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_profile_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/profile';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_scheduled_sends_post', () => {
  var request = {};
  const data = {
  "batch_id": "YOUR_BATCH_ID", 
  "status": "pause"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/user/scheduled_sends';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_user_scheduled_sends_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/scheduled_sends';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_scheduled_sends__batch_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_user_scheduled_sends__batch_id__patch', () => {
  var request = {};
  const data = {
  "status": "pause"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_user_scheduled_sends__batch_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_settings_enforced_tls_patch', () => {
  var request = {};
  const data = {
  "require_tls": true, 
  "require_valid_cert": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/settings/enforced_tls';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_settings_enforced_tls_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/settings/enforced_tls';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_username_put', () => {
  var request = {};
  const data = {
  "username": "test_username"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/user/username';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_username_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/username';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_webhooks_event_settings_patch', () => {
  var request = {};
  const data = {
  "bounce": true, 
  "click": true, 
  "deferred": true, 
  "delivered": true, 
  "dropped": true, 
  "enabled": true, 
  "group_resubscribe": true, 
  "group_unsubscribe": true, 
  "open": true, 
  "processed": true, 
  "spam_report": true, 
  "unsubscribe": true, 
  "url": "url"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/webhooks/event/settings';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_webhooks_event_settings_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/webhooks/event/settings';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_webhooks_event_test_post', () => {
  var request = {};
  const data = {
  "url": "url"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/user/webhooks/event/test';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_user_webhooks_parse_settings_post', () => {
  var request = {};
  const data = {
  "hostname": "myhostname.com", 
  "send_raw": false, 
  "spam_check": true, 
  "url": "http://email.myhosthame.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/user/webhooks/parse/settings';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_user_webhooks_parse_settings_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/settings';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_webhooks_parse_settings__hostname__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_user_webhooks_parse_settings__hostname__patch', () => {
  var request = {};
  const data = {
  "send_raw": true, 
  "spam_check": false, 
  "url": "http://newdomain.com/parse"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_webhooks_parse_settings__hostname__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_user_webhooks_parse_stats_get', () => {
  var request = {};
  const queryParams = {
  'aggregated_by': 'day', 
  'end_date': '2016-04-01', 
  'limit': 'test_string', 
  'offset': 'test_string', 
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/stats';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains_post', () => {
  var request = {};
  const data = {
  "automatic_security": false, 
  "custom_spf": true, 
  "default": true, 
  "domain": "example.com", 
  "ips": [
    "192.168.1.1", 
    "192.168.1.2"
  ], 
  "subdomain": "news", 
  "username": "john@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_whitelabel_domains_get', () => {
  var request = {};
  const queryParams = {
  'domain': 'test_string', 
  'exclude_subusers': 'true', 
  'limit': 1, 
  'offset': 1, 
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains_default_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/default';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains_subuser_delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/subuser';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_whitelabel_domains_subuser_get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/subuser';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains__domain_id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_whitelabel_domains__domain_id__patch', () => {
  var request = {};
  const data = {
  "custom_spf": true, 
  "default": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains__domain_id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains__domain_id__subuser_post', () => {
  var request = {};
  const data = {
  "username": "jane@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{domain_id}/subuser';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_whitelabel_domains__id__ips_post', () => {
  var request = {};
  const data = {
  "ip": "192.168.0.1"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{id}/ips';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains__id__ips__ip__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/{id}/ips/{ip}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_domains__id__validate_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{id}/validate';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_ips_post', () => {
  var request = {};
  const data = {
  "domain": "example.com", 
  "ip": "192.168.1.1", 
  "subdomain": "email"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/ips';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_whitelabel_ips_get', () => {
  var request = {};
  const queryParams = {
  'ip': 'test_string', 
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/ips';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_ips__id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/ips/{id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_whitelabel_ips__id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/ips/{id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_ips__id__validate_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/whitelabel/ips/{id}/validate';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_links_post', () => {
  var request = {};
  const data = {
  "default": true, 
  "domain": "example.com", 
  "subdomain": "mail"
};
  request.body = data;
  const queryParams = {
  'limit': 1, 
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'POST';
  request.url = '/v3/whitelabel/links';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});

describe('test_whitelabel_links_get', () => {
  var request = {};
  const queryParams = {
  'limit': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/links';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_links_default_get', () => {
  var request = {};
  const queryParams = {
  'domain': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/default';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_links_subuser_delete', () => {
  var request = {};
  const queryParams = {
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/links/subuser';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_whitelabel_links_subuser_get', () => {
  var request = {};
  const queryParams = {
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/subuser';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_links__id__delete', () => {
  var request = {};
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/links/{id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 204);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});

describe('test_whitelabel_links__id__patch', () => {
  var request = {};
  const data = {
  "default": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/whitelabel/links/{id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_links__id__get', () => {
  var request = {};
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/{id}';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_links__id__validate_post', () => {
  var request = {};
  request.method = 'POST';
  request.url = '/v3/whitelabel/links/{id}/validate';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});

describe('test_whitelabel_links__link_id__subuser_post', () => {
  var request = {};
  const data = {
  "username": "jane@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/links/{link_id}/subuser';
  it('should have the correct response code', () => {
    var sgClient = require('./client');
    sgClient.setApiKey('SendGrid API Key');
    sgClient.setDefaultRequest('baseUrl', baseUrl);
    sgClient.setDefaultHeader('X-Mock', 200);
    return sgClient
      .request(request)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});


