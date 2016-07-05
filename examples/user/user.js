var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Get a user's account information.
// GET /user/account


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/account'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve your credit balance
// GET /user/credits


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/credits'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update your account email address
// PUT /user/email


var request = sg.emptyRequest()
request.body = {
  "email": "example@example.com"
};
request.method = 'PUT'
request.path = '/v3/user/email'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve your account email address
// GET /user/email


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/email'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update your password
// PUT /user/password


var request = sg.emptyRequest()
request.body = {
  "new_password": "new_password", 
  "old_password": "old_password"
};
request.method = 'PUT'
request.path = '/v3/user/password'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a user's profile
// PATCH /user/profile


var request = sg.emptyRequest()
request.body = {
  "city": "Orange", 
  "first_name": "Example", 
  "last_name": "User"
};
request.method = 'PATCH'
request.path = '/v3/user/profile'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Get a user's profile
// GET /user/profile


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/profile'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Cancel or pause a scheduled send
// POST /user/scheduled_sends


var request = sg.emptyRequest()
request.body = {
  "batch_id": "YOUR_BATCH_ID", 
  "status": "pause"
};
request.method = 'POST'
request.path = '/v3/user/scheduled_sends'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all scheduled sends
// GET /user/scheduled_sends


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/scheduled_sends'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update user scheduled send information
// PATCH /user/scheduled_sends/{batch_id}


var request = sg.emptyRequest()
request.body = {
  "status": "pause"
};
request.method = 'PATCH'
request.path = '/v3/user/scheduled_sends/{batch_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve scheduled send
// GET /user/scheduled_sends/{batch_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/scheduled_sends/{batch_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a cancellation or pause of a scheduled send
// DELETE /user/scheduled_sends/{batch_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/user/scheduled_sends/{batch_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Enforced TLS settings
// PATCH /user/settings/enforced_tls


var request = sg.emptyRequest()
request.body = {
  "require_tls": true, 
  "require_valid_cert": false
};
request.method = 'PATCH'
request.path = '/v3/user/settings/enforced_tls'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve current Enforced TLS settings.
// GET /user/settings/enforced_tls


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/settings/enforced_tls'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update your username
// PUT /user/username


var request = sg.emptyRequest()
request.body = {
  "username": "test_username"
};
request.method = 'PUT'
request.path = '/v3/user/username'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve your username
// GET /user/username


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/username'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Event Notification Settings
// PATCH /user/webhooks/event/settings


var request = sg.emptyRequest()
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
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve Event Webhook settings
// GET /user/webhooks/event/settings


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/webhooks/event/settings'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Test Event Notification Settings 
// POST /user/webhooks/event/test


var request = sg.emptyRequest()
request.body = {
  "url": "url"
};
request.method = 'POST'
request.path = '/v3/user/webhooks/event/test'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create a parse setting
// POST /user/webhooks/parse/settings


var request = sg.emptyRequest()
request.body = {
  "hostname": "myhostname.com", 
  "send_raw": false, 
  "spam_check": true, 
  "url": "http://email.myhosthame.com"
};
request.method = 'POST'
request.path = '/v3/user/webhooks/parse/settings'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all parse settings
// GET /user/webhooks/parse/settings


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/webhooks/parse/settings'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a parse setting
// PATCH /user/webhooks/parse/settings/{hostname}


var request = sg.emptyRequest()
request.body = {
  "send_raw": true, 
  "spam_check": false, 
  "url": "http://newdomain.com/parse"
};
request.method = 'PATCH'
request.path = '/v3/user/webhooks/parse/settings/{hostname}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a specific parse setting
// GET /user/webhooks/parse/settings/{hostname}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/user/webhooks/parse/settings/{hostname}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a parse setting
// DELETE /user/webhooks/parse/settings/{hostname}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/user/webhooks/parse/settings/{hostname}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieves Inbound Parse Webhook statistics.
// GET /user/webhooks/parse/stats


var request = sg.emptyRequest()
request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = 'test_string'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["offset"] = 'test_string'
 
request.method = 'GET'
request.path = '/v3/user/webhooks/parse/stats'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

