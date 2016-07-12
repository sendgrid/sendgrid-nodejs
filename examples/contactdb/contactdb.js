var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a Custom Field
// POST /contactdb/custom_fields


var request = sg.emptyRequest()
request.body = {
  "name": "pet", 
  "type": "text"
};
request.method = 'POST'
request.path = '/v3/contactdb/custom_fields'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all custom fields
// GET /contactdb/custom_fields


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/custom_fields'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a Custom Field
// GET /contactdb/custom_fields/{custom_field_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/custom_fields/{custom_field_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a Custom Field
// DELETE /contactdb/custom_fields/{custom_field_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/contactdb/custom_fields/{custom_field_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create a List
// POST /contactdb/lists


var request = sg.emptyRequest()
request.body = {
  "name": "your list name"
};
request.method = 'POST'
request.path = '/v3/contactdb/lists'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all lists
// GET /contactdb/lists


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/lists'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete Multiple lists
// DELETE /contactdb/lists


var request = sg.emptyRequest()
request.body = [
  1, 
  2, 
  3, 
  4
];
request.method = 'DELETE'
request.path = '/v3/contactdb/lists'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a List
// PATCH /contactdb/lists/{list_id}


var request = sg.emptyRequest()
request.body = {
  "name": "newlistname"
};
request.queryParams["list_id"] = '1'
 
request.method = 'PATCH'
request.path = '/v3/contactdb/lists/{list_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a single list
// GET /contactdb/lists/{list_id}


var request = sg.emptyRequest()
request.queryParams["list_id"] = '1'
 
request.method = 'GET'
request.path = '/v3/contactdb/lists/{list_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a List
// DELETE /contactdb/lists/{list_id}


var request = sg.emptyRequest()
request.queryParams["delete_contacts"] = 'true'
 
request.method = 'DELETE'
request.path = '/v3/contactdb/lists/{list_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add Multiple Recipients to a List
// POST /contactdb/lists/{list_id}/recipients


var request = sg.emptyRequest()
request.body = [
  "recipient_id1", 
  "recipient_id2"
];
request.method = 'POST'
request.path = '/v3/contactdb/lists/{list_id}/recipients'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all recipients on a List
// GET /contactdb/lists/{list_id}/recipients


var request = sg.emptyRequest()
request.queryParams["page"] = '1'
  request.queryParams["page_size"] = '1'
  request.queryParams["list_id"] = '1'
 
request.method = 'GET'
request.path = '/v3/contactdb/lists/{list_id}/recipients'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add a Single Recipient to a List
// POST /contactdb/lists/{list_id}/recipients/{recipient_id}


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a Single Recipient from a Single List
// DELETE /contactdb/lists/{list_id}/recipients/{recipient_id}


var request = sg.emptyRequest()
request.queryParams["recipient_id"] = '1'
  request.queryParams["list_id"] = '1'
 
request.method = 'DELETE'
request.path = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update Recipient
// PATCH /contactdb/recipients


var request = sg.emptyRequest()
request.body = [
  {
    "email": "jones@example.com", 
    "first_name": "Guy", 
    "last_name": "Jones"
  }
];
request.method = 'PATCH'
request.path = '/v3/contactdb/recipients'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add recipients
// POST /contactdb/recipients


var request = sg.emptyRequest()
request.body = [
  {
    "age": 25, 
    "email": "example@example.com", 
    "first_name": "", 
    "last_name": "User"
  }, 
  {
    "age": 25, 
    "email": "example2@example.com", 
    "first_name": "Example", 
    "last_name": "User"
  }
];
request.method = 'POST'
request.path = '/v3/contactdb/recipients'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve recipients
// GET /contactdb/recipients


var request = sg.emptyRequest()
request.queryParams["page"] = '1'
  request.queryParams["page_size"] = '1'
 
request.method = 'GET'
request.path = '/v3/contactdb/recipients'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete Recipient
// DELETE /contactdb/recipients


var request = sg.emptyRequest()
request.body = [
  "recipient_id1", 
  "recipient_id2"
];
request.method = 'DELETE'
request.path = '/v3/contactdb/recipients'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve the count of billable recipients
// GET /contactdb/recipients/billable_count


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/recipients/billable_count'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a Count of Recipients
// GET /contactdb/recipients/count


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/recipients/count'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve recipients matching search criteria
// GET /contactdb/recipients/search


var request = sg.emptyRequest()
request.queryParams["{field_name}"] = 'test_string'
 
request.method = 'GET'
request.path = '/v3/contactdb/recipients/search'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a single recipient
// GET /contactdb/recipients/{recipient_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/recipients/{recipient_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a Recipient
// DELETE /contactdb/recipients/{recipient_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/contactdb/recipients/{recipient_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve the lists that a recipient is on
// GET /contactdb/recipients/{recipient_id}/lists


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/recipients/{recipient_id}/lists'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve reserved fields
// GET /contactdb/reserved_fields


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/reserved_fields'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create a Segment
// POST /contactdb/segments


var request = sg.emptyRequest()
request.body = {
  "conditions": [
    {
      "and_or": "", 
      "field": "last_name", 
      "operator": "eq", 
      "value": "Miller"
    }, 
    {
      "and_or": "and", 
      "field": "last_clicked", 
      "operator": "gt", 
      "value": "01/02/2015"
    }, 
    {
      "and_or": "or", 
      "field": "clicks.campaign_identifier", 
      "operator": "eq", 
      "value": "513"
    }
  ], 
  "list_id": 4, 
  "name": "Last Name Miller"
};
request.method = 'POST'
request.path = '/v3/contactdb/segments'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all segments
// GET /contactdb/segments


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/contactdb/segments'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a segment
// PATCH /contactdb/segments/{segment_id}


var request = sg.emptyRequest()
request.body = {
  "conditions": [
    {
      "and_or": "", 
      "field": "last_name", 
      "operator": "eq", 
      "value": "Miller"
    }
  ], 
  "list_id": 5, 
  "name": "The Millers"
};
request.queryParams["segment_id"] = 'test_string'
 
request.method = 'PATCH'
request.path = '/v3/contactdb/segments/{segment_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a segment
// GET /contactdb/segments/{segment_id}


var request = sg.emptyRequest()
request.queryParams["segment_id"] = '1'
 
request.method = 'GET'
request.path = '/v3/contactdb/segments/{segment_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a segment
// DELETE /contactdb/segments/{segment_id}


var request = sg.emptyRequest()
request.queryParams["delete_contacts"] = 'true'
 
request.method = 'DELETE'
request.path = '/v3/contactdb/segments/{segment_id}'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve recipients on a segment
// GET /contactdb/segments/{segment_id}/recipients


var request = sg.emptyRequest()
request.queryParams["page"] = '1'
  request.queryParams["page_size"] = '1'
 
request.method = 'GET'
request.path = '/v3/contactdb/segments/{segment_id}/recipients'
sg.API(request, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

