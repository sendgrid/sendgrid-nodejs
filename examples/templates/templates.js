var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a transactional template.
// POST /templates


var request = sg.emptyRequest()
request.body = {
  "name": "example_name"
};
request.method = 'POST'
request.path = '/v3/templates'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all transactional templates.
// GET /templates


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/templates'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Edit a transactional template.
// PATCH /templates/{template_id}


var request = sg.emptyRequest()
request.body = {
  "name": "new_example_name"
};
request.method = 'PATCH'
request.path = '/v3/templates/{template_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a single transactional template.
// GET /templates/{template_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/templates/{template_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a template.
// DELETE /templates/{template_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/templates/{template_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create a new transactional template version.
// POST /templates/{template_id}/versions


var request = sg.emptyRequest()
request.body = {
  "active": 1, 
  "html_content": "<%body%>", 
  "name": "example_version_name", 
  "plain_content": "<%body%>", 
  "subject": "<%subject%>", 
  "template_id": "ddb96bbc-9b92-425e-8979-99464621b543"
};
request.method = 'POST'
request.path = '/v3/templates/{template_id}/versions'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Edit a transactional template version.
// PATCH /templates/{template_id}/versions/{version_id}


var request = sg.emptyRequest()
request.body = {
  "active": 1, 
  "html_content": "<%body%>", 
  "name": "updated_example_name", 
  "plain_content": "<%body%>", 
  "subject": "<%subject%>"
};
request.method = 'PATCH'
request.path = '/v3/templates/{template_id}/versions/{version_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a specific transactional template version.
// GET /templates/{template_id}/versions/{version_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/templates/{template_id}/versions/{version_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a transactional template version.
// DELETE /templates/{template_id}/versions/{version_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/templates/{template_id}/versions/{version_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Activate a transactional template version.
// POST /templates/{template_id}/versions/{version_id}/activate


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/templates/{template_id}/versions/{version_id}/activate'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

