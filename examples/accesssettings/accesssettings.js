var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve all recent access attempts
// GET /access_settings/activity


var request = sg.emptyRequest()
request.queryParams["limit"] = '1'
 
request.method = 'GET'
request.path = '/v3/access_settings/activity'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add one or more IPs to the whitelist
// POST /access_settings/whitelist


var request = sg.emptyRequest()
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
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a list of currently whitelisted IPs
// GET /access_settings/whitelist


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/access_settings/whitelist'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Remove one or more IPs from the whitelist
// DELETE /access_settings/whitelist


var request = sg.emptyRequest()
request.body = {
  "ids": [
    1, 
    2, 
    3
  ]
};
request.method = 'DELETE'
request.path = '/v3/access_settings/whitelist'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a specific whitelisted IP
// GET /access_settings/whitelist/{rule_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/access_settings/whitelist/{rule_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Remove a specific IP from the whitelist
// DELETE /access_settings/whitelist/{rule_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/access_settings/whitelist/{rule_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

