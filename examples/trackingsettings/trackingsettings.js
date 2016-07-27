var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve Tracking Settings
// GET /tracking_settings


var request = sg.emptyRequest()
request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/tracking_settings'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Click Tracking Settings
// PATCH /tracking_settings/click


var request = sg.emptyRequest()
request.body = {
  "enabled": true
};
request.method = 'PATCH'
request.path = '/v3/tracking_settings/click'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve Click Track Settings
// GET /tracking_settings/click


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/tracking_settings/click'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Google Analytics Settings
// PATCH /tracking_settings/google_analytics


var request = sg.emptyRequest()
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
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve Google Analytics Settings
// GET /tracking_settings/google_analytics


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/tracking_settings/google_analytics'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Open Tracking Settings
// PATCH /tracking_settings/open


var request = sg.emptyRequest()
request.body = {
  "enabled": true
};
request.method = 'PATCH'
request.path = '/v3/tracking_settings/open'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Get Open Tracking Settings
// GET /tracking_settings/open


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/tracking_settings/open'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Subscription Tracking Settings
// PATCH /tracking_settings/subscription


var request = sg.emptyRequest()
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
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve Subscription Tracking Settings
// GET /tracking_settings/subscription


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/tracking_settings/subscription'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

