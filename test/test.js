var fs = require('fs');
var execSync = require('child_process').execSync;
var spawn = require('child_process').spawn;

var assert = require('chai').assert
var sendgrid = require('../lib/sendgrid');
var sleep = require('system-sleep');

var prism;
var TEST_TIMEOUT_MS = 30000;
var PRISM_SETUP_MS = 2000;
var PRISM_STARTUP_MS = 20000;

before(function() {
  this.timeout(Math.max(PRISM_SETUP_MS + PRISM_STARTUP_MS, TEST_TIMEOUT_MS));
  if (!fs.existsSync('/usr/local/bin/prism')) {
    if (process.platform != 'win32') {
      try {
        execSync('test/prism.sh');
      }
      catch (e) {
        console.log(e.message);
        console.log('Error downloading the prism binary, you can try downloading directly here (https://github.com/stoplightio/prism/releases) and placing it in your /user/local/bin directory');
        process.exit(1);
      }
    }
    else {
      console.log('Please download the Windows binary (https://github.com/stoplightio/prism/releases) and place it in your /usr/local/bin directory');
      process.exit(1);
    }
  }
  console.log('Activating Prism (~20s)');
  prism = spawn('prism', ['run', '--mock', '--list', '--spec', 'https://raw.githubusercontent.com/sendgrid/sendgrid-oai/master/oai_stoplight.json'], { detached: true });
  console.log('Prism Started');
  sleep(PRISM_STARTUP_MS);
  prism.stdout.on('data', function(data) {
    console.log(data.toString());
  });
  prism.stderr.on('data', function(data) {
    console.log(data.toString());
  });
});

