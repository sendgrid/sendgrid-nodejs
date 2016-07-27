var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Returns a list of all partner settings.
// GET /partner_settings


var request = sg.emptyRequest()
request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/partner_settings'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Updates New Relic partner settings.
// PATCH /partner_settings/new_relic


var request = sg.emptyRequest()
request.body = {
  "enable_subuser_statistics": true, 
  "enabled": true, 
  "license_key": ""
};
request.method = 'PATCH'
request.path = '/v3/partner_settings/new_relic'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Returns all New Relic partner settings.
// GET /partner_settings/new_relic


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/partner_settings/new_relic'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

