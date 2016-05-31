var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

##################################################
# Create a Group #
# POST /asm/groups #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "description": "A group description", 
  "is_default": false, 
  "name": "A group name"
};
request.method = 'POST'
request.path = '/v3/asm/groups'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all suppression groups associated with the user. #
# GET /asm/groups #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/asm/groups'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update a suppression group. #
# PATCH /asm/groups/{group_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "description": "Suggestions for items our users might like.", 
  "id": 103, 
  "name": "Item Suggestions"
};
request.method = 'PATCH'
request.path = '/v3/asm/groups/{group_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Get information on a single suppression group. #
# GET /asm/groups/{group_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/asm/groups/{group_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a suppression group. #
# DELETE /asm/groups/{group_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/asm/groups/{group_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Add suppressions to a suppression group #
# POST /asm/groups/{group_id}/suppressions #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "recipient_emails": [
    "test1@example.com", 
    "test2@example.com"
  ]
};
request.method = 'POST'
request.path = '/v3/asm/groups/{group_id}/suppressions'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all suppressions for a suppression group #
# GET /asm/groups/{group_id}/suppressions #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/asm/groups/{group_id}/suppressions'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a suppression from a suppression group #
# DELETE /asm/groups/{group_id}/suppressions/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/asm/groups/{group_id}/suppressions/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Add recipient addresses to the global suppression group. #
# POST /asm/suppressions/global #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "recipient_emails": [
    "test1@example.com", 
    "test2@example.com"
  ]
};
request.method = 'POST'
request.path = '/v3/asm/suppressions/global'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a Global Suppression #
# GET /asm/suppressions/global/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/asm/suppressions/global/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a Global Suppression #
# DELETE /asm/suppressions/global/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/asm/suppressions/global/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