describe('test_access_settings_activity_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  var TEST_HOST = 'localhost'

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["limit"] = '1'

  request.method = 'GET'
  request.path = '/v3/access_settings/activity'
  request.headers['X-Mock'] = 200
  it('test_access_settings_activity_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_access_settings_whitelist_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
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
  request.method = 'POST'
  request.path = '/v3/access_settings/whitelist'
  request.headers['X-Mock'] = 201
  it('test_access_settings_whitelist_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_access_settings_whitelist_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/access_settings/whitelist'
  request.headers['X-Mock'] = 200
  it('test_access_settings_whitelist_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_access_settings_whitelist_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "ids": [
    1,
    2,
    3
  ]
};
  request.method = 'DELETE'
  request.path = '/v3/access_settings/whitelist'
  request.headers['X-Mock'] = 204
  it('test_access_settings_whitelist_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_access_settings_whitelist__rule_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/access_settings/whitelist/{rule_id}'
  request.headers['X-Mock'] = 200
  it('test_access_settings_whitelist__rule_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_access_settings_whitelist__rule_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/access_settings/whitelist/{rule_id}'
  request.headers['X-Mock'] = 204
  it('test_access_settings_whitelist__rule_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_alerts_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email_to": "example@example.com",
  "frequency": "daily",
  "type": "stats_notification"
};
  request.method = 'POST'
  request.path = '/v3/alerts'
  request.headers['X-Mock'] = 201
  it('test_alerts_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_alerts_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/alerts'
  request.headers['X-Mock'] = 200
  it('test_alerts_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_alerts__alert_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email_to": "example@example.com"
};
  request.method = 'PATCH'
  request.path = '/v3/alerts/{alert_id}'
  request.headers['X-Mock'] = 200
  it('test_alerts__alert_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_alerts__alert_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/alerts/{alert_id}'
  request.headers['X-Mock'] = 200
  it('test_alerts__alert_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_alerts__alert_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/alerts/{alert_id}'
  request.headers['X-Mock'] = 204
  it('test_alerts__alert_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_api_keys_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "My API Key",
  "sample": "data",
  "scopes": [
    "mail.send",
    "alerts.create",
    "alerts.read"
  ]
};
  request.method = 'POST'
  request.path = '/v3/api_keys'
  request.headers['X-Mock'] = 201
  it('test_api_keys_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_api_keys_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["limit"] = '1'

  request.method = 'GET'
  request.path = '/v3/api_keys'
  request.headers['X-Mock'] = 200
  it('test_api_keys_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_api_keys__api_key_id__put', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "A New Hope",
  "scopes": [
    "user.profile.read",
    "user.profile.update"
  ]
};
  request.method = 'PUT'
  request.path = '/v3/api_keys/{api_key_id}'
  request.headers['X-Mock'] = 200
  it('test_api_keys__api_key_id__put had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_api_keys__api_key_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "A New Hope"
};
  request.method = 'PATCH'
  request.path = '/v3/api_keys/{api_key_id}'
  request.headers['X-Mock'] = 200
  it('test_api_keys__api_key_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_api_keys__api_key_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/api_keys/{api_key_id}'
  request.headers['X-Mock'] = 200
  it('test_api_keys__api_key_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_api_keys__api_key_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/api_keys/{api_key_id}'
  request.headers['X-Mock'] = 204
  it('test_api_keys__api_key_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "description": "Suggestions for products our users might like.",
  "is_default": true,
  "name": "Product Suggestions"
};
  request.method = 'POST'
  request.path = '/v3/asm/groups'
  request.headers['X-Mock'] = 201
  it('test_asm_groups_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["id"] = '1'

  request.method = 'GET'
  request.path = '/v3/asm/groups'
  request.headers['X-Mock'] = 200
  it('test_asm_groups_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups__group_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "description": "Suggestions for items our users might like.",
  "id": 103,
  "name": "Item Suggestions"
};
  request.method = 'PATCH'
  request.path = '/v3/asm/groups/{group_id}'
  request.headers['X-Mock'] = 201
  it('test_asm_groups__group_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups__group_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/asm/groups/{group_id}'
  request.headers['X-Mock'] = 200
  it('test_asm_groups__group_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups__group_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/asm/groups/{group_id}'
  request.headers['X-Mock'] = 204
  it('test_asm_groups__group_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups__group_id__suppressions_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "recipient_emails": [
    "test1@example.com",
    "test2@example.com"
  ]
};
  request.method = 'POST'
  request.path = '/v3/asm/groups/{group_id}/suppressions'
  request.headers['X-Mock'] = 201
  it('test_asm_groups__group_id__suppressions_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups__group_id__suppressions_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/asm/groups/{group_id}/suppressions'
  request.headers['X-Mock'] = 200
  it('test_asm_groups__group_id__suppressions_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups__group_id__suppressions_search_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "recipient_emails": [
    "exists1@example.com",
    "exists2@example.com",
    "doesnotexists@example.com"
  ]
};
  request.method = 'POST'
  request.path = '/v3/asm/groups/{group_id}/suppressions/search'
  request.headers['X-Mock'] = 200
  it('test_asm_groups__group_id__suppressions_search_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_groups__group_id__suppressions__email__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/asm/groups/{group_id}/suppressions/{email}'
  request.headers['X-Mock'] = 204
  it('test_asm_groups__group_id__suppressions__email__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_suppressions_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/asm/suppressions'
  request.headers['X-Mock'] = 200
  it('test_asm_suppressions_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_suppressions_global_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "recipient_emails": [
    "test1@example.com",
    "test2@example.com"
  ]
};
  request.method = 'POST'
  request.path = '/v3/asm/suppressions/global'
  request.headers['X-Mock'] = 201
  it('test_asm_suppressions_global_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_suppressions_global__email__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/asm/suppressions/global/{email}'
  request.headers['X-Mock'] = 200
  it('test_asm_suppressions_global__email__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_suppressions_global__email__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/asm/suppressions/global/{email}'
  request.headers['X-Mock'] = 204
  it('test_asm_suppressions_global__email__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_asm_suppressions__email__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/asm/suppressions/{email}'
  request.headers['X-Mock'] = 200
  it('test_asm_suppressions__email__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_browsers_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["browsers"] = 'test_string'
  request.queryParams["limit"] = 'test_string'
  request.queryParams["offset"] = 'test_string'
  request.queryParams["start_date"] = '2016-01-01'

  request.method = 'GET'
  request.path = '/v3/browsers/stats'
  request.headers['X-Mock'] = 200
  it('test_browsers_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
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
  request.method = 'POST'
  request.path = '/v3/campaigns'
  request.headers['X-Mock'] = 201
  it('test_campaigns_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/campaigns'
  request.headers['X-Mock'] = 200
  it('test_campaigns_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "categories": [
    "summer line"
  ],
  "html_content": "<html><head><title></title></head><body><p>Check out our summer line!</p></body></html>",
  "plain_content": "Check out our summer line!",
  "subject": "New Products for Summer!",
  "title": "May Newsletter"
};
  request.method = 'PATCH'
  request.path = '/v3/campaigns/{campaign_id}'
  request.headers['X-Mock'] = 200
  it('test_campaigns__campaign_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/campaigns/{campaign_id}'
  request.headers['X-Mock'] = 200
  it('test_campaigns__campaign_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/campaigns/{campaign_id}'
  request.headers['X-Mock'] = 204
  it('test_campaigns__campaign_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__schedules_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "send_at": 1489451436
};
  request.method = 'PATCH'
  request.path = '/v3/campaigns/{campaign_id}/schedules'
  request.headers['X-Mock'] = 200
  it('test_campaigns__campaign_id__schedules_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__schedules_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "send_at": 1489771528
};
  request.method = 'POST'
  request.path = '/v3/campaigns/{campaign_id}/schedules'
  request.headers['X-Mock'] = 201
  it('test_campaigns__campaign_id__schedules_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__schedules_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/campaigns/{campaign_id}/schedules'
  request.headers['X-Mock'] = 200
  it('test_campaigns__campaign_id__schedules_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__schedules_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/campaigns/{campaign_id}/schedules'
  request.headers['X-Mock'] = 204
  it('test_campaigns__campaign_id__schedules_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__schedules_now_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'POST'
  request.path = '/v3/campaigns/{campaign_id}/schedules/now'
  request.headers['X-Mock'] = 201
  it('test_campaigns__campaign_id__schedules_now_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_campaigns__campaign_id__schedules_test_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "to": "your.email@example.com"
};
  request.method = 'POST'
  request.path = '/v3/campaigns/{campaign_id}/schedules/test'
  request.headers['X-Mock'] = 204
  it('test_campaigns__campaign_id__schedules_test_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_categories_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["category"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/categories'
  request.headers['X-Mock'] = 200
  it('test_categories_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_categories_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["categories"] = 'test_string'

  request.method = 'GET'
  request.path = '/v3/categories/stats'
  request.headers['X-Mock'] = 200
  it('test_categories_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_categories_stats_sums_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["sort_by_direction"] = 'asc'

  request.method = 'GET'
  request.path = '/v3/categories/stats/sums'
  request.headers['X-Mock'] = 200
  it('test_categories_stats_sums_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_clients_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'

  request.method = 'GET'
  request.path = '/v3/clients/stats'
  request.headers['X-Mock'] = 200
  it('test_clients_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_clients__client_type__stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'

  request.method = 'GET'
  request.path = '/v3/clients/{client_type}/stats'
  request.headers['X-Mock'] = 200
  it('test_clients__client_type__stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_custom_fields_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "pet",
  "type": "text"
};
  request.method = 'POST'
  request.path = '/v3/contactdb/custom_fields'
  request.headers['X-Mock'] = 201
  it('test_contactdb_custom_fields_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_custom_fields_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/custom_fields'
  request.headers['X-Mock'] = 200
  it('test_contactdb_custom_fields_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_custom_fields__custom_field_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/custom_fields/{custom_field_id}'
  request.headers['X-Mock'] = 200
  it('test_contactdb_custom_fields__custom_field_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_custom_fields__custom_field_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/contactdb/custom_fields/{custom_field_id}'
  request.headers['X-Mock'] = 202
  it('test_contactdb_custom_fields__custom_field_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 202, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "your list name"
};
  request.method = 'POST'
  request.path = '/v3/contactdb/lists'
  request.headers['X-Mock'] = 201
  it('test_contactdb_lists_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/lists'
  request.headers['X-Mock'] = 200
  it('test_contactdb_lists_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = [
  1,
  2,
  3,
  4
];
  request.method = 'DELETE'
  request.path = '/v3/contactdb/lists'
  request.headers['X-Mock'] = 204
  it('test_contactdb_lists_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists__list_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "newlistname"
};
  request.queryParams["list_id"] = '1'

  request.method = 'PATCH'
  request.path = '/v3/contactdb/lists/{list_id}'
  request.headers['X-Mock'] = 200
  it('test_contactdb_lists__list_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists__list_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["list_id"] = '1'

  request.method = 'GET'
  request.path = '/v3/contactdb/lists/{list_id}'
  request.headers['X-Mock'] = 200
  it('test_contactdb_lists__list_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists__list_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.queryParams["delete_contacts"] = 'true'

  request.method = 'DELETE'
  request.path = '/v3/contactdb/lists/{list_id}'
  request.headers['X-Mock'] = 202
  it('test_contactdb_lists__list_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 202, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists__list_id__recipients_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = [
  "recipient_id1",
  "recipient_id2"
];
  request.method = 'POST'
  request.path = '/v3/contactdb/lists/{list_id}/recipients'
  request.headers['X-Mock'] = 201
  it('test_contactdb_lists__list_id__recipients_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists__list_id__recipients_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["page"] = '1'
  request.queryParams["page_size"] = '1'
  request.queryParams["list_id"] = '1'

  request.method = 'GET'
  request.path = '/v3/contactdb/lists/{list_id}/recipients'
  request.headers['X-Mock'] = 200
  it('test_contactdb_lists__list_id__recipients_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists__list_id__recipients__recipient_id__post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'POST'
  request.path = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}'
  request.headers['X-Mock'] = 201
  it('test_contactdb_lists__list_id__recipients__recipient_id__post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_lists__list_id__recipients__recipient_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.queryParams["recipient_id"] = '1'
  request.queryParams["list_id"] = '1'

  request.method = 'DELETE'
  request.path = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}'
  request.headers['X-Mock'] = 204
  it('test_contactdb_lists__list_id__recipients__recipient_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = [
  {
    "email": "jones@example.com",
    "first_name": "Guy",
    "last_name": "Jones"
  }
];
  request.method = 'PATCH'
  request.path = '/v3/contactdb/recipients'
  request.headers['X-Mock'] = 201
  it('test_contactdb_recipients_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = [
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
  request.method = 'POST'
  request.path = '/v3/contactdb/recipients'
  request.headers['X-Mock'] = 201
  it('test_contactdb_recipients_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["page"] = '1'
  request.queryParams["page_size"] = '1'

  request.method = 'GET'
  request.path = '/v3/contactdb/recipients'
  request.headers['X-Mock'] = 200
  it('test_contactdb_recipients_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = [
  "recipient_id1",
  "recipient_id2"
];
  request.method = 'DELETE'
  request.path = '/v3/contactdb/recipients'
  request.headers['X-Mock'] = 200
  it('test_contactdb_recipients_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients_billable_count_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/recipients/billable_count'
  request.headers['X-Mock'] = 200
  it('test_contactdb_recipients_billable_count_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients_count_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/recipients/count'
  request.headers['X-Mock'] = 200
  it('test_contactdb_recipients_count_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients_search_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["%7Bfield_name%7D"] = 'test_string'
  request.queryParams["{field_name}"] = 'test_string'

  request.method = 'GET'
  request.path = '/v3/contactdb/recipients/search'
  request.headers['X-Mock'] = 200
  it('test_contactdb_recipients_search_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients__recipient_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/recipients/{recipient_id}'
  request.headers['X-Mock'] = 200
  it('test_contactdb_recipients__recipient_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients__recipient_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/contactdb/recipients/{recipient_id}'
  request.headers['X-Mock'] = 204
  it('test_contactdb_recipients__recipient_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_recipients__recipient_id__lists_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/recipients/{recipient_id}/lists'
  request.headers['X-Mock'] = 200
  it('test_contactdb_recipients__recipient_id__lists_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_reserved_fields_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/reserved_fields'
  request.headers['X-Mock'] = 200
  it('test_contactdb_reserved_fields_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_segments_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
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
  request.method = 'POST'
  request.path = '/v3/contactdb/segments'
  request.headers['X-Mock'] = 200
  it('test_contactdb_segments_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_segments_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/contactdb/segments'
  request.headers['X-Mock'] = 200
  it('test_contactdb_segments_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_segments__segment_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
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
  request.queryParams["segment_id"] = 'test_string'

  request.method = 'PATCH'
  request.path = '/v3/contactdb/segments/{segment_id}'
  request.headers['X-Mock'] = 200
  it('test_contactdb_segments__segment_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_segments__segment_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["segment_id"] = '1'

  request.method = 'GET'
  request.path = '/v3/contactdb/segments/{segment_id}'
  request.headers['X-Mock'] = 200
  it('test_contactdb_segments__segment_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_segments__segment_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.queryParams["delete_contacts"] = 'true'

  request.method = 'DELETE'
  request.path = '/v3/contactdb/segments/{segment_id}'
  request.headers['X-Mock'] = 204
  it('test_contactdb_segments__segment_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_contactdb_segments__segment_id__recipients_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["page"] = '1'
  request.queryParams["page_size"] = '1'

  request.method = 'GET'
  request.path = '/v3/contactdb/segments/{segment_id}/recipients'
  request.headers['X-Mock'] = 200
  it('test_contactdb_segments__segment_id__recipients_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_devices_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/devices/stats'
  request.headers['X-Mock'] = 200
  it('test_devices_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_geo_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["country"] = 'US'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'

  request.method = 'GET'
  request.path = '/v3/geo/stats'
  request.headers['X-Mock'] = 200
  it('test_geo_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["subuser"] = 'test_string'
  request.queryParams["ip"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["exclude_whitelabels"] = 'true'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/ips'
  request.headers['X-Mock'] = 200
  it('test_ips_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_assigned_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/ips/assigned'
  request.headers['X-Mock'] = 200
  it('test_ips_assigned_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_pools_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "marketing"
};
  request.method = 'POST'
  request.path = '/v3/ips/pools'
  request.headers['X-Mock'] = 200
  it('test_ips_pools_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_pools_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/ips/pools'
  request.headers['X-Mock'] = 200
  it('test_ips_pools_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_pools__pool_name__put', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "new_pool_name"
};
  request.method = 'PUT'
  request.path = '/v3/ips/pools/{pool_name}'
  request.headers['X-Mock'] = 200
  it('test_ips_pools__pool_name__put had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_pools__pool_name__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/ips/pools/{pool_name}'
  request.headers['X-Mock'] = 200
  it('test_ips_pools__pool_name__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_pools__pool_name__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/ips/pools/{pool_name}'
  request.headers['X-Mock'] = 204
  it('test_ips_pools__pool_name__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_pools__pool_name__ips_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "ip": "0.0.0.0"
};
  request.method = 'POST'
  request.path = '/v3/ips/pools/{pool_name}/ips'
  request.headers['X-Mock'] = 201
  it('test_ips_pools__pool_name__ips_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_pools__pool_name__ips__ip__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/ips/pools/{pool_name}/ips/{ip}'
  request.headers['X-Mock'] = 204
  it('test_ips_pools__pool_name__ips__ip__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_warmup_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "ip": "0.0.0.0"
};
  request.method = 'POST'
  request.path = '/v3/ips/warmup'
  request.headers['X-Mock'] = 200
  it('test_ips_warmup_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_warmup_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/ips/warmup'
  request.headers['X-Mock'] = 200
  it('test_ips_warmup_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_warmup__ip_address__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/ips/warmup/{ip_address}'
  request.headers['X-Mock'] = 200
  it('test_ips_warmup__ip_address__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips_warmup__ip_address__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/ips/warmup/{ip_address}'
  request.headers['X-Mock'] = 204
  it('test_ips_warmup__ip_address__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_ips__ip_address__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/ips/{ip_address}'
  request.headers['X-Mock'] = 200
  it('test_ips__ip_address__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_batch_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'POST'
  request.path = '/v3/mail/batch'
  request.headers['X-Mock'] = 201
  it('test_mail_batch_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_batch__batch_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail/batch/{batch_id}'
  request.headers['X-Mock'] = 200
  it('test_mail_batch__batch_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_send_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "asm": {
    "group_id": 1,
    "groups_to_display": [
      1,
      2,
      3
    ]
  },
  "attachments": [
    {
      "content": "[BASE64 encoded content block here]",
      "content_id": "ii_139db99fdb5c3704",
      "disposition": "inline",
      "filename": "file1.jpg",
      "name": "file1",
      "type": "jpg"
    }
  ],
  "batch_id": "[YOUR BATCH ID GOES HERE]",
  "categories": [
    "category1",
    "category2"
  ],
  "content": [
    {
      "type": "text/html",
      "value": "<html><p>Hello, world!</p><img src=[CID GOES HERE]></img></html>"
    }
  ],
  "custom_args": {
    "New Argument 1": "New Value 1",
    "activationAttempt": "1",
    "customerAccountNumber": "[CUSTOMER ACCOUNT NUMBER GOES HERE]"
  },
  "from": {
    "email": "sam.smith@example.com",
    "name": "Sam Smith"
  },
  "headers": {},
  "ip_pool_name": "[YOUR POOL NAME GOES HERE]",
  "mail_settings": {
    "bcc": {
      "email": "ben.doe@example.com",
      "enable": true
    },
    "bypass_list_management": {
      "enable": true
    },
    "footer": {
      "enable": true,
      "html": "<p>Thanks</br>The SendGrid Team</p>",
      "text": "Thanks,/n The SendGrid Team"
    },
    "sandbox_mode": {
      "enable": false
    },
    "spam_check": {
      "enable": true,
      "post_to_url": "http://example.com/compliance",
      "threshold": 3
    }
  },
  "personalizations": [
    {
      "bcc": [
        {
          "email": "sam.doe@example.com",
          "name": "Sam Doe"
        }
      ],
      "cc": [
        {
          "email": "jane.doe@example.com",
          "name": "Jane Doe"
        }
      ],
      "custom_args": {
        "New Argument 1": "New Value 1",
        "activationAttempt": "1",
        "customerAccountNumber": "[CUSTOMER ACCOUNT NUMBER GOES HERE]"
      },
      "headers": {
        "X-Accept-Language": "en",
        "X-Mailer": "MyApp"
      },
      "send_at": 1409348513,
      "subject": "Hello, World!",
      "substitutions": {
        "id": "substitutions",
        "type": "object"
      },
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
  "sections": {
    "section": {
      ":sectionName1": "section 1 text",
      ":sectionName2": "section 2 text"
    }
  },
  "send_at": 1409348513,
  "subject": "Hello, World!",
  "template_id": "[YOUR TEMPLATE ID GOES HERE]",
  "tracking_settings": {
    "click_tracking": {
      "enable": true,
      "enable_text": true
    },
    "ganalytics": {
      "enable": true,
      "utm_campaign": "[NAME OF YOUR REFERRER SOURCE]",
      "utm_content": "[USE THIS SPACE TO DIFFERENTIATE YOUR EMAIL FROM ADS]",
      "utm_medium": "[NAME OF YOUR MARKETING MEDIUM e.g. email]",
      "utm_name": "[NAME OF YOUR CAMPAIGN]",
      "utm_term": "[IDENTIFY PAID KEYWORDS HERE]"
    },
    "open_tracking": {
      "enable": true,
      "substitution_tag": "%opentrack"
    },
    "subscription_tracking": {
      "enable": true,
      "html": "If you would like to unsubscribe and stop receiving these emails <% clickhere %>.",
      "substitution_tag": "<%click here%>",
      "text": "If you would like to unsubscribe and stop receiveing these emails <% click here %>."
    }
  }
};
  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.headers['X-Mock'] = 202
  it('test_mail_send_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 202, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/mail_settings'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_address_whitelist_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true,
  "list": [
    "email1@example.com",
    "example.com"
  ]
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/address_whitelist'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_address_whitelist_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_address_whitelist_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/address_whitelist'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_address_whitelist_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_bcc_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email": "email@example.com",
  "enabled": false
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/bcc'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_bcc_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_bcc_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/bcc'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_bcc_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_bounce_purge_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true,
  "hard_bounces": 5,
  "soft_bounces": 5
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/bounce_purge'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_bounce_purge_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_bounce_purge_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/bounce_purge'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_bounce_purge_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_footer_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true,
  "html_content": "...",
  "plain_content": "..."
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/footer'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_footer_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_footer_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/footer'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_footer_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_forward_bounce_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email": "example@example.com",
  "enabled": true
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/forward_bounce'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_forward_bounce_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_forward_bounce_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/forward_bounce'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_forward_bounce_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_forward_spam_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email": "",
  "enabled": false
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/forward_spam'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_forward_spam_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_forward_spam_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/forward_spam'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_forward_spam_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_plain_content_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": false
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/plain_content'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_plain_content_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_plain_content_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/plain_content'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_plain_content_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_spam_check_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true,
  "max_score": 5,
  "url": "url"
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/spam_check'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_spam_check_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_spam_check_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/spam_check'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_spam_check_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_template_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true,
  "html_content": "<% body %>"
};
  request.method = 'PATCH'
  request.path = '/v3/mail_settings/template'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_template_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mail_settings_template_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/mail_settings/template'
  request.headers['X-Mock'] = 200
  it('test_mail_settings_template_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_mailbox_providers_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["mailbox_providers"] = 'test_string'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'

  request.method = 'GET'
  request.path = '/v3/mailbox_providers/stats'
  request.headers['X-Mock'] = 200
  it('test_mailbox_providers_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_partner_settings_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/partner_settings'
  request.headers['X-Mock'] = 200
  it('test_partner_settings_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_partner_settings_new_relic_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enable_subuser_statistics": true,
  "enabled": true,
  "license_key": ""
};
  request.method = 'PATCH'
  request.path = '/v3/partner_settings/new_relic'
  request.headers['X-Mock'] = 200
  it('test_partner_settings_new_relic_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_partner_settings_new_relic_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/partner_settings/new_relic'
  request.headers['X-Mock'] = 200
  it('test_partner_settings_new_relic_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_scopes_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/scopes'
  request.headers['X-Mock'] = 200
  it('test_scopes_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/stats'
  request.headers['X-Mock'] = 200
  it('test_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email": "John@example.com",
  "ips": [
    "1.1.1.1",
    "2.2.2.2"
  ],
  "password": "johns_password",
  "username": "John@example.com"
};
  request.method = 'POST'
  request.path = '/v3/subusers'
  request.headers['X-Mock'] = 200
  it('test_subusers_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["username"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/subusers'
  request.headers['X-Mock'] = 200
  it('test_subusers_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers_reputations_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["usernames"] = 'test_string'

  request.method = 'GET'
  request.path = '/v3/subusers/reputations'
  request.headers['X-Mock'] = 200
  it('test_subusers_reputations_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["subusers"] = 'test_string'

  request.method = 'GET'
  request.path = '/v3/subusers/stats'
  request.headers['X-Mock'] = 200
  it('test_subusers_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers_stats_monthly_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["subuser"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'
  request.queryParams["date"] = 'test_string'
  request.queryParams["sort_by_direction"] = 'asc'

  request.method = 'GET'
  request.path = '/v3/subusers/stats/monthly'
  request.headers['X-Mock'] = 200
  it('test_subusers_stats_monthly_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers_stats_sums_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["sort_by_direction"] = 'asc'

  request.method = 'GET'
  request.path = '/v3/subusers/stats/sums'
  request.headers['X-Mock'] = 200
  it('test_subusers_stats_sums_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "disabled": false
};
  request.method = 'PATCH'
  request.path = '/v3/subusers/{subuser_name}'
  request.headers['X-Mock'] = 204
  it('test_subusers__subuser_name__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/subusers/{subuser_name}'
  request.headers['X-Mock'] = 204
  it('test_subusers__subuser_name__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__ips_put', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = [
  "127.0.0.1"
];
  request.method = 'PUT'
  request.path = '/v3/subusers/{subuser_name}/ips'
  request.headers['X-Mock'] = 200
  it('test_subusers__subuser_name__ips_put had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__monitor_put', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email": "example@example.com",
  "frequency": 500
};
  request.method = 'PUT'
  request.path = '/v3/subusers/{subuser_name}/monitor'
  request.headers['X-Mock'] = 200
  it('test_subusers__subuser_name__monitor_put had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__monitor_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email": "example@example.com",
  "frequency": 50000
};
  request.method = 'POST'
  request.path = '/v3/subusers/{subuser_name}/monitor'
  request.headers['X-Mock'] = 200
  it('test_subusers__subuser_name__monitor_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__monitor_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/subusers/{subuser_name}/monitor'
  request.headers['X-Mock'] = 200
  it('test_subusers__subuser_name__monitor_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__monitor_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/subusers/{subuser_name}/monitor'
  request.headers['X-Mock'] = 204
  it('test_subusers__subuser_name__monitor_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_subusers__subuser_name__stats_monthly_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["date"] = 'test_string'
  request.queryParams["sort_by_direction"] = 'asc'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/subusers/{subuser_name}/stats/monthly'
  request.headers['X-Mock'] = 200
  it('test_subusers__subuser_name__stats_monthly_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_blocks_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/suppression/blocks'
  request.headers['X-Mock'] = 200
  it('test_suppression_blocks_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_blocks_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "delete_all": false,
  "emails": [
    "example1@example.com",
    "example2@example.com"
  ]
};
  request.method = 'DELETE'
  request.path = '/v3/suppression/blocks'
  request.headers['X-Mock'] = 204
  it('test_suppression_blocks_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_blocks__email__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/suppression/blocks/{email}'
  request.headers['X-Mock'] = 200
  it('test_suppression_blocks__email__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_blocks__email__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/suppression/blocks/{email}'
  request.headers['X-Mock'] = 204
  it('test_suppression_blocks__email__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_bounces_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["start_time"] = '1'
  request.queryParams["end_time"] = '1'

  request.method = 'GET'
  request.path = '/v3/suppression/bounces'
  request.headers['X-Mock'] = 200
  it('test_suppression_bounces_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_bounces_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "delete_all": true,
  "emails": [
    "example@example.com",
    "example2@example.com"
  ]
};
  request.method = 'DELETE'
  request.path = '/v3/suppression/bounces'
  request.headers['X-Mock'] = 204
  it('test_suppression_bounces_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_bounces__email__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/suppression/bounces/{email}'
  request.headers['X-Mock'] = 200
  it('test_suppression_bounces__email__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_bounces__email__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.queryParams["email_address"] = 'example@example.com'

  request.method = 'DELETE'
  request.path = '/v3/suppression/bounces/{email}'
  request.headers['X-Mock'] = 204
  it('test_suppression_bounces__email__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_invalid_emails_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/suppression/invalid_emails'
  request.headers['X-Mock'] = 200
  it('test_suppression_invalid_emails_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_invalid_emails_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "delete_all": false,
  "emails": [
    "example1@example.com",
    "example2@example.com"
  ]
};
  request.method = 'DELETE'
  request.path = '/v3/suppression/invalid_emails'
  request.headers['X-Mock'] = 204
  it('test_suppression_invalid_emails_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_invalid_emails__email__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/suppression/invalid_emails/{email}'
  request.headers['X-Mock'] = 200
  it('test_suppression_invalid_emails__email__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_invalid_emails__email__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/suppression/invalid_emails/{email}'
  request.headers['X-Mock'] = 204
  it('test_suppression_invalid_emails__email__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_spam_report__email__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/suppression/spam_reports/{email}'
  request.headers['X-Mock'] = 200
  it('test_suppression_spam_reports__email__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_spam_report__email__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/suppression/spam_report/{email}'
  request.headers['X-Mock'] = 204
  it('test_suppression_spam_report__email__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_spam_reports_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/suppression/spam_reports'
  request.headers['X-Mock'] = 200
  it('test_suppression_spam_reports_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_spam_reports_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "delete_all": false,
  "emails": [
    "example1@example.com",
    "example2@example.com"
  ]
};
  request.method = 'DELETE'
  request.path = '/v3/suppression/spam_reports'
  request.headers['X-Mock'] = 204
  it('test_suppression_spam_reports_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_suppression_unsubscribes_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/suppression/unsubscribes'
  request.headers['X-Mock'] = 200
  it('test_suppression_unsubscribes_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "example_name"
};
  request.method = 'POST'
  request.path = '/v3/templates'
  request.headers['X-Mock'] = 201
  it('test_templates_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/templates'
  request.headers['X-Mock'] = 200
  it('test_templates_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "name": "new_example_name"
};
  request.method = 'PATCH'
  request.path = '/v3/templates/{template_id}'
  request.headers['X-Mock'] = 200
  it('test_templates__template_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/templates/{template_id}'
  request.headers['X-Mock'] = 200
  it('test_templates__template_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/templates/{template_id}'
  request.headers['X-Mock'] = 204
  it('test_templates__template_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__versions_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "active": 1,
  "html_content": "<%body%>",
  "name": "example_version_name",
  "plain_content": "<%body%>",
  "subject": "<%subject%>",
  "template_id": "ddb96bbc-9b92-425e-8979-99464621b543"
};
  request.method = 'POST'
  request.path = '/v3/templates/{template_id}/versions'
  request.headers['X-Mock'] = 201
  it('test_templates__template_id__versions_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__versions__version_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "active": 1,
  "html_content": "<%body%>",
  "name": "updated_example_name",
  "plain_content": "<%body%>",
  "subject": "<%subject%>"
};
  request.method = 'PATCH'
  request.path = '/v3/templates/{template_id}/versions/{version_id}'
  request.headers['X-Mock'] = 200
  it('test_templates__template_id__versions__version_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__versions__version_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/templates/{template_id}/versions/{version_id}'
  request.headers['X-Mock'] = 200
  it('test_templates__template_id__versions__version_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__versions__version_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/templates/{template_id}/versions/{version_id}'
  request.headers['X-Mock'] = 204
  it('test_templates__template_id__versions__version_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_templates__template_id__versions__version_id__activate_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'POST'
  request.path = '/v3/templates/{template_id}/versions/{version_id}/activate'
  request.headers['X-Mock'] = 200
  it('test_templates__template_id__versions__version_id__activate_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/tracking_settings'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_click_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true
};
  request.method = 'PATCH'
  request.path = '/v3/tracking_settings/click'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_click_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_click_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/tracking_settings/click'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_click_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_google_analytics_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true,
  "utm_campaign": "website",
  "utm_content": "",
  "utm_medium": "email",
  "utm_source": "sendgrid.com",
  "utm_term": ""
};
  request.method = 'PATCH'
  request.path = '/v3/tracking_settings/google_analytics'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_google_analytics_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_google_analytics_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/tracking_settings/google_analytics'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_google_analytics_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_open_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true
};
  request.method = 'PATCH'
  request.path = '/v3/tracking_settings/open'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_open_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_open_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/tracking_settings/open'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_open_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_subscription_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "enabled": true,
  "html_content": "html content",
  "landing": "landing page html",
  "plain_content": "text content",
  "replace": "replacement tag",
  "url": "url"
};
  request.method = 'PATCH'
  request.path = '/v3/tracking_settings/subscription'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_subscription_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_tracking_settings_subscription_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/tracking_settings/subscription'
  request.headers['X-Mock'] = 200
  it('test_tracking_settings_subscription_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_account_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/account'
  request.headers['X-Mock'] = 200
  it('test_user_account_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_credits_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/credits'
  request.headers['X-Mock'] = 200
  it('test_user_credits_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_email_put', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "email": "example@example.com"
};
  request.method = 'PUT'
  request.path = '/v3/user/email'
  request.headers['X-Mock'] = 200
  it('test_user_email_put had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_email_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/email'
  request.headers['X-Mock'] = 200
  it('test_user_email_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_password_put', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "new_password": "new_password",
  "old_password": "old_password"
};
  request.method = 'PUT'
  request.path = '/v3/user/password'
  request.headers['X-Mock'] = 200
  it('test_user_password_put had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_profile_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "city": "Orange",
  "first_name": "Example",
  "last_name": "User"
};
  request.method = 'PATCH'
  request.path = '/v3/user/profile'
  request.headers['X-Mock'] = 200
  it('test_user_profile_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_profile_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/profile'
  request.headers['X-Mock'] = 200
  it('test_user_profile_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_scheduled_sends_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "batch_id": "YOUR_BATCH_ID",
  "status": "pause"
};
  request.method = 'POST'
  request.path = '/v3/user/scheduled_sends'
  request.headers['X-Mock'] = 201
  it('test_user_scheduled_sends_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_scheduled_sends_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/scheduled_sends'
  request.headers['X-Mock'] = 200
  it('test_user_scheduled_sends_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_scheduled_sends__batch_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "status": "pause"
};
  request.method = 'PATCH'
  request.path = '/v3/user/scheduled_sends/{batch_id}'
  request.headers['X-Mock'] = 204
  it('test_user_scheduled_sends__batch_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_scheduled_sends__batch_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/scheduled_sends/{batch_id}'
  request.headers['X-Mock'] = 200
  it('test_user_scheduled_sends__batch_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_scheduled_sends__batch_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/user/scheduled_sends/{batch_id}'
  request.headers['X-Mock'] = 204
  it('test_user_scheduled_sends__batch_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_settings_enforced_tls_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "require_tls": true,
  "require_valid_cert": false
};
  request.method = 'PATCH'
  request.path = '/v3/user/settings/enforced_tls'
  request.headers['X-Mock'] = 200
  it('test_user_settings_enforced_tls_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_settings_enforced_tls_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/settings/enforced_tls'
  request.headers['X-Mock'] = 200
  it('test_user_settings_enforced_tls_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_username_put', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "username": "test_username"
};
  request.method = 'PUT'
  request.path = '/v3/user/username'
  request.headers['X-Mock'] = 200
  it('test_user_username_put had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_username_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/username'
  request.headers['X-Mock'] = 200
  it('test_user_username_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_event_settings_patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
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
  request.method = 'PATCH'
  request.path = '/v3/user/webhooks/event/settings'
  request.headers['X-Mock'] = 200
  it('test_user_webhooks_event_settings_patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_event_settings_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/webhooks/event/settings'
  request.headers['X-Mock'] = 200
  it('test_user_webhooks_event_settings_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_event_test_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "url": "url"
};
  request.method = 'POST'
  request.path = '/v3/user/webhooks/event/test'
  request.headers['X-Mock'] = 204
  it('test_user_webhooks_event_test_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_parse_settings_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "hostname": "myhostname.com",
  "send_raw": false,
  "spam_check": true,
  "url": "http://email.myhosthame.com"
};
  request.method = 'POST'
  request.path = '/v3/user/webhooks/parse/settings'
  request.headers['X-Mock'] = 201
  it('test_user_webhooks_parse_settings_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_parse_settings_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/webhooks/parse/settings'
  request.headers['X-Mock'] = 200
  it('test_user_webhooks_parse_settings_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_parse_settings__hostname__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "send_raw": true,
  "spam_check": false,
  "url": "http://newdomain.com/parse"
};
  request.method = 'PATCH'
  request.path = '/v3/user/webhooks/parse/settings/{hostname}'
  request.headers['X-Mock'] = 200
  it('test_user_webhooks_parse_settings__hostname__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_parse_settings__hostname__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/user/webhooks/parse/settings/{hostname}'
  request.headers['X-Mock'] = 200
  it('test_user_webhooks_parse_settings__hostname__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_parse_settings__hostname__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/user/webhooks/parse/settings/{hostname}'
  request.headers['X-Mock'] = 204
  it('test_user_webhooks_parse_settings__hostname__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_user_webhooks_parse_stats_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = 'test_string'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["offset"] = 'test_string'

  request.method = 'GET'
  request.path = '/v3/user/webhooks/parse/stats'
  request.headers['X-Mock'] = 200
  it('test_user_webhooks_parse_stats_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
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
  request.method = 'POST'
  request.path = '/v3/whitelabel/domains'
  request.headers['X-Mock'] = 201
  it('test_whitelabel_domains_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["username"] = 'test_string'
  request.queryParams["domain"] = 'test_string'
  request.queryParams["exclude_subusers"] = 'true'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/whitelabel/domains'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains_default_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/whitelabel/domains/default'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains_default_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains_subuser_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/whitelabel/domains/subuser'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains_subuser_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains_subuser_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/whitelabel/domains/subuser'
  request.headers['X-Mock'] = 204
  it('test_whitelabel_domains_subuser_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains__domain_id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "custom_spf": true,
  "default": false
};
  request.method = 'PATCH'
  request.path = '/v3/whitelabel/domains/{domain_id}'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains__domain_id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains__domain_id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/whitelabel/domains/{domain_id}'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains__domain_id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains__domain_id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/whitelabel/domains/{domain_id}'
  request.headers['X-Mock'] = 204
  it('test_whitelabel_domains__domain_id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains__domain_id__subuser_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "username": "jane@example.com"
};
  request.method = 'POST'
  request.path = '/v3/whitelabel/domains/{domain_id}/subuser'
  request.headers['X-Mock'] = 201
  it('test_whitelabel_domains__domain_id__subuser_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains__id__ips_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "ip": "192.168.0.1"
};
  request.method = 'POST'
  request.path = '/v3/whitelabel/domains/{id}/ips'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains__id__ips_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains__id__ips__ip__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/whitelabel/domains/{id}/ips/{ip}'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains__id__ips__ip__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_domains__id__validate_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'POST'
  request.path = '/v3/whitelabel/domains/{id}/validate'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_domains__id__validate_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_ips_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "domain": "example.com",
  "ip": "192.168.1.1",
  "subdomain": "email"
};
  request.method = 'POST'
  request.path = '/v3/whitelabel/ips'
  request.headers['X-Mock'] = 201
  it('test_whitelabel_ips_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_ips_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["ip"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'GET'
  request.path = '/v3/whitelabel/ips'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_ips_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_ips__id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/whitelabel/ips/{id}'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_ips__id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_ips__id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/whitelabel/ips/{id}'
  request.headers['X-Mock'] = 204
  it('test_whitelabel_ips__id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_ips__id__validate_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'POST'
  request.path = '/v3/whitelabel/ips/{id}/validate'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_ips__id__validate_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "default": true,
  "domain": "example.com",
  "subdomain": "mail"
};
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'

  request.method = 'POST'
  request.path = '/v3/whitelabel/links'
  request.headers['X-Mock'] = 201
  it('test_whitelabel_links_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 201, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["limit"] = '1'

  request.method = 'GET'
  request.path = '/v3/whitelabel/links'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_links_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links_default_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["domain"] = 'test_string'

  request.method = 'GET'
  request.path = '/v3/whitelabel/links/default'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_links_default_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links_subuser_get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.queryParams["username"] = 'test_string'

  request.method = 'GET'
  request.path = '/v3/whitelabel/links/subuser'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_links_subuser_get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links_subuser_delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.queryParams["username"] = 'test_string'

  request.method = 'DELETE'
  request.path = '/v3/whitelabel/links/subuser'
  request.headers['X-Mock'] = 204
  it('test_whitelabel_links_subuser_delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links__id__patch', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "default": true
};
  request.method = 'PATCH'
  request.path = '/v3/whitelabel/links/{id}'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_links__id__patch had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links__id__get', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.method = 'GET'
  request.path = '/v3/whitelabel/links/{id}'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_links__id__get had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links__id__delete', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'DELETE'
  request.path = '/v3/whitelabel/links/{id}'
  request.headers['X-Mock'] = 204
  it('test_whitelabel_links__id__delete had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 204, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links__id__validate_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = null;
  request.method = 'POST'
  request.path = '/v3/whitelabel/links/{id}/validate'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_links__id__validate_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

describe('test_whitelabel_links__link_id__subuser_post', function () {
  this.timeout(TEST_TIMEOUT_MS);
  var API_KEY = 'SendGrid API Key'
  if(process.env.TRAVIS) {
    var TEST_HOST = process.env.MOCK_HOST
  } else {
    var TEST_HOST = 'localhost'
  }

  var sg = sendgrid(API_KEY, TEST_HOST)

  var request = sg.emptyRequest()
  if(TEST_HOST == 'localhost') {
    request.test = true
    request.port = 4010
  }
  request.body = {
  "username": "jane@example.com"
};
  request.method = 'POST'
  request.path = '/v3/whitelabel/links/{link_id}/subuser'
  request.headers['X-Mock'] = 200
  it('test_whitelabel_links__link_id__subuser_post had the correct response code', function(done) {
    sg.API(request, function (error, response) {
      assert.equal(response.statusCode, 200, 'response code is not correct')
      done();
    })
  });
})

after(function() {
  prism.kill();
})
