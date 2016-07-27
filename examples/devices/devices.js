var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve email statistics by device type.
// GET /devices/stats


var request = sg.emptyRequest()
request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/devices/stats'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

