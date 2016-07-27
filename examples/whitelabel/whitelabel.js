var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a domain whitelabel.
// POST /whitelabel/domains


var request = sg.emptyRequest()
request.body = {
  "automatic_security": false, 
  "custom_spf": true, 
  "default": true, 
  "domain": "example.com", 
  "ips": [
    "192.168.1.1", 
    "192.168.1.2"
  ], 
  "subdomain": "news", 
  "username": "john@example.com"
};
request.method = 'POST'
request.path = '/v3/whitelabel/domains'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// List all domain whitelabels.
// GET /whitelabel/domains


var request = sg.emptyRequest()
request.queryParams["username"] = 'test_string'
  request.queryParams["domain"] = 'test_string'
  request.queryParams["exclude_subusers"] = 'true'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/whitelabel/domains'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Get the default domain whitelabel.
// GET /whitelabel/domains/default


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/whitelabel/domains/default'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// List the domain whitelabel associated with the given user.
// GET /whitelabel/domains/subuser


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/whitelabel/domains/subuser'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Disassociate a domain whitelabel from a given user.
// DELETE /whitelabel/domains/subuser


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/whitelabel/domains/subuser'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a domain whitelabel.
// PATCH /whitelabel/domains/{domain_id}


var request = sg.emptyRequest()
request.body = {
  "custom_spf": true, 
  "default": false
};
request.method = 'PATCH'
request.path = '/v3/whitelabel/domains/{domain_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a domain whitelabel.
// GET /whitelabel/domains/{domain_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/whitelabel/domains/{domain_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a domain whitelabel.
// DELETE /whitelabel/domains/{domain_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/whitelabel/domains/{domain_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Associate a domain whitelabel with a given user.
// POST /whitelabel/domains/{domain_id}/subuser


var request = sg.emptyRequest()
request.body = {
  "username": "jane@example.com"
};
request.method = 'POST'
request.path = '/v3/whitelabel/domains/{domain_id}/subuser'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add an IP to a domain whitelabel.
// POST /whitelabel/domains/{id}/ips


var request = sg.emptyRequest()
request.body = {
  "ip": "192.168.0.1"
};
request.method = 'POST'
request.path = '/v3/whitelabel/domains/{id}/ips'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Remove an IP from a domain whitelabel.
// DELETE /whitelabel/domains/{id}/ips/{ip}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/whitelabel/domains/{id}/ips/{ip}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Validate a domain whitelabel.
// POST /whitelabel/domains/{id}/validate


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/whitelabel/domains/{id}/validate'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create an IP whitelabel
// POST /whitelabel/ips


var request = sg.emptyRequest()
request.body = {
  "domain": "example.com", 
  "ip": "192.168.1.1", 
  "subdomain": "email"
};
request.method = 'POST'
request.path = '/v3/whitelabel/ips'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all IP whitelabels
// GET /whitelabel/ips


var request = sg.emptyRequest()
request.queryParams["ip"] = 'test_string'
  request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/whitelabel/ips'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve an IP whitelabel
// GET /whitelabel/ips/{id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/whitelabel/ips/{id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete an IP whitelabel
// DELETE /whitelabel/ips/{id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/whitelabel/ips/{id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Validate an IP whitelabel
// POST /whitelabel/ips/{id}/validate


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/whitelabel/ips/{id}/validate'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create a Link Whitelabel
// POST /whitelabel/links


var request = sg.emptyRequest()
request.body = {
  "default": true, 
  "domain": "example.com", 
  "subdomain": "mail"
};
request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'POST'
request.path = '/v3/whitelabel/links'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all link whitelabels
// GET /whitelabel/links


var request = sg.emptyRequest()
request.queryParams["limit"] = '1'
 
request.method = 'GET'
request.path = '/v3/whitelabel/links'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a Default Link Whitelabel
// GET /whitelabel/links/default


var request = sg.emptyRequest()
request.queryParams["domain"] = 'test_string'
 
request.method = 'GET'
request.path = '/v3/whitelabel/links/default'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve Associated Link Whitelabel
// GET /whitelabel/links/subuser


var request = sg.emptyRequest()
request.queryParams["username"] = 'test_string'
 
request.method = 'GET'
request.path = '/v3/whitelabel/links/subuser'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Disassociate a Link Whitelabel
// DELETE /whitelabel/links/subuser


var request = sg.emptyRequest()
request.queryParams["username"] = 'test_string'
 
request.method = 'DELETE'
request.path = '/v3/whitelabel/links/subuser'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a Link Whitelabel
// PATCH /whitelabel/links/{id}


var request = sg.emptyRequest()
request.body = {
  "default": true
};
request.method = 'PATCH'
request.path = '/v3/whitelabel/links/{id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a Link Whitelabel
// GET /whitelabel/links/{id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/whitelabel/links/{id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a Link Whitelabel
// DELETE /whitelabel/links/{id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/whitelabel/links/{id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Validate a Link Whitelabel
// POST /whitelabel/links/{id}/validate


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/whitelabel/links/{id}/validate'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Associate a Link Whitelabel
// POST /whitelabel/links/{link_id}/subuser


var request = sg.emptyRequest()
request.body = {
  "username": "jane@example.com"
};
request.method = 'POST'
request.path = '/v3/whitelabel/links/{link_id}/subuser'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

