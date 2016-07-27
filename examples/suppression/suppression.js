var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve all blocks
// GET /suppression/blocks


var request = sg.emptyRequest()
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/suppression/blocks'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete blocks
// DELETE /suppression/blocks


var request = sg.emptyRequest()
request.body = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/blocks'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a specific block
// GET /suppression/blocks/{email}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/suppression/blocks/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a specific block
// DELETE /suppression/blocks/{email}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/suppression/blocks/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all bounces
// GET /suppression/bounces


var request = sg.emptyRequest()
request.queryParams["start_time"] = '1'
  request.queryParams["end_time"] = '1'
 
request.method = 'GET'
request.path = '/v3/suppression/bounces'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete bounces
// DELETE /suppression/bounces


var request = sg.emptyRequest()
request.body = {
  "delete_all": true, 
  "emails": [
    "example@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/bounces'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a Bounce
// GET /suppression/bounces/{email}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/suppression/bounces/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a bounce
// DELETE /suppression/bounces/{email}


var request = sg.emptyRequest()
request.queryParams["email_address"] = 'example@example.com'
 
request.method = 'DELETE'
request.path = '/v3/suppression/bounces/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all invalid emails
// GET /suppression/invalid_emails


var request = sg.emptyRequest()
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/suppression/invalid_emails'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete invalid emails
// DELETE /suppression/invalid_emails


var request = sg.emptyRequest()
request.body = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/invalid_emails'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a specific invalid email
// GET /suppression/invalid_emails/{email}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/suppression/invalid_emails/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a specific invalid email
// DELETE /suppression/invalid_emails/{email}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/suppression/invalid_emails/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a specific spam report
// GET /suppression/spam_report/{email}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/suppression/spam_report/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a specific spam report
// DELETE /suppression/spam_report/{email}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/suppression/spam_report/{email}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all spam reports
// GET /suppression/spam_reports


var request = sg.emptyRequest()
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/suppression/spam_reports'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete spam reports
// DELETE /suppression/spam_reports


var request = sg.emptyRequest()
request.body = {
  "delete_all": false, 
  "emails": [
    "example1@example.com", 
    "example2@example.com"
  ]
};
request.method = 'DELETE'
request.path = '/v3/suppression/spam_reports'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all global suppressions
// GET /suppression/unsubscribes


var request = sg.emptyRequest()
request.queryParams["start_time"] = '1'
  request.queryParams["limit"] = '1'
  request.queryParams["end_time"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/suppression/unsubscribes'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

