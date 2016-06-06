var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

##################################################
# Retrieve a list of scopes for which this user has access. #
# GET /scopes #

var emptyRequest = require('sendgrid-rest').request
var request = JSON.parse(JSON.stringify(emptyRequest))
request.method = 'GET'
request.path = '/v3/scopes'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

