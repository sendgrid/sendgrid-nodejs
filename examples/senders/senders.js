var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a Sender Identity
// POST /senders


var request = sg.emptyRequest()
request.body = {
  "address": "123 Elm St.", 
  "address_2": "Apt. 456", 
  "city": "Denver", 
  "country": "United States", 
  "from": {
    "email": "from@example.com", 
    "name": "Example INC"
  }, 
  "nickname": "My Sender ID", 
  "reply_to": {
    "email": "replyto@example.com", 
    "name": "Example INC"
  }, 
  "state": "Colorado", 
  "zip": "80202"
};
request.method = 'POST'
request.path = '/v3/senders'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Get all Sender Identities
// GET /senders


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/senders'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a Sender Identity
// PATCH /senders/{sender_id}


var request = sg.emptyRequest()
request.body = {
  "address": "123 Elm St.", 
  "address_2": "Apt. 456", 
  "city": "Denver", 
  "country": "United States", 
  "from": {
    "email": "from@example.com", 
    "name": "Example INC"
  }, 
  "nickname": "My Sender ID", 
  "reply_to": {
    "email": "replyto@example.com", 
    "name": "Example INC"
  }, 
  "state": "Colorado", 
  "zip": "80202"
};
request.method = 'PATCH'
request.path = '/v3/senders/{sender_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// View a Sender Identity
// GET /senders/{sender_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/senders/{sender_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a Sender Identity
// DELETE /senders/{sender_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/senders/{sender_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Resend Sender Identity Verification
// POST /senders/{sender_id}/resend_verification


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/senders/{sender_id}/resend_verification'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

