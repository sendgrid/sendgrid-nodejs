var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create Subuser
// POST /subusers


var request = sg.emptyRequest()
request.body = {
  "email": "John@example.com", 
  "ips": [
    "1.1.1.1", 
    "2.2.2.2"
  ], 
  "password": "johns_password", 
  "username": "John@example.com"
};
request.method = 'POST'
request.path = '/v3/subusers'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// List all Subusers
// GET /subusers


var request = sg.emptyRequest()
request.queryParams["username"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/subusers'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve Subuser Reputations
// GET /subusers/reputations


var request = sg.emptyRequest()
request.queryParams["usernames"] = 'test_string'
 
request.method = 'GET'
request.path = '/v3/subusers/reputations'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve email statistics for your subusers.
// GET /subusers/stats


var request = sg.emptyRequest()
request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["subusers"] = 'test_string'
 
request.method = 'GET'
request.path = '/v3/subusers/stats'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve monthly stats for all subusers
// GET /subusers/stats/monthly


var request = sg.emptyRequest()
request.queryParams["subuser"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'
  request.queryParams["date"] = 'test_string'
  request.queryParams["sort_by_direction"] = 'asc'
 
request.method = 'GET'
request.path = '/v3/subusers/stats/monthly'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
//  Retrieve the totals for each email statistic metric for all subusers.
// GET /subusers/stats/sums


var request = sg.emptyRequest()
request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["sort_by_direction"] = 'asc'
 
request.method = 'GET'
request.path = '/v3/subusers/stats/sums'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Enable/disable a subuser
// PATCH /subusers/{subuser_name}


var request = sg.emptyRequest()
request.body = {
  "disabled": false
};
request.method = 'PATCH'
request.path = '/v3/subusers/{subuser_name}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a subuser
// DELETE /subusers/{subuser_name}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/subusers/{subuser_name}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update IPs assigned to a subuser
// PUT /subusers/{subuser_name}/ips


var request = sg.emptyRequest()
request.body = [
  "127.0.0.1"
];
request.method = 'PUT'
request.path = '/v3/subusers/{subuser_name}/ips'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Monitor Settings for a subuser
// PUT /subusers/{subuser_name}/monitor


var request = sg.emptyRequest()
request.body = {
  "email": "example@example.com", 
  "frequency": 500
};
request.method = 'PUT'
request.path = '/v3/subusers/{subuser_name}/monitor'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create monitor settings
// POST /subusers/{subuser_name}/monitor


var request = sg.emptyRequest()
request.body = {
  "email": "example@example.com", 
  "frequency": 50000
};
request.method = 'POST'
request.path = '/v3/subusers/{subuser_name}/monitor'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve monitor settings for a subuser
// GET /subusers/{subuser_name}/monitor


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/subusers/{subuser_name}/monitor'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete monitor settings
// DELETE /subusers/{subuser_name}/monitor


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/subusers/{subuser_name}/monitor'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve the monthly email statistics for a single subuser
// GET /subusers/{subuser_name}/stats/monthly


var request = sg.emptyRequest()
request.queryParams["date"] = 'test_string'
  request.queryParams["sort_by_direction"] = 'asc'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/subusers/{subuser_name}/stats/monthly'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

