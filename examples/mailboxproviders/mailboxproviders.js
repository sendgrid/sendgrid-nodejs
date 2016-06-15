var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve email statistics by mailbox provider.
// GET /mailbox_providers/stats


var request = sg.emptyRequest()
request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["mailbox_providers"] = 'test_string'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
 
request.method = 'GET'
request.path = '/v3/mailbox_providers/stats'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

