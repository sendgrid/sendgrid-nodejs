var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create API keys
// POST /api_keys


var request = sg.emptyRequest()
request.body = {
  "name": "My API Key", 
  "sample": "data", 
  "scopes": [
    "mail.send", 
    "alerts.create", 
    "alerts.read"
  ]
};
request.method = 'POST'
request.path = '/v3/api_keys'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all API Keys belonging to the authenticated user
// GET /api_keys


var request = sg.emptyRequest()
request.queryParams["limit"] = '1'
 
request.method = 'GET'
request.path = '/v3/api_keys'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update the name & scopes of an API Key
// PUT /api_keys/{api_key_id}


var request = sg.emptyRequest()
request.body = {
  "name": "A New Hope", 
  "scopes": [
    "user.profile.read", 
    "user.profile.update"
  ]
};
request.method = 'PUT'
request.path = '/v3/api_keys/{api_key_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update API keys
// PATCH /api_keys/{api_key_id}


var request = sg.emptyRequest()
request.body = {
  "name": "A New Hope"
};
request.method = 'PATCH'
request.path = '/v3/api_keys/{api_key_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve an existing API Key
// GET /api_keys/{api_key_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/api_keys/{api_key_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete API keys
// DELETE /api_keys/{api_key_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/api_keys/{api_key_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

