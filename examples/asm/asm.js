var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a new suppression group
// POST /asm/groups


var request = sg.emptyRequest()
request.body = {
  "description": "Suggestions for products our users might like.", 
  "is_default": true, 
  "name": "Product Suggestions"
};
request.method = 'POST'
request.path = '/v3/asm/groups'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve information about multiple suppression groups
// GET /asm/groups


var request = sg.emptyRequest()
request.queryParams["id"] = '1'
 
request.method = 'GET'
request.path = '/v3/asm/groups'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a suppression group.
// PATCH /asm/groups/{group_id}


var request = sg.emptyRequest()
request.body = {
  "description": "Suggestions for items our users might like.", 
  "id": 103, 
  "name": "Item Suggestions"
};
request.method = 'PATCH'
request.path = '/v3/asm/groups/{group_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Get information on a single suppression group.
// GET /asm/groups/{group_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/asm/groups/{group_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a suppression group.
// DELETE /asm/groups/{group_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/asm/groups/{group_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add suppressions to a suppression group
// POST /asm/groups/{group_id}/suppressions


var request = sg.emptyRequest()
request.body = {
  "recipient_emails": [
    "test1@example.com", 
    "test2@example.com"
  ]
};
request.method = 'POST'
request.path = '/v3/asm/groups/{group_id}/suppressions'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all suppressions for a suppression group
// GET /asm/groups/{group_id}/suppressions


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/asm/groups/{group_id}/suppressions'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Search for suppressions within a group
// POST /asm/groups/{group_id}/suppressions/search


var request = sg.emptyRequest()
request.body = {
  "recipient_emails": [
    "exists1@example.com", 
    "exists2@example.com", 
    "doesnotexists@example.com"
  ]
};
request.method = 'POST'
request.path = '/v3/asm/groups/{group_id}/suppressions/search'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a suppression from a suppression group
// DELETE /asm/groups/{group_id}/suppressions/{email}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/asm/groups/{group_id}/suppressions/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all suppressions
// GET /asm/suppressions


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/asm/suppressions'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add recipient addresses to the global suppression group.
// POST /asm/suppressions/global


var request = sg.emptyRequest()
request.body = {
  "recipient_emails": [
    "test1@example.com", 
    "test2@example.com"
  ]
};
request.method = 'POST'
request.path = '/v3/asm/suppressions/global'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a Global Suppression
// GET /asm/suppressions/global/{email}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/asm/suppressions/global/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a Global Suppression
// DELETE /asm/suppressions/global/{email}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/asm/suppressions/global/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all suppression groups for an email address
// GET /asm/suppressions/{email}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/asm/suppressions/{email}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

