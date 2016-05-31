var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

##################################################
# Retrieve all blocks #
# GET /suppression/blocks #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'GET'
request.path = '/v3/suppression/blocks'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete blocks #
# DELETE /suppression/blocks #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/blocks'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a specific block #
# GET /suppression/blocks/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/suppression/blocks/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a specific block #
# DELETE /suppression/blocks/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/suppression/blocks/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all bounces #
# GET /suppression/bounces #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["start_time"] = '0'
  request.queryParams["end_time"] = '0'
request.method = 'GET'
request.path = '/v3/suppression/bounces'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete bounces #
# DELETE /suppression/bounces #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "delete_all": true, 
  "emails": [
    "example@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/bounces'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a Bounce #
# GET /suppression/bounces/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/suppression/bounces/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a bounce #
# DELETE /suppression/bounces/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["email_address"] = 'example@example.com'
request.method = 'DELETE'
request.path = '/v3/suppression/bounces/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all invalid emails #
# GET /suppression/invalid_emails #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'GET'
request.path = '/v3/suppression/invalid_emails'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete invalid emails #
# DELETE /suppression/invalid_emails #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/invalid_emails'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a specific invalid email #
# GET /suppression/invalid_emails/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/suppression/invalid_emails/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a specific invalid email #
# DELETE /suppression/invalid_emails/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/suppression/invalid_emails/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a specific spam report #
# GET /suppression/spam_report/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/suppression/spam_report/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a specific spam report #
# DELETE /suppression/spam_report/{email} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/suppression/spam_report/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all spam reports #
# GET /suppression/spam_reports #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'GET'
request.path = '/v3/suppression/spam_reports'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete spam reports #
# DELETE /suppression/spam_reports #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/spam_reports'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all global suppressions #
# GET /suppression/unsubscribes #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'GET'
request.path = '/v3/suppression/unsubscribes'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

