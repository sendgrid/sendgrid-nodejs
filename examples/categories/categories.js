var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve all categories
// GET /categories


var request = sg.emptyRequest()
request.queryParams["category"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/categories'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve Email Statistics for Categories
// GET /categories/stats


var request = sg.emptyRequest()
request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["categories"] = 'test_string'
 
request.method = 'GET'
request.path = '/v3/categories/stats'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve sums of email stats for each category [Needs: Stats object defined, has category ID?]
// GET /categories/stats/sums


var request = sg.emptyRequest()
request.queryParams["end_date"] = '2016-04-01'
  request.queryParams["aggregated_by"] = 'day'
  request.queryParams["limit"] = '1'
  request.queryParams["sort_by_metric"] = 'test_string'
  request.queryParams["offset"] = '1'
  request.queryParams["start_date"] = '2016-01-01'
  request.queryParams["sort_by_direction"] = 'asc'
 
request.method = 'GET'
request.path = '/v3/categories/stats/sums'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

