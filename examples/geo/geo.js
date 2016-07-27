var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve email statistics by country and state/province.
// GET /geo/stats


var request = sg.emptyRequest()
request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["country"] = 'US'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
 
request.method = 'GET'
request.path = '/v3/geo/stats'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

