var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve email statistics by browser. 
// GET /browsers/stats


var request = sg.emptyRequest()
request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["browsers"] = 'test_string'
  request.queryParams["limit"] = 'test_string'
  request.queryParams["offset"] = 'test_string'
  request.queryParams["start_date"] = '2016-01-01'
 
request.method = 'GET'
request.path = '/v3/browsers/stats'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

