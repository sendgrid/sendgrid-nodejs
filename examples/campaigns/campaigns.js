var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a Campaign
// POST /campaigns


var request = sg.emptyRequest()
request.body = {
  "categories": [
    "spring line"
  ], 
  "custom_unsubscribe_url": "", 
  "html_content": "<html><head><title></title></head><body><p>Check out our spring line!</p></body></html>", 
  "ip_pool": "marketing", 
  "list_ids": [
    110, 
    124
  ], 
  "plain_content": "Check out our spring line!", 
  "segment_ids": [
    110
  ], 
  "sender_id": 124451, 
  "subject": "New Products for Spring!", 
  "suppression_group_id": 42, 
  "title": "March Newsletter"
};
request.method = 'POST'
request.path = '/v3/campaigns'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve all Campaigns
// GET /campaigns


var request = sg.emptyRequest()
request.queryParams["limit"] = '1'
  request.queryParams["offset"] = '1'
 
request.method = 'GET'
request.path = '/v3/campaigns'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a Campaign
// PATCH /campaigns/{campaign_id}


var request = sg.emptyRequest()
request.body = {
  "categories": [
    "summer line"
  ], 
  "html_content": "<html><head><title></title></head><body><p>Check out our summer line!</p></body></html>", 
  "plain_content": "Check out our summer line!", 
  "subject": "New Products for Summer!", 
  "title": "May Newsletter"
};
request.method = 'PATCH'
request.path = '/v3/campaigns/{campaign_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Retrieve a single campaign
// GET /campaigns/{campaign_id}


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/campaigns/{campaign_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Delete a Campaign
// DELETE /campaigns/{campaign_id}


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/campaigns/{campaign_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Update a Scheduled Campaign
// PATCH /campaigns/{campaign_id}/schedules


var request = sg.emptyRequest()
request.body = {
  "send_at": 1489451436
};
request.method = 'PATCH'
request.path = '/v3/campaigns/{campaign_id}/schedules'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Schedule a Campaign
// POST /campaigns/{campaign_id}/schedules


var request = sg.emptyRequest()
request.body = {
  "send_at": 1489771528
};
request.method = 'POST'
request.path = '/v3/campaigns/{campaign_id}/schedules'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// View Scheduled Time of a Campaign
// GET /campaigns/{campaign_id}/schedules


var request = sg.emptyRequest()
request.method = 'GET'
request.path = '/v3/campaigns/{campaign_id}/schedules'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Unschedule a Scheduled Campaign
// DELETE /campaigns/{campaign_id}/schedules


var request = sg.emptyRequest()
request.method = 'DELETE'
request.path = '/v3/campaigns/{campaign_id}/schedules'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Send a Campaign
// POST /campaigns/{campaign_id}/schedules/now


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/campaigns/{campaign_id}/schedules/now'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Send a Test Campaign
// POST /campaigns/{campaign_id}/schedules/test


var request = sg.emptyRequest()
request.body = {
  "to": "your.email@example.com"
};
request.method = 'POST'
request.path = '/v3/campaigns/{campaign_id}/schedules/test'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

