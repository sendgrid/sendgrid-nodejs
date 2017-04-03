var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Retrieve all IP addresses
// GET /ips


var request = sg.emptyRequest()
request.queryParams["subuser"] = 'test_string'
  request.queryParams["ip"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["exclude_whitelabels"] = 'true'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/ips'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all assigned IPs
// GET /ips/assigned


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/ips/assigned'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create an IP pool.
// POST /ips/pools


var request = sg.emptyRequest()
request.body = {
  "name": "marketing"
};
request.method = 'POST'
request.path = '/v3/ips/pools'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all IP pools.
// GET /ips/pools


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/ips/pools'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update an IP pools name.
// PUT /ips/pools/{pool_name}


var request = sg.emptyRequest()
request.body = {
  "name": "new_pool_name"
};
request.method = 'PUT'
request.path = '/v3/ips/pools/{pool_name}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all IPs in a specified pool.
// GET /ips/pools/{pool_name}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/ips/pools/{pool_name}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete an IP pool.
// DELETE /ips/pools/{pool_name}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/ips/pools/{pool_name}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add an IP address to a pool
// POST /ips/pools/{pool_name}/ips


var request = sg.emptyRequest()
request.body = {
  "ip": "0.0.0.0"
};
request.method = 'POST'
request.path = '/v3/ips/pools/{pool_name}/ips'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Remove an IP address from a pool.
// DELETE /ips/pools/{pool_name}/ips/{ip}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/ips/pools/{pool_name}/ips/{ip}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add an IP to warmup
// POST /ips/warmup


var request = sg.emptyRequest()
request.body = {
  "ip": "0.0.0.0"
};
request.method = 'POST'
request.path = '/v3/ips/warmup'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all IPs currently in warmup
// GET /ips/warmup


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/ips/warmup'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve warmup status for a specific IP address
// GET /ips/warmup/{ip_address}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/ips/warmup/{ip_address}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Remove an IP from warmup
// DELETE /ips/warmup/{ip_address}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/ips/warmup/{ip_address}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all IP pools an IP address belongs to
// GET /ips/{ip_address}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/ips/{ip_address}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

