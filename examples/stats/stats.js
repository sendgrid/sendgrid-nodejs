var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve global email statistics
// GET /stats


var request = sg.emptyRequest()
request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/stats'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

