var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

##################################################
# Returns a list of all partner settings. #
# GET /partner_settings #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
request.method = 'GET'
request.path = '/v3/partner_settings'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Updates New Relic partner settings. #
# PATCH /partner_settings/new_relic #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.requestBody = {
  "enable_subuser_statistics": true, 
  "enabled": true, 
  "license_key": ""
};
request.method = 'PATCH'
request.path = '/v3/partner_settings/new_relic'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

##################################################
# Returns all New Relic partner settings. #
# GET /partner_settings/new_relic #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/partner_settings/new_relic'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})

