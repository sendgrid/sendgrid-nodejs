var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

##################################################
# Get a user's account information. #
# GET /user/account #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/account'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve your credit balance #
# GET /user/credits #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/credits'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update your account email address #
# PUT /user/email #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "email": "example@example.com"
};
request.method = 'PUT'
request.path = '/v3/user/email'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve your account email address #
# GET /user/email #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/email'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update your password #
# PUT /user/password #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "new_password": "new_password", 
  "old_password": "old_password"
};
request.method = 'PUT'
request.path = '/v3/user/password'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update a user's profile #
# PATCH /user/profile #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "city": "Orange", 
  "first_name": "Example", 
  "last_name": "User"
};
request.method = 'PATCH'
request.path = '/v3/user/profile'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Get a user's profile #
# GET /user/profile #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/profile'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Cancel or pause a scheduled send #
# POST /user/scheduled_sends #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "batch_id": "YOUR_BATCH_ID", 
  "status": "pause"
};
request.method = 'POST'
request.path = '/v3/user/scheduled_sends'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all scheduled sends #
# GET /user/scheduled_sends #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/scheduled_sends'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update user scheduled send information #
# PATCH /user/scheduled_sends/{batch_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "status": "pause"
};
request.method = 'PATCH'
request.path = '/v3/user/scheduled_sends/{batch_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve scheduled send #
# GET /user/scheduled_sends/{batch_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/scheduled_sends/{batch_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a cancellation or pause of a scheduled send #
# DELETE /user/scheduled_sends/{batch_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/user/scheduled_sends/{batch_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update Enforced TLS settings #
# PATCH /user/settings/enforced_tls #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "require_tls": true, 
  "require_valid_cert": false
};
request.method = 'PATCH'
request.path = '/v3/user/settings/enforced_tls'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve current Enforced TLS settings. #
# GET /user/settings/enforced_tls #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/settings/enforced_tls'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update your username #
# PUT /user/username #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "username": "test_username"
};
request.method = 'PUT'
request.path = '/v3/user/username'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve your username #
# GET /user/username #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/username'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update Event Notification Settings #
# PATCH /user/webhooks/event/settings #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
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
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve Event Webhook settings #
# GET /user/webhooks/event/settings #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/webhooks/event/settings'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Test Event Notification Settings  #
# POST /user/webhooks/event/test #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "url": "url"
};
request.method = 'POST'
request.path = '/v3/user/webhooks/event/test'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve Parse Webhook settings #
# GET /user/webhooks/parse/settings #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/user/webhooks/parse/settings'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieves Inbound Parse Webhook statistics. #
# GET /user/webhooks/parse/stats #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = 'test_string'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["offset"] = 'test_string'
request.method = 'GET'
request.path = '/v3/user/webhooks/parse/stats'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

