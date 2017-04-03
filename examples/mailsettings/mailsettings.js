var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve all mail settings
// GET /mail_settings


var request = sg.emptyRequest()
request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/mail_settings'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update address whitelist mail settings
// PATCH /mail_settings/address_whitelist


var request = sg.emptyRequest()
request.body = {
  "enabled": true, 
  "list": [
    "email1@example.com", 
    "example.com"
  ]
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/address_whitelist'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve address whitelist mail settings
// GET /mail_settings/address_whitelist


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/address_whitelist'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update BCC mail settings
// PATCH /mail_settings/bcc


var request = sg.emptyRequest()
request.body = {
  "email": "email@example.com", 
  "enabled": false
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/bcc'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all BCC mail settings
// GET /mail_settings/bcc


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/bcc'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update bounce purge mail settings
// PATCH /mail_settings/bounce_purge


var request = sg.emptyRequest()
request.body = {
  "enabled": true, 
  "hard_bounces": 5, 
  "soft_bounces": 5
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/bounce_purge'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve bounce purge mail settings
// GET /mail_settings/bounce_purge


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/bounce_purge'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update footer mail settings
// PATCH /mail_settings/footer


var request = sg.emptyRequest()
request.body = {
  "enabled": true, 
  "html_content": "...", 
  "plain_content": "..."
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/footer'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve footer mail settings
// GET /mail_settings/footer


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/footer'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update forward bounce mail settings
// PATCH /mail_settings/forward_bounce


var request = sg.emptyRequest()
request.body = {
  "email": "example@example.com", 
  "enabled": true
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/forward_bounce'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve forward bounce mail settings
// GET /mail_settings/forward_bounce


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/forward_bounce'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update forward spam mail settings
// PATCH /mail_settings/forward_spam


var request = sg.emptyRequest()
request.body = {
  "email": "", 
  "enabled": false
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/forward_spam'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve forward spam mail settings
// GET /mail_settings/forward_spam


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/forward_spam'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update plain content mail settings
// PATCH /mail_settings/plain_content


var request = sg.emptyRequest()
request.body = {
  "enabled": false
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/plain_content'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve plain content mail settings
// GET /mail_settings/plain_content


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/plain_content'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update spam check mail settings
// PATCH /mail_settings/spam_check


var request = sg.emptyRequest()
request.body = {
  "enabled": true, 
  "max_score": 5, 
  "url": "url"
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/spam_check'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve spam check mail settings
// GET /mail_settings/spam_check


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/spam_check'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update template mail settings
// PATCH /mail_settings/template


var request = sg.emptyRequest()
request.body = {
  "enabled": true, 
  "html_content": "<% body %>"
};
request.method = 'PATCH'
request.path = '/v3/mail_settings/template'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve legacy template mail settings
// GET /mail_settings/template


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/mail_settings/template'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

