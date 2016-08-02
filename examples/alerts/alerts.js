var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a new Alert
// POST /alerts


var request = sg.emptyRequest()
request.body = {
  "email_to": "example@example.com", 
  "frequency": "daily", 
  "type": "stats_notification"
};
request.method = 'POST'
request.path = '/v3/alerts'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all alerts
// GET /alerts


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/alerts'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update an alert
// PATCH /alerts/{alert_id}


var request = sg.emptyRequest()
request.body = {
  "email_to": "example@example.com"
};
request.method = 'PATCH'
request.path = '/v3/alerts/{alert_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a specific alert
// GET /alerts/{alert_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/alerts/{alert_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete an alert
// DELETE /alerts/{alert_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/alerts/{alert_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

