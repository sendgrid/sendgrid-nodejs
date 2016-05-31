var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

##################################################
# Create a domain whitelabel. #
# POST /whitelabel/domains #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
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
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# List all domain whitelabels. #
# GET /whitelabel/domains #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["username"] = 'test_string'
  request.queryParams["domain"] = 'test_string'
  request.queryParams["exclude_subusers"] = 'true'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'GET'
request.path = '/v3/whitelabel/domains'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Get the default domain whitelabel. #
# GET /whitelabel/domains/default #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/whitelabel/domains/default'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# List the domain whitelabel associated with the given user. #
# GET /whitelabel/domains/subuser #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/whitelabel/domains/subuser'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Disassociate a domain whitelabel from a given user. #
# DELETE /whitelabel/domains/subuser #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/whitelabel/domains/subuser'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update a domain whitelabel. #
# PATCH /whitelabel/domains/{domain_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "custom_spf": true, 
  "default": false
};
request.method = 'PATCH'
request.path = '/v3/whitelabel/domains/{domain_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a domain whitelabel. #
# GET /whitelabel/domains/{domain_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/whitelabel/domains/{domain_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a domain whitelabel. #
# DELETE /whitelabel/domains/{domain_id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/whitelabel/domains/{domain_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Associate a domain whitelabel with a given user. #
# POST /whitelabel/domains/{domain_id}/subuser #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "username": "jane@example.com"
};
request.method = 'POST'
request.path = '/v3/whitelabel/domains/{domain_id}/subuser'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Add an IP to a domain whitelabel. #
# POST /whitelabel/domains/{id}/ips #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "ip": "192.168.0.1"
};
request.method = 'POST'
request.path = '/v3/whitelabel/domains/{id}/ips'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Remove an IP from a domain whitelabel. #
# DELETE /whitelabel/domains/{id}/ips/{ip} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/whitelabel/domains/{id}/ips/{ip}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Validate a domain whitelabel. #
# POST /whitelabel/domains/{id}/validate #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'POST'
request.path = '/v3/whitelabel/domains/{id}/validate'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Create an IP whitelabel #
# POST /whitelabel/ips #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "domain": "example.com", 
  "ip": "192.168.1.1", 
  "subdomain": "email"
};
request.method = 'POST'
request.path = '/v3/whitelabel/ips'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all IP whitelabels #
# GET /whitelabel/ips #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["ip"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'GET'
request.path = '/v3/whitelabel/ips'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve an IP whitelabel #
# GET /whitelabel/ips/{id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/whitelabel/ips/{id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete an IP whitelabel #
# DELETE /whitelabel/ips/{id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/whitelabel/ips/{id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Validate an IP whitelabel #
# POST /whitelabel/ips/{id}/validate #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'POST'
request.path = '/v3/whitelabel/ips/{id}/validate'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Create a Link Whitelabel #
# POST /whitelabel/links #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "default": true, 
  "domain": "example.com", 
  "subdomain": "mail"
};
request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'POST'
request.path = '/v3/whitelabel/links'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve all link whitelabels #
# GET /whitelabel/links #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["limit"] = '1'
request.method = 'GET'
request.path = '/v3/whitelabel/links'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a Default Link Whitelabel #
# GET /whitelabel/links/default #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["domain"] = 'test_string'
request.method = 'GET'
request.path = '/v3/whitelabel/links/default'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve Associated Link Whitelabel #
# GET /whitelabel/links/subuser #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["username"] = 'test_string'
request.method = 'GET'
request.path = '/v3/whitelabel/links/subuser'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Disassociate a Link Whitelabel #
# DELETE /whitelabel/links/subuser #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["username"] = 'test_string'
request.method = 'DELETE'
request.path = '/v3/whitelabel/links/subuser'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Update a Link Whitelabel #
# PATCH /whitelabel/links/{id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "default": true
};
request.method = 'PATCH'
request.path = '/v3/whitelabel/links/{id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Retrieve a Link Whitelabel #
# GET /whitelabel/links/{id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/whitelabel/links/{id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Delete a Link Whitelabel #
# DELETE /whitelabel/links/{id} #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'DELETE'
request.path = '/v3/whitelabel/links/{id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Validate a Link Whitelabel #
# POST /whitelabel/links/{id}/validate #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'POST'
request.path = '/v3/whitelabel/links/{id}/validate'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Associate a Link Whitelabel #
# POST /whitelabel/links/{link_id}/subuser #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "username": "jane@example.com"
};
request.method = 'POST'
request.path = '/v3/whitelabel/links/{link_id}/subuser'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

