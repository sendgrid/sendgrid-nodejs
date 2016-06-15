var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve email statistics by client type.
// GET /clients/stats


var request = sg.emptyRequest()
request.queryParams["aggregated_by"] = 'day'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
 
request.method = 'GET'
request.path = '/v3/clients/stats'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve stats by a specific client type.
// GET /clients/{client_type}/stats


var request = sg.emptyRequest()
request.queryParams["aggregated_by"] = 'day'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
 
request.method = 'GET'
request.path = '/v3/clients/{client_type}/stats'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

