This documentation is based on our [OAI specification](https://github.com/sendgrid/sendgrid-oai).

# INITIALIZATION

```javascript
const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);
```

# Table of Contents

* [ACCESS SETTINGS](#access-settings)
* [ALERTS](#alerts)
* [API KEYS](#api-keys)
* [ASM](#asm)
* [BROWSERS](#browsers)
* [CAMPAIGNS](#campaigns)
* [CATEGORIES](#categories)
* [CLIENTS](#clients)
* [CONTACTDB](#contactdb)
* [DEVICES](#devices)
* [GEO](#geo)
* [IPS](#ips)
* [MAIL](#mail)
* [MAIL SETTINGS](#mail-settings)
* [MAILBOX PROVIDERS](#mailbox-providers)
* [MESSAGES](#messages)
* [PARTNER SETTINGS](#partner-settings)
* [SCOPES](#scopes)
* [SENDERS](#senders)
* [SENDER AUTHENTICATION](#sender-authentication)
* [STATS](#stats)
* [SUBUSERS](#subusers)
* [SUPPRESSION](#suppression)
* [TEAMMATES](#teammates)
* [TEMPLATES](#templates)
* [TRACKING SETTINGS](#tracking-settings)
* [USER](#user)

# On behalf of subusers

Most API calls will accept an `on-behalf-of` header
in order to make API calls as a given subuser:

```javascript
  // create an API key for the given subuser
const data = {
  name: 'subuser API key',
  scopes: ['mail.send'],
};
request.body = data;
request.method = 'POST';
request.url = '/v3/api_keys';
request.headers = { 'On-Behalf-Of': 'subuser username' };
client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  });
```

<a name="access-settings"></a>
# ACCESS SETTINGS

## Retrieve all recent access attempts

**This endpoint allows you to retrieve a list of all of the IP addresses that recently attempted to access your account either through the User Interface or the API.**

IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your IP address from the whitelist, thus preventing yourself from accessing your account.

For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).

### GET /access_settings/activity


```javascript
  const queryParams = {
  'limit': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/access_settings/activity';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add one or more IPs to the whitelist

**This endpoint allows you to add one or more IP addresses to your IP whitelist.**

When adding an IP to your whitelist, include the IP address in an array. You can whitelist one IP at a time, or you can whitelist multiple IPs at once.

IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your IP address from the whitelist, thus preventing yourself from accessing your account.

For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).

### POST /access_settings/whitelist


```javascript
  const data = {
  "ips": [
    {
      "ip": "192.168.1.1"
    },
    {
      "ip": "192.*.*.*"
    },
    {
      "ip": "192.168.1.3/32"
    }
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/access_settings/whitelist';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Remove one or more IPs from the whitelist

**This endpoint allows you to remove one or more IPs from your IP whitelist.**

You can remove one IP at a time, or you can remove multiple IP addresses.

IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your IP address from the whitelist, thus preventing yourself from accessing your account.

For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).

### DELETE /access_settings/whitelist


```javascript
  const data = {
  "ids": [
    1,
    2,
    3
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/access_settings/whitelist';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a list of currently whitelisted IPs

**This endpoint allows you to retrieve a list of IP addresses that are currently whitelisted.**

IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your IP address from the whitelist, thus preventing yourself from accessing your account.

For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).

### GET /access_settings/whitelist


```javascript
  request.method = 'GET';
  request.url = '/v3/access_settings/whitelist';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Remove a specific IP from the whitelist

**This endpoint allows you to remove a specific IP address from your IP whitelist.**

When removing a specific IP address from your whitelist, you must include the ID in your call.

IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your IP address from the whitelist, thus preventing yourself from accessing your account.

For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).

### DELETE /access_settings/whitelist/{rule_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/access_settings/whitelist/{rule_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a specific whitelisted IP

**This endpoint allows you to retrieve a specific IP address that has been whitelisted.**

You must include the ID for the specific IP address you want to retrieve in your call.

IP Access Management allows you to control which IP addresses can be used to access your account, either through the User Interface or the API. There is no limit to the number of IP addresses that you can add to your whitelist. It is possible to remove your IP address from the whitelist, thus preventing yourself from accessing your account.

For more information, please see our [User Guide](http://sendgrid.com/docs/User_Guide/Settings/ip_access_management.html).

### GET /access_settings/whitelist/{rule_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/access_settings/whitelist/{rule_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="alerts"></a>
# ALERTS

## Create a new Alert

**This endpoint allows you to create a new alert.**

Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics. There are two types of alerts available with this endpoint:

* `usage_limit` allows you to set the threshold at which an alert will be sent.
* `stats_notification` allows you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).

### POST /alerts


```javascript
  const data = {
  "email_to": "example@example.com",
  "frequency": "daily",
  "type": "stats_notification"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/alerts';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all alerts

**This endpoint allows you to retrieve all of your alerts.**

Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
* Usage alerts allow you to set the threshold at which an alert will be sent.
* Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).

### GET /alerts


```javascript
  request.method = 'GET';
  request.url = '/v3/alerts';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update an alert

**This endpoint allows you to update an alert.**

Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
* Usage alerts allow you to set the threshold at which an alert will be sent.
* Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).

### PATCH /alerts/{alert_id}


```javascript
  const data = {
  "email_to": "example@example.com"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/alerts/{alert_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete an alert

**This endpoint allows you to delete an alert.**

Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
* Usage alerts allow you to set the threshold at which an alert will be sent.
* Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).

### DELETE /alerts/{alert_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/alerts/{alert_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a specific alert

**This endpoint allows you to retrieve a specific alert.**

Alerts allow you to specify an email address to receive notifications regarding your email usage or statistics.
* Usage alerts allow you to set the threshold at which an alert will be sent.
* Stats notifications allow you to set how frequently you would like to receive email statistics reports. For example, "daily", "weekly", or "monthly".

For more information about alerts, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/alerts.html).

### GET /alerts/{alert_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/alerts/{alert_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="api-keys"></a>
# API KEYS

## Create API keys

**This endpoint allows you to create a new random API Key for the user.**

A JSON request body containing a "name" property is required. If the number of maximum keys is reached, HTTP 403 will be returned.

There is a limit of 100 API Keys on your account.

The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the Twilio SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

See the [API Key Permissions List](https://sendgrid.com/docs/API_Reference/Web_API_v3/API_Keys/api_key_permissions_list.html) for a list of all available scopes.

### POST /api_keys


```javascript
  const data = {
  "name": "My API Key",
  "sample": "data",
  "scopes": [
    "mail.send",
    "alerts.create",
    "alerts.read"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/api_keys';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all API Keys belonging to the authenticated user

**This endpoint allows you to retrieve all API Keys that belong to the authenticated user.**

The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the Twilio SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

### GET /api_keys


```javascript
  const queryParams = {
  'limit': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/api_keys';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update the name & scopes of an API Key

**This endpoint allows you to update the name and scopes of a given API key.**

A JSON request body with a "name" property is required.
Most provide the list of all the scopes an API key should have.

The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the Twilio SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

### PUT /api_keys/{api_key_id}


```javascript
  const data = {
  "name": "A New Hope",
  "scopes": [
    "user.profile.read",
    "user.profile.update"
  ]
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/api_keys/{api_key_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update API keys

**This endpoint allows you to update the name of an existing API Key.**

A JSON request body with a "name" property is required.

The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the Twilio SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

## URI Parameters

| URI Parameter   | Type  | Required?  | Description  |
|---|---|---|---|
|api_key_id |string | required | The ID of the API Key you are updating.|

### PATCH /api_keys/{api_key_id}


```javascript
  const data = {
  "name": "A New Hope"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/api_keys/{api_key_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete API keys

**This endpoint allows you to revoke an existing API Key**

Authentications using this API Key will fail after this request is made, with some small propagation delay. If the API Key ID does not exist an HTTP 404 will be returned.

The API Keys feature allows customers to be able to generate an API Key credential which can be used for authentication with the Twilio SendGrid v3 Web API or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

## URI Parameters

| URI Parameter   | Type  | Required?  | Description  |
|---|---|---|---|
|api_key_id |string | required | The ID of the API Key you are deleting.|

### DELETE /api_keys/{api_key_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/api_keys/{api_key_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve an existing API Key

**This endpoint allows you to retrieve a single API key.**

If the API Key ID does not exist an HTTP 404 will be returned.

### GET /api_keys/{api_key_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/api_keys/{api_key_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="asm"></a>
# ASM

## Create a new suppression group

**This endpoint allows you to create a new suppression group.**

Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example Daily Newsletters, Invoices, System Alerts.

The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

Each user can create up to 25 different suppression groups.

### POST /asm/groups


```javascript
  const data = {
  "description": "Suggestions for products our users might like.",
  "is_default": true,
  "name": "Product Suggestions"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/groups';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve information about multiple suppression groups

**This endpoint allows you to retrieve information about multiple suppression groups.**

This endpoint will return information for each group ID that you include in your request. To add a group ID to your request, just append `&id=` followed by the group ID.

Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).

Suppression groups, or [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html), allow you to label a category of content that you regularly send. This gives your recipients the ability to opt out of a specific set of your email. For example, you might define a group for your transactional email, and one for your marketing email so that your users can continue receiving your transactional email without having to receive your marketing content.

### GET /asm/groups


```javascript
  const queryParams = {
  'id': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/asm/groups';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a suppression group.

**This endpoint allows you to delete a suppression group.**

You can only delete groups that have not been attached to sent mail in the last 60 days. If a recipient uses the "one-click unsubscribe" option on an email associated with a deleted group, that recipient will be added to the global suppression list.

Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example Daily Newsletters, Invoices, System Alerts.

The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

Each user can create up to 25 different suppression groups.

### DELETE /asm/groups/{group_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/asm/groups/{group_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a suppression group.

**This endpoint allows you to update or change a suppression group.**

Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example Daily Newsletters, Invoices, System Alerts.

The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

Each user can create up to 25 different suppression groups.

### PATCH /asm/groups/{group_id}


```javascript
  const data = {
  "description": "Suggestions for items our users might like.",
  "id": 103,
  "name": "Item Suggestions"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/asm/groups/{group_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Get information on a single suppression group.

**This endpoint allows you to retrieve a single suppression group.**

Suppression groups, or unsubscribe groups, are specific types or categories of email that you would like your recipients to be able to unsubscribe from. For example Daily Newsletters, Invoices, System Alerts.

The **name** and **description** of the unsubscribe group will be visible by recipients when they are managing their subscriptions.

Each user can create up to 25 different suppression groups.

### GET /asm/groups/{group_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/asm/groups/{group_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add suppressions to a suppression group

**This endpoint allows you to add email addresses to an unsubscribe group.**

If you attempt to add suppressions to a group that has been deleted or does not exist, the suppressions will be added to the global suppressions list.

Suppressions are recipient email addresses that are added to [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html). Once a recipient's address is on the suppressions list for an unsubscribe group, they will not receive any emails that are tagged with that unsubscribe group.

### POST /asm/groups/{group_id}/suppressions


```javascript
  const data = {
  "recipient_emails": [
    "test1@example.com",
    "test2@example.com"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/groups/{group_id}/suppressions';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all suppressions for a suppression group

**This endpoint allows you to retrieve all suppressed email addresses belonging to the given group.**

Suppressions are recipient email addresses that are added to [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html). Once a recipient's address is on the suppressions list for an unsubscribe group, they will not receive any emails that are tagged with that unsubscribe group.

### GET /asm/groups/{group_id}/suppressions


```javascript
  request.method = 'GET';
  request.url = '/v3/asm/groups/{group_id}/suppressions';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Search for suppressions within a group

**This endpoint allows you to search a suppression group for multiple suppressions.**

When given a list of email addresses and a group ID, this endpoint will return only the email addresses that have been unsubscribed from the given group.

Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).

### POST /asm/groups/{group_id}/suppressions/search


```javascript
  const data = {
  "recipient_emails": [
    "exists1@example.com",
    "exists2@example.com",
    "doesnotexists@example.com"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/groups/{group_id}/suppressions/search';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a suppression from a suppression group

**This endpoint allows you to remove a suppressed email address from the given suppression group.**

Suppressions are recipient email addresses that are added to [unsubscribe groups](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html). Once a recipient's address is on the suppressions list for an unsubscribe group, they will not receive any emails that are tagged with that unsubscribe group.

### DELETE /asm/groups/{group_id}/suppressions/{email}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/asm/groups/{group_id}/suppressions/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all suppressions

**This endpoint allows you to retrieve a list of all suppressions.**

Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).

### GET /asm/suppressions


```javascript
  request.method = 'GET';
  request.url = '/v3/asm/suppressions';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add recipient addresses to the global suppression group.

**This endpoint allows you to add one or more email addresses to the global suppressions group.**

A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).

### POST /asm/suppressions/global


```javascript
  const data = {
  "recipient_emails": [
    "test1@example.com",
    "test2@example.com"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/asm/suppressions/global';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a Global Suppression

**This endpoint allows you to remove an email address from the global suppressions group.**

A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).

### DELETE /asm/suppressions/global/{email}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/asm/suppressions/global/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a Global Suppression

**This endpoint allows you to retrieve a global suppression. You can also use this endpoint to confirm if an email address is already globally suppressed.**

If the email address you include in the URL path parameter `{email}` is already globally suppressed, the response will include that email address. If the address you enter for `{email}` is not globally suppressed, an empty JSON object `{}` will be returned.

A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).

### GET /asm/suppressions/global/{email}


```javascript
  request.method = 'GET';
  request.url = '/v3/asm/suppressions/global/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all suppression groups for an email address

**This endpoint returns the list of all groups that the given email address has been unsubscribed from.**

Suppressions are a list of email addresses that will not receive content sent under a given [group](https://sendgrid.com/docs/API_Reference/Web_API_v3/Suppression_Management/groups.html).

### GET /asm/suppressions/{email}


```javascript
  request.method = 'GET';
  request.url = '/v3/asm/suppressions/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="browsers"></a>
# BROWSERS

## Retrieve email statistics from a browser.

**This endpoint allows you to retrieve your email statistics segmented by browser type.**

**We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).

### GET /browsers/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'browsers': 'test_string',
  'end_date': '2016-04-01',
  'limit': 'test_string',
  'offset': 'test_string',
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/browsers/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="campaigns"></a>
# CAMPAIGNS

## Create a Campaign

**This endpoint allows you to create a campaign.**

Our Marketing Campaigns API lets you create, manage, send, and schedule campaigns.

Note: To send or schedule the campaign, you will be required to provide a subject, sender ID, content (we suggest both HTML and Plain Text), and at least one list or segment ID. This information is not required when you create a campaign.

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### POST /campaigns


```javascript
  const data = {
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
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/campaigns';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all Campaigns

**This endpoint allows you to retrieve a list of all of your campaigns.**

Returns campaigns in reverse order they were created (newest first).

Returns an empty array if no campaigns exist.

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### GET /campaigns


```javascript
  const queryParams = {
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/campaigns';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a Campaign

Update a campaign. This is especially useful if you only set up the campaign using POST /campaigns, but didn't set many of the parameters.

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### PATCH /campaigns/{campaign_id}


```javascript
  const data = {
  "categories": [
    "summer line"
  ],
  "html_content": "<html><head><title></title></head><body><p>Check out our summer line!</p></body></html>",
  "plain_content": "Check out our summer line!",
  "subject": "New Products for Summer!",
  "title": "May Newsletter"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/campaigns/{campaign_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a Campaign

**This endpoint allows you to delete a specific campaign.**

Our Marketing Campaigns API lets you create, manage, send, and schedule campaigns.

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### DELETE /campaigns/{campaign_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/campaigns/{campaign_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a single campaign

**This endpoint allows you to retrieve a specific campaign.**

Our Marketing Campaigns API lets you create, manage, send, and schedule campaigns.

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### GET /campaigns/{campaign_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/campaigns/{campaign_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Unschedule a Scheduled Campaign

**This endpoint allows you to unschedule a campaign that has already been scheduled to be sent.**

A successful unschedule will return a 204.
If the specified campaign is in the process of being sent, the only option is to cancel (a different method).

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### DELETE /campaigns/{campaign_id}/schedules


```javascript
  request.method = 'DELETE';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Schedule a Campaign

**This endpoint allows you to schedule a specific date and time for your campaign to be sent.**

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### POST /campaigns/{campaign_id}/schedules


```javascript
  const data = {
  "send_at": 1489771528
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## View Scheduled Time of a Campaign

**This endpoint allows you to retrieve the date and time that the given campaign has been scheduled to be sent.**

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### GET /campaigns/{campaign_id}/schedules


```javascript
  request.method = 'GET';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a Scheduled Campaign

**This endpoint allows to you change the scheduled time and date for a campaign to be sent.**

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### PATCH /campaigns/{campaign_id}/schedules


```javascript
  const data = {
  "send_at": 1489451436
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/campaigns/{campaign_id}/schedules';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Send a Campaign

**This endpoint allows you to immediately send a campaign at the time you make the API call.**

Usually, a POST would have a request body, but since this endpoint is telling us to send a resource that is already created, a request body is not needed.

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### POST /campaigns/{campaign_id}/schedules/now


```javascript
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules/now';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Send a Test Campaign

**This endpoint allows you to send a test campaign.**

To send to multiple addresses, use an array for the JSON "to" value ["one@address","two@address"]

For more information:

* [User Guide > Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html)

### POST /campaigns/{campaign_id}/schedules/test


```javascript
  const data = {
  "to": "your.email@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/campaigns/{campaign_id}/schedules/test';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="categories"></a>
# CATEGORIES

## Retrieve all categories

**This endpoint allows you to retrieve a list of all of your categories.**

Categories can help organize your email analytics by enabling you to tag emails by type or broad topic. You can define your custom categories. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/categories.html).

### GET /categories


```javascript
  const queryParams = {
  'category': 'test_string',
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/categories';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve Email Statistics for Categories

**This endpoint allows you to retrieve all of your email statistics for each of your categories.**

If you do not define any query parameters, this endpoint will return a sum for each category in groups of 10.

Categories allow you to group your emails according to broad topics that you define. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/categories.html).

### GET /categories/stats


```javascript
const queryParams = {
  'aggregated_by': 'day',
  'categories': 'test_string',
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'start_date': '2016-01-01'
};
request.qs = queryParams;
request.method = 'GET';
request.url = '/v3/categories/stats';
client
  .request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```


**Attention:** in order to receive the email statistics for multiple categories at once, you need to set the `qsStringifyOptions` as follows:

```javascript
const client = require('@sendgrid/client')
client.setDefaultRequest('qsStringifyOptions', {arrayFormat: 'repeat'});

const request = {}
const queryParams = {
  'aggregated_by': 'day',
  'categories': ['test_category_1', 'cat facts'],
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'start_date': '2016-01-01'
};
request.qs = queryParams;
request.method = 'GET';
request.url = '/v3/categories/stats';
client
  .request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve sums of email stats for each category [Needs: Stats object defined, has category ID?]

**This endpoint allows you to retrieve the total sum of each email statistic for every category over the given date range.**

If you do not define any query parameters, this endpoint will return a sum for each category in groups of 10.

Categories allow you to group your emails according to broad topics that you define. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/categories.html).

### GET /categories/stats/sums


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'sort_by_direction': 'asc',
  'sort_by_metric': 'test_string',
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/categories/stats/sums';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="clients"></a>
# CLIENTS

## Retrieve email statistics by client type.

**This endpoint allows you to retrieve your email statistics segmented by client type.**

**We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).

### GET /clients/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/clients/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve stats by a specific client type.

**This endpoint allows you to retrieve your email statistics segmented by a specific client type.**

**We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

## Available Client Types
- phone
- tablet
- webmail
- desktop

Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).

### GET /clients/{client_type}/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/clients/{client_type}/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="contactdb"></a>
# CONTACTDB

## Create a Custom Field

**This endpoint allows you to create a custom field.**

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### POST /contactdb/custom_fields


```javascript
  const data = {
  "name": "pet",
  "type": "text"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/custom_fields';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all custom fields

**This endpoint allows you to retrieve all custom fields.**

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### GET /contactdb/custom_fields


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/custom_fields';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a Custom Field

**This endpoint allows you to delete a custom field by ID.**

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### DELETE /contactdb/custom_fields/{custom_field_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/contactdb/custom_fields/{custom_field_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a Custom Field

**This endpoint allows you to retrieve a custom field by ID.**

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### GET /contactdb/custom_fields/{custom_field_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/custom_fields/{custom_field_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create a List

**This endpoint allows you to create a list for your recipients.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### POST /contactdb/lists


```javascript
  const data = {
  "name": "your list name"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/lists';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete Multiple lists

**This endpoint allows you to delete multiple recipient lists.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### DELETE /contactdb/lists


```javascript
  const data = [
  1,
  2,
  3,
  4
];
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all lists

**This endpoint allows you to retrieve all of your recipient lists. If you don't have any lists, an empty array will be returned.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### GET /contactdb/lists


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/lists';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a List

**This endpoint allows you to delete a specific recipient list with the given ID.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### DELETE /contactdb/lists/{list_id}


```javascript
  const queryParams = {
  'delete_contacts': 'true'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists/{list_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a List

**This endpoint allows you to update the name of one of your recipient lists.**


The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### PATCH /contactdb/lists/{list_id}


```javascript
  const data = {
  "name": "newlistname"
};
  request.body = data;
  const queryParams = {
  'list_id': 1
};
  request.qs = queryParams;
  request.method = 'PATCH';
  request.url = '/v3/contactdb/lists/{list_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a single list

This endpoint allows you to retrieve a single recipient list.

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### GET /contactdb/lists/{list_id}


```javascript
  const queryParams = {
  'list_id': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/lists/{list_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add Multiple Recipients to a List

**This endpoint allows you to add multiple recipients to a list.**

Adds existing recipients to a list, passing in the recipient IDs to add. Recipient IDs should be passed exactly as they are returned from recipient endpoints.

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### POST /contactdb/lists/{list_id}/recipients


```javascript
  const data = [
  "recipient_id1",
  "recipient_id2"
];
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/lists/{list_id}/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all recipients on a List

**This endpoint allows you to retrieve all recipients on the list with the given ID.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### GET /contactdb/lists/{list_id}/recipients


```javascript
const queryParams = {
  'page': 1,
  'page_size': 1
};
request.qs = queryParams;
request.method = 'GET';
var list_id = 1;
request.url = '/v3/contactdb/lists/{list_id}/recipients';
client.request(request)
.then(([response, body]) => {
  console.log(response.statusCode);
  console.log(response.body);
})
```
## Add a Single Recipient to a List

**This endpoint allows you to add a single recipient to a list.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### POST /contactdb/lists/{list_id}/recipients/{recipient_id}


```javascript
  request.method = 'POST';
  request.url = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a Single Recipient from a Single List

**This endpoint allows you to delete a single recipient from a list.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### DELETE /contactdb/lists/{list_id}/recipients/{recipient_id}


```javascript
  const queryParams = {
  'list_id': 1,
  'recipient_id': 1
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add recipients

**This endpoint allows you to add a Marketing Campaigns recipient.**

You can add custom field data as a parameter on this endpoint. We have provided an example using some of the default custom fields Twilio SendGrid provides.

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### POST /contactdb/recipients


```javascript
  const data = [
  {
    "age": "25",
    "email": "example@example.com",
    "first_name": "",
    "last_name": "User"
  },
  {
    "age": "25",
    "email": "example2@example.com",
    "first_name": "Example",
    "last_name": "User"
  }
];
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete Recipient

**This endpoint allows you to delete one or more recipients.**

The body of an API call to this endpoint must include an array of recipient IDs of the recipients you want to delete.

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### DELETE /contactdb/recipients


```javascript
  const data = [
  "recipient_id1",
  "recipient_id2"
];
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve recipients

**This endpoint allows you to retrieve all of your Marketing Campaigns recipients.**

Batch deletion of a page makes it possible to receive an empty page of recipients before reaching the end of
the list of recipients. To avoid this issue; iterate over pages until a 404 is retrieved.

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### GET /contactdb/recipients


```javascript
  const queryParams = {
  'page': 1,
  'page_size': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Recipient

**This endpoint allows you to update one or more recipients.**

The body of an API call to this endpoint must include an array of one or more recipient objects.

It is of note that you can add custom field data as parameters on recipient objects. We have provided an example using some of the default custom fields Twilio SendGrid provides.

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### PATCH /contactdb/recipients


```javascript
  const data = [
  {
    "email": "jones@example.com",
    "first_name": "Guy",
    "last_name": "Jones"
  }
];
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/contactdb/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve the count of billable recipients

**This endpoint allows you to retrieve the number of Marketing Campaigns recipients that you will be billed for.**

You are billed for marketing campaigns based on the highest number of recipients you have had in your account at one time. This endpoint will allow you to know the current billable count value.

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### GET /contactdb/recipients/billable_count


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/billable_count';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a Count of Recipients

**This endpoint allows you to retrieve the total number of Marketing Campaigns recipients.**

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### GET /contactdb/recipients/count


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/count';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve recipients matching search criteria

**This endpoint allows you to perform a search on all of your Marketing Campaigns recipients.**

field_name:

* is a variable that is substituted for your actual custom field name from your recipient.
* Text fields must be URL encoded. Date fields are searchable only by Unix timestamp (e.g. 2/2/2015 becomes 1422835200)
* If field_name is a 'reserved' date field, such as created_at or updated_at, the system will internally convert
your epoch time to a date range encompassing the entire day. For example, an epoch time of 1422835600 converts to
Mon, 02 Feb 2015 00:06:40 GMT, but internally the system will search from Mon, 02 Feb 2015 00:00:00 GMT through
Mon, 02 Feb 2015 23:59:59 GMT.

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### GET /contactdb/recipients/search


```javascript
  const queryParams = {
  '{field_name}': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/search';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a Recipient

**This endpoint allows you to delete a single recipient with the given ID from your contact database.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### DELETE /contactdb/recipients/{recipient_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/contactdb/recipients/{recipient_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a single recipient

**This endpoint allows you to retrieve a single recipient by ID from your contact database.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### GET /contactdb/recipients/{recipient_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/{recipient_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve the lists that a recipient is on

**This endpoint allows you to retrieve the lists that a given recipient belongs to.**

Each recipient can be on many lists. This endpoint gives you all of the lists that any one recipient has been added to.

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

### GET /contactdb/recipients/{recipient_id}/lists


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/recipients/{recipient_id}/lists';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve reserved fields

**This endpoint allows you to list all fields that are reserved and can't be used for custom field names.**

The contactdb is a database of your contacts for [Twilio SendGrid Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html).

### GET /contactdb/reserved_fields


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/reserved_fields';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create a Segment

**This endpoint allows you to create a segment.**

All recipients in your contactdb will be added or removed automatically depending on whether they match the criteria for this segment.

List Id:

* Send this to segment from an existing list.
* Don't send this to segment from your entire contactdb.

Valid operators for create and update depend on the type of the field you are segmenting:

* **Dates:** "eq", "ne", "lt" (before), "gt" (after)
* **Text:** "contains", "eq" (is - matches the full field), "ne" (is not - matches any field where the entire field is not the condition value)
* **Numbers:** "eq", "lt", "gt"
* **Email Clicks and Opens:** "eq" (opened), "ne" (not opened)

Segment conditions using "eq" or "ne" for email clicks and opens should provide a "field" of either *clicks.campaign_identifier* or *opens.campaign_identifier*. The condition value should be a string containing the id of a completed campaign.

Segments may contain multiple conditions, joined by an "and" or "or" in the "and_or" field. The first condition in the conditions list must have an empty "and_or", and subsequent conditions must all specify an "and_or".

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).

### POST /contactdb/segments


```javascript
  const data = {
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
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/contactdb/segments';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all segments

**This endpoint allows you to retrieve all of your segments.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).

### GET /contactdb/segments


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/segments';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a segment

**This endpoint allows you to delete a segment from your recipients' database.**

You also have the option to delete all the contacts from your Marketing Campaigns recipient database who were in this segment.

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).

### DELETE /contactdb/segments/{segment_id}


```javascript
  const queryParams = {
  'delete_contacts': 'true'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/contactdb/segments/{segment_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a segment

**This endpoint allows you to update a segment.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).

### PATCH /contactdb/segments/{segment_id}


```javascript
  const data = {
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
  request.body = data;
  const queryParams = {
  'segment_id': 'test_string'
};
  request.qs = queryParams;
  request.method = 'PATCH';
  request.url = '/v3/contactdb/segments/{segment_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a segment

**This endpoint allows you to retrieve a single segment with the given ID.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).

### GET /contactdb/segments/{segment_id}


```javascript
  const queryParams = {
  'segment_id': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/segments/{segment_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve recipients on a segment

**This endpoint allows you to retrieve all of the recipients in a segment with the given ID.**

The Contacts API helps you manage your [Marketing Campaigns](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/index.html) recipients.

For more information about segments in Marketing Campaigns, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/lists.html#-Create-a-Segment).

### GET /contactdb/segments/{segment_id}/recipients


```javascript
  const queryParams = {
  'page': 1,
  'page_size': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/contactdb/segments/{segment_id}/recipients';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Get Contact Upload Status



### GET /contactdb/status


```javascript
  request.method = 'GET';
  request.url = '/v3/contactdb/status';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="devices"></a>
# DEVICES

## Retrieve email statistics by device type.

**This endpoint allows you to retrieve your email statistics segmented by the device type.**

**We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

## Available Device Types
| **Device** | **Description** | **Example** |
|---|---|---|
| Desktop | Email software on a desktop computer. | I.E., Outlook, Sparrow, or Apple Mail. |
| Webmail |	A web-based email client. | I.E., Yahoo, Google, AOL, or Outlook.com. |
| Phone | A smartphone. | iPhone, Android, Blackberry, etc.
| Tablet | A tablet computer. | iPad, Android-based tablet, etc. |
| Other | An unrecognized device. |

Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).

### GET /devices/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/devices/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="geo"></a>
# GEO

## Retrieve email statistics by country and state/province.

**This endpoint allows you to retrieve your email statistics segmented by country and state/province.**

**We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).

### GET /geo/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'country': 'US',
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/geo/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="ips"></a>
# IPS

## Add IPs

This endpoint is for adding a(n) IP Address(es) to your account.

### POST /ips


```javascript
  const data = {
  "count": 90323478,
  "subusers": [
    "subuser1",
    "subuser2"
  ],
  "user_can_send": true,
  "warmup": true
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all IP addresses

**This endpoint allows you to retrieve a list of all assigned and unassigned IPs.**

The response includes warm-up status, pools, assigned subusers, and authentication info. The start_date field corresponds to when warmup started for that IP.

A single IP address or a range of IP addresses may be dedicated to an account to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.

### GET /ips


```javascript
  const queryParams = {
  'exclude_whitelabels': 'true',
  'ip': 'test_string',
  'limit': 1,
  'offset': 1,
  'sort_by_direction': 'asc',
  'subuser': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/ips';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all assigned IPs

**This endpoint allows you to retrieve only assigned IP addresses.**

A single IP address or a range of IP addresses may be dedicated to an account to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.

### GET /ips/assigned


```javascript
  request.method = 'GET';
  request.url = '/v3/ips/assigned';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create an IP pool.

**This endpoint allows you to create an IP pool.**

**Each user can create up to 10 different IP pools.**

IP Pools allow you to group your dedicated Twilio SendGrid IP addresses. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

IP pools can only be used with authenticated IP addresses.

If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.

### POST /ips/pools


```javascript
  const data = {
  "name": "marketing"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips/pools';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all IP pools.

**This endpoint allows you to retrieve all of your IP pools.**

IP Pools allow you to group your dedicated Twilio SendGrid IP addresses. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

IP pools can only be used with authenticated IP addresses.

If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.

### GET /ips/pools


```javascript
  request.method = 'GET';
  request.url = '/v3/ips/pools';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update an IP pools name.

**This endpoint allows you to update the name of an IP pool.**

IP Pools allow you to group your dedicated Twilio SendGrid IP addresses. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

IP pools can only be used with authenticated IP addresses.

If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.

### PUT /ips/pools/{pool_name}


```javascript
  const data = {
  "name": "new_pool_name"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/ips/pools/{pool_name}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete an IP pool.

**This endpoint allows you to delete an IP pool.**

IP Pools allow you to group your dedicated Twilio SendGrid IP addresses. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

IP pools can only be used with authenticated IP addresses.

If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.

### DELETE /ips/pools/{pool_name}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/ips/pools/{pool_name}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all IPs in a specified pool.

**This endpoint allows you to list all of the IP addresses that are in a specific IP pool.**

IP Pools allow you to group your dedicated Twilio SendGrid IP addresses. For example, you could create separate pools for your transactional and marketing email. When sending marketing emails, specify that you want to use the marketing IP pool. This allows you to maintain separate reputations for your different email traffic.

IP pools can only be used with authenticated IP addresses.

If an IP pool is NOT specified for an email, it will use any IP available, including ones in pools.

### GET /ips/pools/{pool_name}


```javascript
  request.method = 'GET';
  request.url = '/v3/ips/pools/{pool_name}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add an IP address to a pool

**This endpoint allows you to add an IP address to an IP pool.**

You can add the same IP address to multiple pools. It may take up to 60 seconds for your IP address to be added to a pool after your request is made.

A single IP address or a range of IP addresses may be dedicated to an account to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.

### POST /ips/pools/{pool_name}/ips


```javascript
  const data = {
  "ip": "0.0.0.0"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips/pools/{pool_name}/ips';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Remove an IP address from a pool.

**This endpoint allows you to remove an IP address from an IP pool.**

The same IP address can be added to multiple IP pools.

A single IP address or a range of IP addresses may be dedicated to an account to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.

### DELETE /ips/pools/{pool_name}/ips/{ip}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/ips/pools/{pool_name}/ips/{ip}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Get remaining IPs count

This endpoint gets the amount of IP Addresses that can still be created during a given period and the price of those IPs.

### GET /ips/remaining


```javascript
  request.method = 'GET';
  request.url = '/v3/ips/remaining';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add an IP to warmup

**This endpoint allows you to enter an IP address into warmup mode.**

Twilio SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how Twilio SendGrid limits your email traffic for IPs in warmup.

For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).

### POST /ips/warmup


```javascript
  const data = {
  "ip": "0.0.0.0"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/ips/warmup';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all IPs currently in warmup

**This endpoint allows you to retrieve all of your IP addresses that are currently warming up.**

Twilio SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how Twilio SendGrid limits your email traffic for IPs in warmup.

For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).

### GET /ips/warmup


```javascript
  request.method = 'GET';
  request.url = '/v3/ips/warmup';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Remove an IP from warmup

**This endpoint allows you to remove an IP address from warmup mode.**

Twilio SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how Twilio SendGrid limits your email traffic for IPs in warmup.

For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).

### DELETE /ips/warmup/{ip_address}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/ips/warmup/{ip_address}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve warmup status for a specific IP address

**This endpoint allows you to retrieve the warmup status for a specific IP address.**

Twilio SendGrid can automatically warm up dedicated IP addresses by limiting the amount of mail that can be sent through them per hour, with the limit determined by how long the IP address has been in warmup. See the [warmup schedule](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_warmup_schedule.html) for more details on how Twilio SendGrid limits your email traffic for IPs in warmup.

For more general information about warming up IPs, please see our [Classroom](https://sendgrid.com/docs/Classroom/Deliver/Delivery_Introduction/warming_up_ips.html).

### GET /ips/warmup/{ip_address}


```javascript
  request.method = 'GET';
  request.url = '/v3/ips/warmup/{ip_address}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all IP pools an IP address belongs to

**This endpoint allows you to see which IP pools a particular IP address has been added to.**

The same IP address can be added to multiple IP pools.

A single IP address or a range of IP addresses may be dedicated to an account to send email for multiple domains. The reputation of this IP is based on the aggregate performance of all the senders who use it.

### GET /ips/{ip_address}


```javascript
  request.method = 'GET';
  request.url = '/v3/ips/{ip_address}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="mail"></a>
# MAIL

## Create a batch ID

**This endpoint allows you to generate a new batch ID. This batch ID can be associated with scheduled sends via the mail/send endpoint.**

If you set the SMTPAPI header `batch_id`, it allows you to then associate multiple scheduled mail/send requests together with the same ID. Then at any time up to 10 minutes before the scheduled date, you can cancel all of the mail/send requests that have this batch ID by calling the Cancel Scheduled Send endpoint.

More Information:

* [Scheduling Parameters > Batch ID](https://sendgrid.com/docs/API_Reference/SMTP_API/scheduling_parameters.html)

### POST /mail/batch


```javascript
  request.method = 'POST';
  request.url = '/v3/mail/batch';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Validate batch ID

**This endpoint allows you to validate a batch ID.**

If you set the SMTPAPI header `batch_id`, it allows you to then associate multiple scheduled mail/send requests together with the same ID. Then at any time up to 10 minutes before the scheduled date, you can cancel all of the mail/send requests that have this batch ID by calling the Cancel Scheduled Send endpoint.

More Information:

* [Scheduling Parameters > Batch ID](https://sendgrid.com/docs/API_Reference/SMTP_API/scheduling_parameters.html)

### GET /mail/batch/{batch_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/mail/batch/{batch_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## v3 Mail Send

This endpoint allows you to send an email over Twilio SendGrid's v3 Web API, the most recent version of our API. If you are looking for documentation about the v2 Mail Send endpoint, please see our [v2 API Reference](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

* Top level parameters are referred to as "global".
* Individual fields within the personalizations array will override any other global, or message level, parameters that are defined outside of personalizations.

**Twilio SendGrid provides libraries to help you quickly and easily integrate with the v3 Web API in 7 different languages: [C#](https://github.com/sendgrid/sendgrid-csharp), [Go](https://github.com/sendgrid/sendgrid-go), [Java](https://github.com/sendgrid/sendgrid-java), [Node JS](https://github.com/sendgrid/sendgrid-nodejs), [PHP](https://github.com/sendgrid/sendgrid-php), [Python](https://github.com/sendgrid/sendgrid-python), and [Ruby](https://github.com/sendgrid/sendgrid-ruby).**


For more detailed information about how to use the v3 Mail Send endpoint, please visit our [Classroom](https://sendgrid.com/docs/Classroom/Send/v3_Mail_Send/index.html).

### POST /mail/send

// This endpoint has a helper, check it out [here](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail).

```javascript
  const data = {
  "content": [
    {
      "type": "text/html",
      "value": "<html><p>Hello, world!</p></html>"
    }
  ],
  "from": {
    "email": "sam.smith@example.com",
    "name": "Sam Smith"
  },
  "personalizations": [
    {
      "subject": "Hello, World!",
      "to": [
        {
          "email": "john.doe@example.com",
          "name": "John Doe"
        }
      ]
    }
  ],
  "reply_to": {
    "email": "sam.smith@example.com",
    "name": "Sam Smith"
  },
  "subject": "Hello, World!"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/mail/send';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="mail-settings"></a>
# MAIL SETTINGS

## Retrieve all mail settings

**This endpoint allows you to retrieve a list of all mail settings.**

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings


```javascript
  const queryParams = {
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/mail_settings';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update address whitelist mail settings

**This endpoint allows you to update your current email address whitelist settings.**

The address whitelist setting whitelists a specified email address or domain for which mail should never be suppressed. For example, you own the domain example.com, and one or more of your recipients use email@example.com addresses, by placing example.com in the address whitelist setting, all bounces, blocks, and unsubscribes logged for that domain will be ignored and sent as if under normal sending conditions.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/address_whitelist


```javascript
  const data = {
  "enabled": true,
  "list": [
    "email1@example.com",
    "example.com"
  ]
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/address_whitelist';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve address whitelist mail settings

**This endpoint allows you to retrieve your current email address whitelist settings.**

The address whitelist setting whitelists a specified email address or domain for which mail should never be suppressed. For example, you own the domain example.com, and one or more of your recipients use email@example.com addresses, by placing example.com in the address whitelist setting, all bounces, blocks, and unsubscribes logged for that domain will be ignored and sent as if under normal sending conditions.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/address_whitelist


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/address_whitelist';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update BCC mail settings

**This endpoint allows you to update your current BCC mail settings.**

When the BCC mail setting is enabled, Twilio SendGrid will automatically send a blind carbon copy (BCC) to an address for every email sent without adding that address to the header. Please note that only one email address may be entered in this field if you wish to distribute BCCs to multiple addresses you will need to create a distribution group or use forwarding rules.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/bcc


```javascript
  const data = {
  "email": "email@example.com",
  "enabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/bcc';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all BCC mail settings

**This endpoint allows you to retrieve your current BCC mail settings.**

When the BCC mail setting is enabled, Twilio SendGrid will automatically send a blind carbon copy (BCC) to an address for every email sent without adding that address to the header. Please note that only one email address may be entered in this field if you wish to distribute BCCs to multiple addresses you will need to create a distribution group or use forwarding rules.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/bcc


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/bcc';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update bounce purge mail settings

**This endpoint allows you to update your current bounce purge settings.**

This setting allows you to set a schedule for Twilio SendGrid to automatically delete contacts from your soft and hard bounce suppression lists.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/bounce_purge


```javascript
  const data = {
  "enabled": true,
  "hard_bounces": 5,
  "soft_bounces": 5
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/bounce_purge';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve bounce purge mail settings

**This endpoint allows you to retrieve your current bounce purge settings.**

This setting allows you to set a schedule for Twilio SendGrid to automatically delete contacts from your soft and hard bounce suppression lists.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/bounce_purge


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/bounce_purge';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update footer mail settings

**This endpoint allows you to update your current Footer mail settings.**

The footer setting will insert a custom footer at the bottom of the text and HTML bodies. Use the embedded HTML editor and plain text entry fields to create the content of the footers to be inserted into your emails.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/footer


```javascript
  const data = {
  "enabled": true,
  "html_content": "...",
  "plain_content": "..."
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/footer';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve footer mail settings

**This endpoint allows you to retrieve your current Footer mail settings.**

The footer setting will insert a custom footer at the bottom of the text and HTML bodies. Use the embedded HTML editor and plain text entry fields to create the content of the footers to be inserted into your emails.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/footer


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/footer';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update forward bounce mail settings

**This endpoint allows you to update your current bounce forwarding mail settings.**

Activating this setting allows you to specify an email address to which bounce reports are forwarded.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/forward_bounce


```javascript
  const data = {
  "email": "example@example.com",
  "enabled": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/forward_bounce';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve forward bounce mail settings

**This endpoint allows you to retrieve your current bounce forwarding mail settings.**

Activating this setting allows you to specify an email address to which bounce reports are forwarded.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/forward_bounce


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/forward_bounce';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update forward spam mail settings

**This endpoint allows you to update your current Forward Spam mail settings.**

Enabling the forward spam setting allows you to specify an email address to which spam reports will be forwarded.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/forward_spam


```javascript
  const data = {
  "email": "",
  "enabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/forward_spam';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve forward spam mail settings

**This endpoint allows you to retrieve your current Forward Spam mail settings.**

Enabling the forward spam setting allows you to specify an email address to which spam reports will be forwarded.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/forward_spam


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/forward_spam';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update plain content mail settings

**This endpoint allows you to update your current Plain Content mail settings.**

The plain content setting will automatically convert any plain text emails that you send to HTML before sending.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/plain_content


```javascript
  const data = {
  "enabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/plain_content';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve plain content mail settings

**This endpoint allows you to retrieve your current Plain Content mail settings.**

The plain content setting will automatically convert any plain text emails that you send to HTML before sending.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/plain_content


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/plain_content';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update spam check mail settings

**This endpoint allows you to update your current spam checker mail settings.**

The spam checker filter notifies you when emails are detected that exceed a predefined spam threshold.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/spam_check


```javascript
  const data = {
  "enabled": true,
  "max_score": 5,
  "url": "url"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/spam_check';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve spam check mail settings

**This endpoint allows you to retrieve your current Spam Checker mail settings.**

The spam checker filter notifies you when emails are detected that exceed a predefined spam threshold.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/spam_check


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/spam_check';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update template mail settings

**This endpoint allows you to update your current legacy email template settings.**

This setting refers to our original email templates. We currently support more fully featured [transactional templates](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

The legacy email template setting wraps an HTML template around your email content. This can be useful for sending out marketing email and/or other HTML formatted messages.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### PATCH /mail_settings/template


```javascript
  const data = {
  "enabled": true,
  "html_content": "<% body %>"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/mail_settings/template';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve legacy template mail settings

**This endpoint allows you to retrieve your current legacy email template settings.**

This setting refers to our original email templates. We currently support more fully featured [transactional templates](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

The legacy email template setting wraps an HTML template around your email content. This can be useful for sending out marketing email and/or other HTML formatted messages.

Mail settings allow you to tell Twilio SendGrid specific things to do to every email that you send to your recipients over Twilio SendGrid's [Web API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html) or [SMTP Relay](https://sendgrid.com/docs/API_Reference/SMTP_API/index.html).

### GET /mail_settings/template


```javascript
  request.method = 'GET';
  request.url = '/v3/mail_settings/template';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="mailbox-providers"></a>
# MAILBOX PROVIDERS

## Retrieve email statistics by mailbox provider.

**This endpoint allows you to retrieve your email statistics segmented by recipient mailbox provider.**

**We only store up to 7 days of email activity in our database.** By default, 500 items will be returned per request via the Advanced Stats API endpoints.

Advanced Stats provide a more in-depth view of your email statistics and the actions taken by your recipients. You can segment these statistics by geographic location, device type, client type, browser, and mailbox provider. For more information about statistics, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/index.html).

### GET /mailbox_providers/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'limit': 1,
  'mailbox_providers': 'test_string',
  'offset': 1,
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/mailbox_providers/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="messages"></a>
# MESSAGES

## Filter all messages
> In order to gain access to the Email Activity Feed API, you must purchase [additional email activity history](https://app.sendgrid.com/settings/billing/addons/email_activity).

Filter all messages to search your Email Activity. All queries need to be [URL encoded](https://meyerweb.com/eric/tools/dencoder/), and have this format:

`query={query_type}="{query_content}"`

encoded, this would look like this:

`query=type%3D%22query_content%22`

for example:

Filter by a specific email - `query=to_email%3D%22example%40example.com%22`

Filter by subject line - `query=subject%3d%22A%20Great%20Subject%22`

You can filter by other operators besides `=`. We also accept `!=`, `<`, and `>`.

If you use the `@sendgrid/client` library, you do not have to encode anything (it will end up being double encoded).

For a tutorial on how to get started, check out [Getting Started with the Email Activity API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Tutorials/getting_started_email_activity_api.html).

**Full list of basic query types and examples:**
(replace the data in quotes with the information you want to query)

<table>
  <tr>
    <th><b>Query</b></th>
    <th><b>Unencoded example</b> (put this one into the try it out query - it'll automatically encode it for you)</th>
    <th><b>Encoded example</b> (use this one in your code)</th>
  </tr>
  <tr>
    <td><code>msg_id</code></td>
    <td><code>msg_id="filter0307p1las1-16816-5A023E36-1.0"</code></td>
    <td><code>msg_id%3D%22filter0307p1las1-16816-5A023E36-1.0%22</code></td>
  </tr>
  <tr>
    <td><code>from_email</code></td>
    <td><code>from_email="testing@sendgrid.net"</code></td>
    <td><code>from_email%3D%22testing%40sendgrid.net%22</code></td>
  </tr>
  <tr>
    <td><code>subject</code></td>
    <td><code>subject="This is a subject test"</code></td>
    <td><code>subject%22This%20is%20a%20subject%20test%22</code></td>
  </tr>
  <tr>
    <td><code>to_email</code></td>
    <td><code>to_email="example@example.com"</code></td>
    <td><code>to_email%3D%22example%40example.com%22</code></td>
  </tr>
  <tr>
    <td><code>status</code></td>
    <td><code>status="processed"</code></td>
    <td><code>status%22processed%22</code></td>
  </tr>
  <tr>
    <td><code>template_id</code></td>
    <td><code>template_id="8f0d27bc-cf8f-42d3-b951-3990af7d0619"</code></td>
    <td><code>template_id%3D%228f0d27bc-cf8f-42d3-b951-3990af7d0619%22</code></td>
  </tr>
  <tr>
    <td><code>template_name</code></td>
    <td><code>template_name="example_template"</code></td>
    <td><code>template_name%3D%22example_template%22</code></td>
  </tr>
  <tr>
    <td><code>campaign_name</code></td>
    <td><code>campaign_name="example_campaign"</code></td>
    <td><code>campaign_name%3D%22example_campaign%22</code></td>
  </tr>
  <tr>
    <td><code>campaign_id</code></td>
    <td><code>campaign_id="1453849"</code></td>
    <td><code>campaign_id%3D%221453849%22</code></td>
  </tr>
  <tr>
    <td><code>api_key_id</code></td>
    <td><code>api_key_id="-hVjtoFgGUNPq3DPPPkJN3mCIDIwrl3qdFZcqYKnlq94"</code> (everything after the middle dot in the API key)</td>
    <td><code>api_key_id%3D%22-hVjtoFgGUNPq3DPPPkJN3mCIDIwrl3qdFZcqYKnlq94%22</code></td>
  </tr>
  <tr>
    <td><code>api_key_name</code></td>
    <td><code>api_key_name="test_name"</code></td>
    <td><code>api_key_name%3D%22test_name%22</code></td>
  </tr>
  <tr>
    <td><code>events</code></td>
    <td><code>status="processed"</code></td>
    <td><code>status%3D%22processed%22</code></td>
  </tr>
  <tr>
    <td><code>originating_ip</code> - this is the IP address of the person sending the message</td>
    <td><code>originating_ip="4.77.777.77"</code></td>
    <td><code>originating_ip%3D%224.77.777.77%22</code></td>
  </tr>
  <tr>
    <td><code>categories</code> - custom tags that you create</td>
    <td><code>categories="category_example"</code></td>
    <td><code>categories="category_example"</code></td>
  </tr>
  <tr>
    <td><code>unique_args</code> - custom tracking arguments that you can attach to SMTP API calls</td>
    <td><code>unique_args="example argument"</code></td>
    <td><code>unique_args%3D%22example%20argument%22</code></td>
  </tr>
  <tr>
    <td><code>outbound_ip</code> - this is the Twilio SendGrid dedicated IP address used to send the email</td>
    <td><code>outbound_ip="4.77.777.77"</code></td>
    <td><code>outbound_ip%3D%224.77.777.77%22</code></td>
  </tr>
  <tr>
    <td><code>last_event_time</code></td>
    <td><code>last_event_time="2017-11-07T23:13:58Z"</code></td>
    <td><code>last_event_time%3D%E2%80%9C2017-11-07T23%3A13%3A58Z%E2%80%9D</code></td>
  </tr>
  <tr>
    <td><code>clicks</code></td>
    <td><code>clicks="0"</code></td>
    <td><code>clicks%3D%220%22</code></td>
  </tr>
  <tr>
    <td><code>unsubscribe_group_name</code></td>
    <td><code>unsubscribe_group_name="Global Unsubscribes"</code></td>
    <td><code>unsubscribe_group_name%3D%22Global%20Unsubscribes%22</code></td>
  </tr>
  <tr>
    <td><code>unsubscribe_group_id</code></td>
    <td><code>unsubscribe_group_id="1041"</code></td>
    <td><code>unsubscribe_group_id%3D%221041%22</code></td>
  </tr>
  <tr>
    <td><code>teammate</code> - teamates username</td>
    <td><code>teammate="my_username"</code></td>
    <td><code>teammate%3D%22my_username%22</code></td>
  </tr>
</table>

For information about building combined queries, see [Building compound Email Activity queries](https://sendgrid.com/docs/API_Reference/Web_API_v3/Tutorials/getting_started_email_activity_api.html#-Creating-compound-queries).

### GET /messages


```javascript
  const queryParams = {
    'limit': 10,
    'query': 'from_email="testing@sendgrid.net"'
  };
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/messages';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Filter messages by message ID

> In order to gain access to the Email Activity Feed API, you must purchase [additional email activity history](https://app.sendgrid.com/settings/billing/addons/email_activity).

Get all of the details about the specified message.

### GET /messages/{msg_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/messages/{msg_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Request a CSV

> In order to gain access to the Email Activity Feed API, you must purchase [additional email activity history](https://app.sendgrid.com/settings/billing/addons/email_activity).

This request kicks of a process to generate a CSV file. When the file is generated, the email that is listed as the account owner gets an email that links out to the file that is ready for download. The link expires in 3 days.

The CSV fill contain the last 1 million messages. This endpoint will be rate limited to 1 request every 12 hours.

### POST /messages/download


```javascript
  request.method = 'POST';
  request.url = '/v3/messages/download';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Download CSV

> In order to gain access to the Email Activity Feed API, you must purchase [additional email activity history](https://app.sendgrid.com/settings/billing/addons/email_activity).

Download the CSV that you requested with the POST Request a CSV.

When the file is generated, the email that is listed as the account owner gets an email that links out to the file that is ready for download. The link expires in 3 days.

The CSV fill contain the last 1 million messages. This endpoint will be rate limited to 1 request every 12 hours.

### GET /messages/download/{download_uuid}


```javascript
  request.method = 'POST';
  request.url = '/v3/messages/download';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="partner-settings"></a>
# PARTNER SETTINGS

## Returns a list of all partner settings.

**This endpoint allows you to retrieve a list of all partner settings that you can enable.**

Our partner settings allow you to integrate your Twilio SendGrid account with our partners to increase your Twilio SendGrid experience and functionality. For more information about our partners, and how you can begin integrating with them, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/partners.html).

### GET /partner_settings


```javascript
  const queryParams = {
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/partner_settings';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Updates New Relic partner settings.

**This endpoint allows you to update or change your New Relic partner settings.**

Our partner settings allow you to integrate your Twilio SendGrid account with our partners to increase your Twilio SendGrid experience and functionality. For more information about our partners, and how you can begin integrating with them, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/partners.html).

By integrating with New Relic, you can send your Twilio SendGrid email statistics to your New Relic Dashboard. If you enable this setting, your stats will be sent to New Relic every 5 minutes. You will need your New Relic License Key to enable this setting. For more information, please see our [Classroom](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/new_relic.html).

### PATCH /partner_settings/new_relic


```javascript
  const data = {
  "enable_subuser_statistics": true,
  "enabled": true,
  "license_key": ""
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/partner_settings/new_relic';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Returns all New Relic partner settings.

**This endpoint allows you to retrieve your current New Relic partner settings.**

Our partner settings allow you to integrate your Twilio SendGrid account with our partners to increase your Twilio SendGrid experience and functionality. For more information about our partners, and how you can begin integrating with them, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/partners.html).

By integrating with New Relic, you can send your Twilio SendGrid email statistics to your New Relic Dashboard. If you enable this setting, your stats will be sent to New Relic every 5 minutes. You will need your New Relic License Key to enable this setting. For more information, please see our [Classroom](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/new_relic.html).

### GET /partner_settings/new_relic


```javascript
  request.method = 'GET';
  request.url = '/v3/partner_settings/new_relic';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="scopes"></a>
# SCOPES

## Retrieve a list of scopes for which this user has access.

**This endpoint returns a list of all scopes that this user has access to.**

API Keys can be used to authenticate the use of [Twilio SendGrid's v3 Web API](https://sendgrid.com/docs/API_Reference/Web_API_v3/index.html), or the [Mail API Endpoint](https://sendgrid.com/docs/API_Reference/Web_API/mail.html). API Keys may be assigned specific permissions, or scopes, that limit which API endpoints they can access. For a more detailed explanation of how you can use API Key permissions, please visit our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/api_keys.html#-API-Key-Permissions) or [Classroom](https://sendgrid.com/docs/Classroom/Basics/API/api_key_permissions.html).

### GET /scopes


```javascript
  request.method = 'GET';
  request.url = '/v3/scopes';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve access requests

This endpoint allows you to retrieve a list of all recent access requests.

**Note:** The Response Header's 'link' parameter will include pagination info. For example:

link: ```<https://api.sendgrid.com/v3/scopes/requests?limit=10&offset=0>; rel="first"; title="1", <https://api.sendgrid.com/v3/scopes/requests?limit=10&offset=10>; rel="last"; title="2", <https://api.sendgrid.com/v3/scopes/requests?limit=10&offset=0>; rel="prev"; title="1"```

### GET /scopes/requests


```javascript
  const queryParams = {
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/scopes/requests';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Deny access request

This endpoint allows you to deny an attempt to access your account.

**Note:** Only teammate admins may delete a teammate's access request.

### DELETE /scopes/requests/{request_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/scopes/requests/{request_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Approve access request

This endpoint allows you to approve an access attempt.

**Note:** Only teammate admins may approve another teammates access request.

### PATCH /scopes/requests/{request_id}/approve


```javascript
  request.method = 'PATCH';
  request.url = '/v3/scopes/requests/{request_id}/approve';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="senders"></a>
# SENDERS

## Create a Sender Identity

**This endpoint allows you to create a new sender identity.**

*You may create up to 100 unique sender identities.*

Sender Identities are required to be verified before use. If your domain has been authenticated it will auto verify on creation. Otherwise, an email will be sent to the `from.email`.

### POST /senders


```javascript
  const data = {
  "address": "123 Elm St.",
  "address_2": "Apt. 456",
  "city": "Denver",
  "country": "United States",
  "from": {
    "email": "from@example.com",
    "name": "Example INC"
  },
  "nickname": "My Sender ID",
  "reply_to": {
    "email": "replyto@example.com",
    "name": "Example INC"
  },
  "state": "Colorado",
  "zip": "80202"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/senders';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Get all Sender Identities

**This endpoint allows you to retrieve a list of all sender identities that have been created for your account.**

Sender Identities are required to be verified before use. If your domain has been authenticated it will auto verify on creation. Otherwise, an email will be sent to the `from.email`.

### GET /senders


```javascript
  request.method = 'GET';
  request.url = '/v3/senders';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## View a Sender Identity

**This endpoint allows you to retrieve a specific sender identity.**

Sender Identities are required to be verified before use. If your domain has been authenticated it will auto verify on creation. Otherwise, an email will be sent to the `from.email`.

### GET /senders/{sender_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/senders/{sender_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a Sender Identity

**This endpoint allows you to delete one of your sender identities.**

Sender Identities are required to be verified before use. If your domain has been authenticated it will auto verify on creation. Otherwise, an email will be sent to the `from.email`.

### DELETE /senders/{sender_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/senders/{sender_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a Sender Identity

**This endpoint allows you to update a sender identity.**

Updates to `from.email` require re-verification. If your domain has been authenticated it will auto verify on creation. Otherwise, an email will be sent to the `from.email`.

Partial updates are allowed, but fields that are marked as "required" in the POST (create) endpoint must not be nil if that field is included in the PATCH request.

### PATCH /senders/{sender_id}


```javascript
  const data = {
  "address": "123 Elm St.",
  "address_2": "Apt. 456",
  "city": "Denver",
  "country": "United States",
  "from": {
    "email": "from@example.com",
    "name": "Example INC"
  },
  "nickname": "My Sender ID",
  "reply_to": {
    "email": "replyto@example.com",
    "name": "Example INC"
  },
  "state": "Colorado",
  "zip": "80202"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/senders/{sender_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Resend Sender Identity Verification

**This endpoint allows you to resend a sender identity verification email.**

Sender Identities are required to be verified before use. If your domain has been authenticated it will auto verify on creation. Otherwise, an email will be sent to the `from.email`.

### POST /senders/{sender_id}/resend_verification


```javascript
  request.method = 'POST';
  request.url = '/v3/senders/{sender_id}/resend_verification';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```

<a name="sender-authentication"></a>
# SENDER AUTHENTICATION

## Create a domain authentication.

**This endpoint allows you to create an authentication for one of your domains.**

If you are creating a domain authentication that you would like a subuser to use, you have two options:
1. Use the "username" parameter. This allows you to create an authenticated domain on behalf of your subuser. This means the subuser can see and modify the created authenticated domain.
2. Use the Association workflow (see Associate Domain section). This allows you to assign a domain authentication created by the parent to a subuser. This means the subuser will default to the assigned authenticated domain, but will not be able to see or modify that authentication. However, if the subuser creates their domain authentication it will overwrite the assigned domain authentication.

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

### POST /whitelabel/domains


```javascript
  const data = {
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
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## List all domain authentications.

**This endpoint allows you to retrieve a list of all domain authentications you have created.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

### GET /whitelabel/domains


```javascript
  const queryParams = {
  'domain': 'test_string',
  'exclude_subusers': 'true',
  'limit': 1,
  'offset': 1,
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Get the default domain authentication.

**This endpoint allows you to retrieve the default authentication for a domain.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

## URI Parameters
| URI Parameter   | Type   | Description  |
|---|---|---|
| domain | string  |The domain to find a default domain whitelabel for. |

### GET /whitelabel/domains/default


```javascript
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/default';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Disassociate a domain authentication from a given user.

**This endpoint allows you to disassociate a specific authentication from a subuser.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

Domain authentications can be associated with (i.e. assigned to) subusers from a parent account. This functionality allows subusers to send mail using their parent's authenticated domains. To associate a domain authentication with a subuser, the parent account must first create the domain authentication and validate it. The parent may then associate the domain authentication via the subuser management tools.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

## URI Parameters
| URI Parameter   | Type  | Required?  | Description  |
|---|---|---|---|
| username | string  | required  | Username for the subuser to find associated whitelabels for. |

### DELETE /whitelabel/domains/subuser


```javascript
  const data = None;
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/subuser';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## List the domain authentications associated with the given user.

**This endpoint allows you to retrieve all of the domain authentications that have been assigned to a specific subuser.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

Domain authentications can be associated with (i.e. assigned to) subusers from a parent account. This functionality allows subusers to send mail using their parent's authenticated domains. To associate a domain authentication with a subuser, the parent account must first create the domain authentication and validate it. The parent may then associate the domain authentication via the subuser management tools.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

## URI Parameters
| URI Parameter   | Type  | Description  |
|---|---|---|
| username | string  | Username of the subuser to find associated whitelabels for. |

### GET /whitelabel/domains/subuser


```javascript
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/subuser';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a domain authentication.

**This endpoint allows you to delete a domain authentication.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

### DELETE /whitelabel/domains/{domain_id}


```javascript
  const data = None;
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a domain authentication.

**This endpoint allows you to update the settings for a domain authentication.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

### PATCH /whitelabel/domains/{domain_id}


```javascript
  const data = {
  "custom_spf": true,
  "default": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a domain authentication.

**This endpoint allows you to retrieve a specific domain authentication.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

### GET /whitelabel/domains/{domain_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/whitelabel/domains/{domain_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Associate a domain authentication with a given user.

**This endpoint allows you to associate a specific domain authentication with a subuser.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

Domain authentications can be associated with (i.e. assigned to) subusers from a parent account. This functionality allows subusers to send mail using their parent's authenticated domains. To associate a domain authentication with a subuser, the parent account must first create the domain authentication and validate it. The parent may then associate the domain authentication via the subuser management tools.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

## URI Parameters
| URI Parameter   | Type   | Description  |
|---|---|---|
| domain_id | integer   | ID of the domain whitelabel to associate with the subuser. |

### POST /whitelabel/domains/{domain_id}/subuser


```javascript
  const data = {
  "username": "jane@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{domain_id}/subuser';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Add an IP to a domain authentication.

**This endpoint allows you to add an IP address to a domain authentication.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

## URI Parameters
| URI Parameter   | Type  |  Description  |
|---|---|---|
| id | integer  | ID of the domain to which you are adding an IP |

### POST /whitelabel/domains/{id}/ips


```javascript
  const data = {
  "ip": "192.168.0.1"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{id}/ips';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Remove an IP from a domain authentication.

**This endpoint allows you to remove a domain's IP address from that domain's authentication.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

## URI Parameters
| URI Parameter   | Type  | Description  |
|---|---|---|
| id | integer  | ID of the domain whitelabel to delete the IP from. |
| ip | string | IP to remove from the domain whitelabel. |

### DELETE /whitelabel/domains/{id}/ips/{ip}


```javascript
  const data = None;
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/domains/{id}/ips/{ip}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Validate a domain authentication.

**This endpoint allows you to validate a domain authentication. If it fails, it will return an error message describing why the domain authentication could not be validated.**

A domain authentication allows you to remove the via or sent on behalf of message that your recipients see when they read your emails. Authenticating a domain allows you to replace sendgrid.net with your sending domain. You will be required to create a subdomain so that Twilio SendGrid can generate the DNS records which you must give to your host provider. If you choose to use Automated Security, Twilio SendGrid will provide you with 3 CNAME records. If you turn Automated Security off, you will be given 2 TXT records and 1 MX record.

For more information on domain authentication, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/)

## URI Parameters
| URI Parameter   | Type   | Description  |
|---|---|---|
| id | integer  |ID of the domain whitelabel to validate. |

### POST /whitelabel/domains/{id}/validate


```javascript
  const data = None;
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/domains/{id}/validate';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create reverse DNS record

**This endpoint allows you to create a reverse DNS record.**

When creating a reverse DNS record, you should use the same subdomain that you used when you created a domain authentication.

Reverse DNS consists of a subdomain and domain that will be used to generate a record for a given IP. Once Twilio SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-reverse-dns/).

### POST /whitelabel/ips


```javascript
  const data = {
  "domain": "example.com",
  "ip": "192.168.1.1",
  "subdomain": "email"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/ips';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all reverse DNS records

**This endpoint allows you to retrieve all of the reverse DNS records that have been created by this account.**

You may include a search key by using the "ip" parameter. This enables you to perform a prefix search for a given IP segment (e.g. "192.").

Reverse DNS consists of a subdomain and domain that will be used to generate a record for a given IP. Once Twilio SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-reverse-dns/).

### GET /whitelabel/ips


```javascript
  const queryParams = {
  'ip': 'test_string',
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/ips';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete an reverse DNS record

**This endpoint allows you to delete an reverse DNS record.**

Reverse DNS consists of a subdomain and domain that will be used to generate a record for a given IP. Once Twilio SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-reverse-dns/).

### DELETE /whitelabel/ips/{id}


```javascript
  const data = None;
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/ips/{id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve an reverse DNS record

**This endpoint allows you to retrieve an reverse DNS record.**

Reverse DNS consists of a subdomain and domain that will be used to generate a record for a given IP. Once Twilio SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-reverse-dns/).

### GET /whitelabel/ips/{id}


```javascript
  request.method = 'GET';
  request.url = '/v3/whitelabel/ips/{id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Validate an reverse DNS record

**This endpoint allows you to validate an reverse DNS record.**

Reverse DNS consists of a subdomain and domain that will be used to generate a record for a given IP. Once Twilio SendGrid has verified that the appropriate A record for the IP has been created, the appropriate reverse DNS record for the IP is generated.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-reverse-dns/).

### POST /whitelabel/ips/{id}/validate


```javascript
  const data = None;
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/ips/{id}/validate';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create a Branded Link

**This endpoint allows you to create a new link branding.**

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### POST /whitelabel/links


```javascript
  const data = {
  "default": true,
  "domain": "example.com",
  "subdomain": "mail"
};
  request.body = data;
  const queryParams = {
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'POST';
  request.url = '/v3/whitelabel/links';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all link brandings

**This endpoint allows you to retrieve all link brandings.**

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### GET /whitelabel/links


```javascript
  const queryParams = {
  'limit': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/links';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a Default Link Branding

**This endpoint allows you to retrieve the default link branding.**

Default link branding is the actual link branding to be used when sending messages. If there are multiple link brandings, the default is determined by the following order:
<ul>
  <li>Validated link branding marked as "default"</li>
  <li>Legacy link brands (migrated from the whitelabel wizard)</li>
  <li>Default SendGrid link whitelabel (i.e. 100.ct.sendgrid.net)</li>
</ul>

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### GET /whitelabel/links/default


```javascript
  const queryParams = {
  'domain': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/default';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```

### DELETE /whitelabel/links/subuser


```javascript
  const data = None;
  request.body = data;
  const queryParams = {
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/links/subuser';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve Associated Link Branding

**This endpoint allows you to retrieve the associated link branding for a subuser.**

Link branding can be associated with subusers from the parent account. This functionality allows
subusers to send mail using their parent's link brands. To associate a link branding, the parent account
must first create a branded link and validate it. The parent may then associate that branded link with a subuser via the API or the Subuser Management page in the user interface.

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### GET /whitelabel/links/subuser


```javascript
  const queryParams = {
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/subuser';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Disassociate a Link Branding

**This endpoint allows you to disassociate a link branding from a subuser.**

Link branding can be associated with subusers from the parent account. This functionality allows
subusers to send mail using their parent's link brands. To associate a link branding, the parent account
must first create a branded link and validate it. The parent may then associate that branded link with a subuser via the API or the Subuser Management page in the user interface.

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

## Delete a Link Branding

**This endpoint allows you to delete a link branding.**

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### DELETE /whitelabel/links/{id}


```javascript
  const data = None;
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/whitelabel/links/{id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a Link Branding

**This endpoint allows you to update a specific link branding. You can use this endpoint to change a branded link's default status.**

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### PATCH /whitelabel/links/{id}


```javascript
  const data = {
  "default": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/whitelabel/links/{id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a Link Branding

**This endpoint allows you to retrieve a specific link branding.**

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### GET /whitelabel/links/{id}


```javascript
  request.method = 'GET';
  request.url = '/v3/whitelabel/links/{id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Validate a Link Branding

**This endpoint allows you to validate a link branding.**

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### POST /whitelabel/links/{id}/validate


```javascript
  const data = None;
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/links/{id}/validate';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
# Associate a Link Branding

**This endpoint allows you to associate a link branding with a subuser account.**

Link branding can be associated with subusers from the parent account. This functionality allows
subusers to send mail using their parent's link brands. To associate a link branding, the parent account
must first create a branded link and validate it. The parent may then associate that branded link with a subuser via the API or the Subuser Management page in the user interface.

Email link branding allow all of the click-tracked links you send in your emails to include the URL of your domain instead of sendgrid.net.

For more information, please see our [User Guide](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/).

### POST /whitelabel/links/{link_id}/subuser


```javascript
  const data = {
  "username": "jane@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/whitelabel/links/{link_id}/subuser';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```

<a name="stats"></a>
# STATS

## Retrieve global email statistics

**This endpoint allows you to retrieve all of your global email statistics between a given date range.**

Parent accounts will see aggregated stats for their account and all subuser accounts. Subuser accounts will only see their stats.

### GET /stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="subusers"></a>
# SUBUSERS

## Create Subuser

This endpoint allows you to retrieve a list of all of your subusers. You can choose to retrieve specific subusers as well as limit the results that come back from the API.

For more information about Subusers:

* [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
* [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)

### POST /subusers


```javascript
  const data = {
  "email": "John@example.com",
  "ips": [
    "1.1.1.1",
    "2.2.2.2"
  ],
  "password": "johns_password",
  "username": "John@example.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/subusers';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## List all Subusers

This endpoint allows you to retrieve a list of all of your subusers. You can choose to retrieve specific subusers as well as limit the results that come back from the API.

For more information about Subusers:

* [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
* [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)

### GET /subusers


```javascript
  const queryParams = {
  'limit': 1,
  'offset': 1,
  'username': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve Subuser Reputations

Subuser sender reputations give a good idea how well a sender is doing with regards to how recipients and recipient servers react to the mail that is being received. When a bounce, spam report, or other adverse action happens on a sent email, it will affect your sender rating.

This endpoint allows you to request the reputations for your subusers.

### GET /subusers/reputations


```javascript
  const queryParams = {
  'usernames': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/reputations';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve email statistics for your subusers.

**This endpoint allows you to retrieve the email statistics for the given subusers.**

You may retrieve statistics for up to 10 different subusers by including an additional _subusers_ parameter for each additional subuser.

While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).

### GET /subusers/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'start_date': '2016-01-01',
  'subusers': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve monthly stats for all subusers

**This endpoint allows you to retrieve the monthly email statistics for all subusers over the given date range.**

While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats for your subusers. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

When using the `sort_by_metric` to sort your stats by a specific metric, you can not sort by the following metrics:
`bounce_drops`, `deferred`, `invalid_emails`, `processed`, `spam_report_drops`, `spam_reports`, or `unsubscribe_drops`.

For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).

### GET /subusers/stats/monthly


```javascript
  const queryParams = {
  'date': 'test_string',
  'limit': 1,
  'offset': 1,
  'sort_by_direction': 'asc',
  'sort_by_metric': 'test_string',
  'subuser': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/stats/monthly';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
##  Retrieve the totals for each email statistic metric for all subusers.

**This endpoint allows you to retrieve the total sums of each email statistic metric for all subusers over the given date range.**


While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).

### GET /subusers/stats/sums


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'limit': 1,
  'offset': 1,
  'sort_by_direction': 'asc',
  'sort_by_metric': 'test_string',
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/stats/sums';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a subuser

This endpoint allows you to delete a subuser. This is a permanent action, once deleted a subuser cannot be retrieved.

For more information about Subusers:

* [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
* [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)

### DELETE /subusers/{subuser_name}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/subusers/{subuser_name}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Enable/disable a subuser

This endpoint allows you to enable or disable a subuser.

For more information about Subusers:

* [User Guide > Subusers](https://sendgrid.com/docs/User_Guide/Settings/Subusers/index.html)
* [Classroom > How do I add more subusers to my account?](https://sendgrid.com/docs/Classroom/Basics/Account/how_do_i_add_more_subusers_to_my_account.html)

### PATCH /subusers/{subuser_name}


```javascript
  const data = {
  "disabled": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/subusers/{subuser_name}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update IPs assigned to a subuser

Each subuser should be assigned to an IP address, from which all of this subuser's mail will be sent. Often, this is the same IP as the parent account, but each subuser can have their own, or multiple, IP addresses as well.

More information:

* [How to request more IPs](https://sendgrid.com/docs/Classroom/Basics/Account/adding_an_additional_dedicated_ip_to_your_account.html)
* [How to setup reverse DNS](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-reverse-dns/)

### PUT /subusers/{subuser_name}/ips


```javascript
  const data = [
  "127.0.0.1"
];
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/subusers/{subuser_name}/ips';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Monitor Settings for a subuser

Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.

### PUT /subusers/{subuser_name}/monitor


```javascript
  const data = {
  "email": "example@example.com",
  "frequency": 500
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create monitor settings

Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.

### POST /subusers/{subuser_name}/monitor


```javascript
  const data = {
  "email": "example@example.com",
  "frequency": 50000
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete monitor settings

Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.

### DELETE /subusers/{subuser_name}/monitor


```javascript
  request.method = 'DELETE';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve monitor settings for a subuser

Subuser monitor settings allow you to receive a sample of an outgoing message by a specific customer at a specific frequency of emails.

### GET /subusers/{subuser_name}/monitor


```javascript
  request.method = 'GET';
  request.url = '/v3/subusers/{subuser_name}/monitor';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve the monthly email statistics for a single subuser

**This endpoint allows you to retrieve the monthly email statistics for a specific subuser.**

While you can always view the statistics for all email activity on your account, subuser statistics enable you to view specific segments of your stats for your subusers. Emails sent, bounces, and spam reports are always tracked for subusers. Unsubscribes, clicks, and opens are tracked if you have enabled the required settings.

When using the `sort_by_metric` to sort your stats by a specific metric, you can not sort by the following metrics:
`bounce_drops`, `deferred`, `invalid_emails`, `processed`, `spam_report_drops`, `spam_reports`, or `unsubscribe_drops`.

For more information, see our [User Guide](https://sendgrid.com/docs/User_Guide/Statistics/subuser.html).

### GET /subusers/{subuser_name}/stats/monthly


```javascript
  const queryParams = {
  'date': 'test_string',
  'limit': 1,
  'offset': 1,
  'sort_by_direction': 'asc',
  'sort_by_metric': 'test_string'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/subusers/{subuser_name}/stats/monthly';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="suppression"></a>
# SUPPRESSION

## Delete blocks

**This endpoint allows you to delete all email addresses on your blocks list.**

There are two options for deleting blocked emails:

1. You can delete all blocked emails by setting `delete_all` to true in the request body.
2. You can delete some blocked emails by specifying the email addresses in an array in the request body.

[Blocks](https://sendgrid.com/docs/Glossary/blocks.html) happen when your message was rejected for a reason related to the message, not the recipient address. This can happen when your mail server IP address has been added to a blacklist or blocked by an ISP, or if a filter flags the message content on the receiving server.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).

### DELETE /suppression/blocks


```javascript
  const data = {
  "delete_all": false,
  "emails": [
    "example1@example.com",
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/blocks';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all blocks

**This endpoint allows you to retrieve a list of all email addresses that are currently on your blocks list.**

There are several causes for [blocked](https://sendgrid.com/docs/Glossary/blocks.html) emails: for example, your mail server IP address is on an ISP blacklist, or blocked by an ISP, or if the receiving server flags the message content.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).

### GET /suppression/blocks


```javascript
  const queryParams = {
  'end_time': 1,
  'limit': 1,
  'offset': 1,
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/blocks';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a specific block

**This endpoint allows you to delete a specific email address from your blocks list.**

[Blocks](https://sendgrid.com/docs/Glossary/blocks.html) happen when your message was rejected for a reason related to the message, not the recipient address. This can happen when your mail server IP address has been added to a blacklist or blocked by an ISP, or if a filter flags the message content on the receiving server.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).

### DELETE /suppression/blocks/{email}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/suppression/blocks/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a specific block

**This endpoint allows you to retrieve a specific email address from your blocks list.**

[Blocks](https://sendgrid.com/docs/Glossary/blocks.html) happen when your message was rejected for a reason related to the message, not the recipient address. This can happen when your mail server IP address has been added to a blacklist or blocked by an ISP, or if a filter flags the message content on the receiving server.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/blocks.html).

### GET /suppression/blocks/{email}


```javascript
  request.method = 'GET';
  request.url = '/v3/suppression/blocks/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete bounces

**This endpoint allows you to delete all of your bounces. You can also use this endpoint to remove a specific email address from your bounce list.**

A bounced email is when the message is undeliverable and then returned to the server that sent it.

For more information see:

* [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
* [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)
* [Classroom > List Scrubbing Guide](https://sendgrid.com/docs/Classroom/Deliver/list_scrubbing.html)

Note: the `delete_all` and `emails` parameters should be used independently of each other as they have different purposes.

### DELETE /suppression/bounces


```javascript
  const data = {
  "delete_all": true,
  "emails": [
    "example@example.com",
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/bounces';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all bounces

**This endpoint allows you to retrieve all of your bounces.**

A bounced email is when the message is undeliverable and then returned to the server that sent it.

For more information see:

* [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
* [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)

### GET /suppression/bounces


```javascript
  const queryParams = {
  'end_time': 1,
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/bounces';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a bounce

**This endpoint allows you to remove an email address from your bounce list.**

A bounced email is when the message is undeliverable and then returned to the server that sent it. This endpoint allows you to delete a single email address from your bounce list.

For more information see:

* [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
* [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)
* [Classroom > List Scrubbing Guide](https://sendgrid.com/docs/Classroom/Deliver/list_scrubbing.html)

### DELETE /suppression/bounces/{email}


```javascript
  const queryParams = {
  'email_address': 'example@example.com'
};
  request.qs = queryParams;
  request.method = 'DELETE';
  request.url = '/v3/suppression/bounces/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a Bounce

**This endpoint allows you to retrieve a specific bounce for a given email address.**

A bounced email is when the message is undeliverable and then returned to the server that sent it.

For more information see:

* [User Guide > Bounces](https://sendgrid.com/docs/User_Guide/Suppressions/bounces.html) for more information
* [Glossary > Bounces](https://sendgrid.com/docs/Glossary/Bounces.html)
* [Classroom > List Scrubbing Guide](https://sendgrid.com/docs/Classroom/Deliver/list_scrubbing.html)

### GET /suppression/bounces/{email}


```javascript
  request.method = 'GET';
  request.url = '/v3/suppression/bounces/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete invalid emails

**This endpoint allows you to remove email addresses from your invalid email address list.**

There are two options for deleting invalid email addresses:

1) You can delete all invalid email addresses by setting `delete_all` to true in the request body.
2) You can delete some invalid email addresses by specifying the addresses in an array in the request body.

An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipients' mail server.

Examples include addresses without the @ sign or addresses that include certain special characters and/or spaces. This response can come from our server or the recipient mail server.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).

### DELETE /suppression/invalid_emails


```javascript
  const data = {
  "delete_all": false,
  "emails": [
    "example1@example.com",
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/invalid_emails';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all invalid emails

**This endpoint allows you to retrieve a list of all invalid email addresses.**

An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipients' mail server.

Examples include addresses without the @ sign or addresses that include certain special characters and/or spaces. This response can come from our server or the recipient mail server.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).

### GET /suppression/invalid_emails


```javascript
  const queryParams = {
  'end_time': 1,
  'limit': 1,
  'offset': 1,
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/invalid_emails';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a specific invalid email

**This endpoint allows you to remove a specific email address from the invalid email address list.**

An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipients' mail server.

Examples include addresses without the @ sign or addresses that include certain special characters and/or spaces. This response can come from our server or the recipient mail server.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).

### DELETE /suppression/invalid_emails/{email}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/suppression/invalid_emails/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a specific invalid email

**This endpoint allows you to retrieve a specific invalid email address.**

An invalid email occurs when you attempt to send email to an address that is formatted in a manner that does not meet internet email format standards or the email does not exist at the recipients' mail server.

Examples include addresses without the @ sign or addresses that include certain special characters and/or spaces. This response can come from our server or the recipient mail server.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/invalid_emails.html).

### GET /suppression/invalid_emails/{email}


```javascript
  request.method = 'GET';
  request.url = '/v3/suppression/invalid_emails/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete spam reports

**This endpoint allows you to delete your spam reports.**

There are two options for deleting spam reports:

1) You can delete all spam reports by setting "delete_all" to true in the request body.
2) You can delete some spam reports by specifying the email addresses in an array in the request body.

[Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to Twilio SendGrid.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).

### DELETE /suppression/spam_reports


```javascript
  const data = {
  "delete_all": false,
  "emails": [
    "example1@example.com",
    "example2@example.com"
  ]
};
  request.body = data;
  request.method = 'DELETE';
  request.url = '/v3/suppression/spam_reports';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all spam reports

**This endpoint allows you to retrieve all spam reports.**

[Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to Twilio SendGrid.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).

### GET /suppression/spam_reports


```javascript
  const queryParams = {
  'end_time': 1,
  'limit': 1,
  'offset': 1,
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/spam_reports';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a specific spam report

**This endpoint allows you to delete a specific spam report.**

[Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to Twilio SendGrid.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).

### DELETE /suppression/spam_reports/{email}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/suppression/spam_reports/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a specific spam report

**This endpoint allows you to retrieve a specific spam report.**

[Spam reports](https://sendgrid.com/docs/Glossary/spam_reports.html) happen when a recipient indicates that they think your email is [spam](https://sendgrid.com/docs/Glossary/spam.html) and then their email provider reports this to Twilio SendGrid.

For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/spam_reports.html).

### GET /suppression/spam_reports/{email}


```javascript
  request.method = 'GET';
  request.url = '/v3/suppression/spam_reports/{email}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all global suppressions

**This endpoint allows you to retrieve a list of all email addresses that are globally suppressed.**

A global suppression (or global unsubscribe) is an email address of a recipient who does not want to receive any of your messages. A globally suppressed recipient will be removed from any email you send. For more information, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Suppressions/global_unsubscribes.html).

### GET /suppression/unsubscribes


```javascript
  const queryParams = {
  'end_time': 1,
  'limit': 1,
  'offset': 1,
  'start_time': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/suppression/unsubscribes';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="teammates"></a>
# TEAMMATES

## Invite teammate

This endpoint allows you to send a teammate invitation via email with a predefined set of scopes, or permissions.

**Note:** A teammate invite will expire after 7 days, but you may resend the invite at any time to reset the expiration date.

Essentials, [Legacy Lite](https://sendgrid.com/docs/Classroom/Basics/Billing/legacy_lite_plan.html), and Free Trial users may create up to one teammate per account. There are no limits for how many teammates a Pro or higher account may create.

### POST /teammates


```javascript
  const data = {
  "email": "teammate1@example.com",
  "is_admin": false,
  "scopes": [
    "user.profile.read",
    "user.profile.update"
  ]
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/teammates';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all teammates

This endpoint allows you to retrieve a list of all current teammates.

**Note:** The Response Header will include pagination info. For example:

link: ```<https://api.sendgrid.com/v3/teammates?limit=10&offset=0>; rel="first"; title="1", <https://api.sendgrid.com/v3/teammates?limit=10&offset=10>; rel="last"; title="2", <https://api.sendgrid.com/v3/teammates?limit=10&offset=0>; rel="prev"; title="1"```

### GET /teammates


```javascript
  const queryParams = {
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/teammates';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all pending teammates

This endpoint allows you to retrieve a list of all pending teammate invitations.

**Note:** Each teammate invitation is valid for 7 days. Users may resend the invite to refresh the expiration date.

### GET /teammates/pending


```javascript
  request.method = 'GET';
  request.url = '/v3/teammates/pending';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete pending teammate

This endpoint allows you to delete a pending teammate invite.

### DELETE /teammates/pending/{token}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/teammates/pending/{token}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Resend teammate invite

This endpoint allows you to resend a teammate invite.

**Note:** Teammate invitations will expire after 7 days. Resending an invite will reset the expiration date.

### POST /teammates/pending/{token}/resend


```javascript
  request.method = 'POST';
  request.url = '/v3/teammates/pending/{token}/resend';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete teammate

This endpoint allows you to delete a teammate.

**Only the parent user or an admin teammate can delete another teammate.**

### DELETE /teammates/{username}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/teammates/{username}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update teammate's permissions

This endpoint allows you to update a teammate's permissions.

To turn a teammate into an admin, the request body should contain an `is_admin` set to `true`. Otherwise, set `is_admin` to `false` and pass in all the scopes that a teammate should have.

**Only the parent user or other admin teammates can update another teammate's permissions.**

**Admin users can only update permissions.**

### PATCH /teammates/{username}


```javascript
  const data = {
  "is_admin": false,
  "scopes": [
    "user.profile.read",
    "user.profile.edit"
  ]
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/teammates/{username}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve specific teammate

This endpoint allows you to retrieve a specific teammate by username.

### GET /teammates/{username}


```javascript
  request.method = 'GET';
  request.url = '/v3/teammates/{username}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="templates"></a>
# TEMPLATES

## Create a transactional template.

**This endpoint allows you to create a transactional template.**

Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

Transactional templates are templates explicitly created for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

### POST /templates


```javascript
  const data = {
  "name": "example_name"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/templates';
  request.generation = 'dynamic'
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all transactional templates.

**This endpoint allows you to retrieve all transactional templates.**

Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

Transactional templates are templates explicitly created for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

### GET all dynamic /templates

```javascript
  request.method = 'GET';
  request.url = '/v3/templates?generations=dynamic';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```

### GET all legacy /templates


```javascript
  request.method = 'GET';
  request.url = '/v3/templates?generations=legacy';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```

### GET all /templates

```javascript
  request.method = 'GET';
  request.url = '/v3/templates?generations=legacy,dynamic';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```

## Delete a template.

**This endpoint allows you to delete a transactional template.**

Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

Transactional templates are templates explicitly created for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

### DELETE /templates/{template_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/templates/{template_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Edit a transactional template.

**This endpoint allows you to edit a transactional template.**

Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

Transactional templates are templates explicitly created for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

### PATCH /templates/{template_id}


```javascript
  const data = {
  "name": "new_example_name"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/templates/{template_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a single transactional template.

**This endpoint allows you to retrieve a single transactional template.**

Each user can create up to 300 different transactional templates. Transactional templates are specific to accounts and subusers. Templates created on a parent account will not be accessible from the subuser accounts.

Transactional templates are templates explicitly created for transactional email and are not to be confused with [Marketing Campaigns templates](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/templates.html). For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

### GET /templates/{template_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/templates/{template_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create a new transactional template version.

**This endpoint allows you to create a new version of a template.**

Each transactional template can have multiple versions, each version with unique subject and content. Each user can have up to 300 versions across all templates.

For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

### POST /templates/{template_id}/versions


```javascript
  const data = {
  "active": 1,
  "html_content": "<%body%>",
  "name": "example_version_name",
  "plain_content": "<%body%>",
  "subject": "<%subject%>",
  "template_id": "ddb96bbc-9b92-425e-8979-99464621b543"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/templates/{template_id}/versions';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a transactional template version.

**This endpoint allows you to delete one of your transactional template versions.**

Each transactional template can have multiple versions, each version with unique subject and content. Each user can have up to 300 versions across all templates.

For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

## URI Parameters
| URI Parameter | Type | Description |
|---|---|---|
| template_id | string | The ID of the original template |
| version_id | string | The ID of the template version |

### DELETE /templates/{template_id}/versions/{version_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Edit a transactional template version.

**This endpoint allows you to edit a version of one of your transactional templates.**

Each transactional template can have multiple versions, each version with unique subject and content. Each user can have up to 300 versions across all templates.

For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

## URI Parameters
| URI Parameter | Type | Description |
|---|---|---|
| template_id | string | The ID of the original template |
| version_id | string | The ID of the template version |

### PATCH /templates/{template_id}/versions/{version_id}


```javascript
  const data = {
  "active": 1,
  "html_content": "<%body%>",
  "name": "updated_example_name",
  "plain_content": "<%body%>",
  "subject": "<%subject%>"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a specific transactional template version.

**This endpoint allows you to retrieve a specific version of a template.**

Each transactional template can have multiple versions, each version with unique subject and content. Each user can have up to 300 versions across all templates.

For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

## URI Parameters
| URI Parameter | Type | Description |
|---|---|---|
| template_id | string | The ID of the original template |
| version_id | string |  The ID of the template version |

### GET /templates/{template_id}/versions/{version_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/templates/{template_id}/versions/{version_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Activate a transactional template version.

**This endpoint allows you to activate a version of one of your templates.**

Each transactional template can have multiple versions, each version with unique subject and content. Each user can have up to 300 versions across all templates.


For more information about transactional templates, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html).

## URI Parameters
| URI Parameter | Type | Description |
|---|---|---|
| template_id | string | The ID of the original template |
| version_id | string |  The ID of the template version |

### POST /templates/{template_id}/versions/{version_id}/activate


```javascript
  request.method = 'POST';
  request.url = '/v3/templates/{template_id}/versions/{version_id}/activate';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="tracking-settings"></a>
# TRACKING SETTINGS

## Retrieve Tracking Settings

**This endpoint allows you to retrieve a list of all tracking settings that you can enable on your account.**

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### GET /tracking_settings


```javascript
  const queryParams = {
  'limit': 1,
  'offset': 1
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/tracking_settings';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Click Tracking Settings

**This endpoint allows you to change your current click tracking setting. You can enable, or disable, click tracking using this endpoint.**

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### PATCH /tracking_settings/click


```javascript
  const data = {
  "enabled": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/click';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve Click Track Settings

**This endpoint allows you to retrieve your current click tracking setting.**

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### GET /tracking_settings/click


```javascript
  request.method = 'GET';
  request.url = '/v3/tracking_settings/click';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Google Analytics Settings

**This endpoint allows you to update your current setting for Google Analytics.**

For more information about using Google Analytics, please refer to [Googles URL Builder](https://support.google.com/analytics/answer/1033867?hl=en) and their article on ["Best Practices for Campaign Building"](https://support.google.com/analytics/answer/1037445).

We default the settings to Googles recommendations. For more information, see [Google Analytics Demystified](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/google_analytics_demystified_ga_statistics_vs_sg_statistics.html).

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### PATCH /tracking_settings/google_analytics


```javascript
  const data = {
  "enabled": true,
  "utm_campaign": "website",
  "utm_content": "",
  "utm_medium": "email",
  "utm_source": "sendgrid.com",
  "utm_term": ""
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/google_analytics';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve Google Analytics Settings

**This endpoint allows you to retrieve your current setting for Google Analytics.**

For more information about using Google Analytics, please refer to [Googles URL Builder](https://support.google.com/analytics/answer/1033867?hl=en) and their article on ["Best Practices for Campaign Building"](https://support.google.com/analytics/answer/1037445).

We default the settings to Googles recommendations. For more information, see [Google Analytics Demystified](https://sendgrid.com/docs/Classroom/Track/Collecting_Data/google_analytics_demystified_ga_statistics_vs_sg_statistics.html).

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### GET /tracking_settings/google_analytics


```javascript
  request.method = 'GET';
  request.url = '/v3/tracking_settings/google_analytics';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Open Tracking Settings

**This endpoint allows you to update your current settings for open tracking.**

Open Tracking adds an invisible image at the end of the email which can track email opens. If the email recipient has images enabled on their email client, a request to Twilio SendGrid's server for the invisible image is executed and an open event is logged. These events are logged in the Statistics portal, Email Activity interface, and reported by the Event Webhook.

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### PATCH /tracking_settings/open


```javascript
  const data = {
  "enabled": true
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/open';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Get Open Tracking Settings

**This endpoint allows you to retrieve your current settings for open tracking.**

Open Tracking adds an invisible image at the end of the email which can track email opens. If the email recipient has images enabled on their email client, a request to Twilio SendGrid's server for the invisible image is executed and an open event is logged. These events are logged in the Statistics portal, Email Activity interface, and reported by the Event Webhook.

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### GET /tracking_settings/open


```javascript
  request.method = 'GET';
  request.url = '/v3/tracking_settings/open';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Subscription Tracking Settings

**This endpoint allows you to update your current settings for subscription tracking.**

Subscription tracking adds links to the bottom of your emails that allows your recipients to subscribe to, or unsubscribe from, your emails.

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### PATCH /tracking_settings/subscription


```javascript
  const data = {
  "enabled": true,
  "html_content": "html content",
  "landing": "landing page html",
  "plain_content": "text content",
  "replace": "replacement tag",
  "url": "url"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/tracking_settings/subscription';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve Subscription Tracking Settings

**This endpoint allows you to retrieve your current settings for subscription tracking.**

Subscription tracking adds links to the bottom of your emails that allows your recipients to subscribe to, or unsubscribe from, your emails.

You can track a variety of the actions your recipients may take when interacting with your emails including opening your emails, clicking on links in your emails, and subscribing to (or unsubscribing from) your emails.

For more information about tracking, please see our [User Guide](https://sendgrid.com/docs/User_Guide/Settings/tracking.html).

### GET /tracking_settings/subscription


```javascript
  request.method = 'GET';
  request.url = '/v3/tracking_settings/subscription';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
<a name="user"></a>
# USER

## Get a user's account information.

**This endpoint allows you to retrieve your user account details.**

Your user's account information includes the user's account type and reputation.

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

### GET /user/account


```javascript
  request.method = 'GET';
  request.url = '/v3/user/account';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve your credit balance

**This endpoint allows you to retrieve the current credit balance for your account.**

Your monthly credit allotment limits the number of emails you may send before incurring overage charges. For more information about credits and billing, please visit our [Classroom](https://sendgrid.com/docs/Classroom/Basics/Billing/billing_info_and_faqs.html).

### GET /user/credits


```javascript
  request.method = 'GET';
  request.url = '/v3/user/credits';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update your account email address

**This endpoint allows you to update the email address currently on file for your account.**

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

### PUT /user/email


```javascript
  const data = {
  "email": "example@example.com"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/user/email';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve your account email address

**This endpoint allows you to retrieve the email address currently on file for your account.**

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

### GET /user/email


```javascript
  request.method = 'GET';
  request.url = '/v3/user/email';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update your password

**This endpoint allows you to update your password.**

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

### PUT /user/password


```javascript
  const data = {
  "new_password": "new_password",
  "old_password": "old_password"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/user/password';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a user's profile

**This endpoint allows you to update your current profile details.**

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

It should be noted that any one or more of the parameters can be updated via the PATCH /user/profile endpoint. The only requirement is that you include at least one when you PATCH.

### PATCH /user/profile


```javascript
  const data = {
  "city": "Orange",
  "first_name": "Example",
  "last_name": "User"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/profile';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Get a user's profile

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

### GET /user/profile


```javascript
  request.method = 'GET';
  request.url = '/v3/user/profile';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Cancel or pause a scheduled send

**This endpoint allows you to cancel or pause an email that has been scheduled to be sent.**

If the maximum number of cancellations/pauses are added, HTTP 400 will
be returned.

The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends canceled less than 10 minutes before the scheduled time are not guaranteed to be canceled.

### POST /user/scheduled_sends


```javascript
  const data = {
  "batch_id": "YOUR_BATCH_ID",
  "status": "pause"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/user/scheduled_sends';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all scheduled sends

**This endpoint allows you to retrieve all cancel/paused scheduled send information.**

The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends canceled less than 10 minutes before the scheduled time are not guaranteed to be canceled.

### GET /user/scheduled_sends


```javascript
  request.method = 'GET';
  request.url = '/v3/user/scheduled_sends';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a cancellation or pause of a scheduled send

**This endpoint allows you to delete the cancellation/pause of a scheduled send.**

The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends canceled less than 10 minutes before the scheduled time are not guaranteed to be canceled.

### DELETE /user/scheduled_sends/{batch_id}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update user scheduled send information

**This endpoint allows you to update the status of a scheduled send for the given `batch_id`.**

The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends canceled less than 10 minutes before the scheduled time are not guaranteed to be canceled.

### PATCH /user/scheduled_sends/{batch_id}


```javascript
  const data = {
  "status": "pause"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve scheduled send

**This endpoint allows you to retrieve the cancel/paused scheduled send information for a specific `batch_id`.**

The Cancel Scheduled Sends feature allows the customer to cancel a scheduled send based on a Batch ID included in the SMTPAPI header. Scheduled sends canceled less than 10 minutes before the scheduled time are not guaranteed to be canceled.

### GET /user/scheduled_sends/{batch_id}


```javascript
  request.method = 'GET';
  request.url = '/v3/user/scheduled_sends/{batch_id}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Enforced TLS settings

**This endpoint allows you to update your current Enforced TLS settings.**

The Enforced TLS settings specify whether or not the recipient is required to support TLS or have a valid certificate. See the [SMTP Ports User Guide](https://sendgrid.com/docs/Classroom/Basics/Email_Infrastructure/smtp_ports.html) for more information on opportunistic TLS.

**Note:** If either setting is enabled and the recipient does not support TLS or have a valid certificate, we drop the message and send a block event with TLS required but not supported as the description.

### PATCH /user/settings/enforced_tls


```javascript
  const data = {
  "require_tls": true,
  "require_valid_cert": false
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/settings/enforced_tls';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve current Enforced TLS settings.

**This endpoint allows you to retrieve your current Enforced TLS settings.**

The Enforced TLS settings specify whether or not the recipient is required to support TLS or have a valid certificate. See the [SMTP Ports User Guide](https://sendgrid.com/docs/Classroom/Basics/Email_Infrastructure/smtp_ports.html) for more information on opportunistic TLS.

**Note:** If either setting is enabled and the recipient does not support TLS or have a valid certificate, we drop the message and send a block event with TLS required but not supported as the description.

### GET /user/settings/enforced_tls


```javascript
  request.method = 'GET';
  request.url = '/v3/user/settings/enforced_tls';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update your username

**This endpoint allows you to update the username for your account.**

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

### PUT /user/username


```javascript
  const data = {
  "username": "test_username"
};
  request.body = data;
  request.method = 'PUT';
  request.url = '/v3/user/username';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve your username

**This endpoint allows you to retrieve your current account username.**

Keeping your user profile up to date is essential. This will help Twilio SendGrid to verify who you are as well as contact you should we need to.

For more information about your user profile:

* [Twilio SendGrid Account Settings](https://sendgrid.com/docs/User_Guide/Settings/account.html)

### GET /user/username


```javascript
  request.method = 'GET';
  request.url = '/v3/user/username';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update Event Notification Settings

**This endpoint allows you to update your current event webhook settings.**

If an event type is marked as `true`, then the event webhook will include information about that event.

Twilio SendGrid's Event Webhook will notify a URL of your choice via HTTP POST with information about events that occur as Twilio SendGrid processes your email.

Typical uses of this data are to remove unsubscribes, react to spam reports, determine unengaged recipients, identify bounced email addresses, or create advanced analytics of your email program.

### PATCH /user/webhooks/event/settings


```javascript
  const data = {
  "bounce": true,
  "click": true,
  "deferred": true,
  "delivered": true,
  "dropped": true,
  "enabled": true,
  "group_resubscribe": true,
  "group_unsubscribe": true,
  "open": true,
  "processed": true,
  "spam_report": true,
  "unsubscribe": true,
  "url": "url"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/webhooks/event/settings';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve Event Webhook settings

**This endpoint allows you to retrieve your current event webhook settings.**

If an event type is marked as `true`, then the event webhook will include information about that event.

Twilio SendGrid's Event Webhook will notify a URL of your choice via HTTP POST with information about events that occur as Twilio SendGrid processes your email.

Typical uses of this data are to remove unsubscribes, react to spam reports, determine unengaged recipients, identify bounced email addresses, or create advanced analytics of your email program.

### GET /user/webhooks/event/settings


```javascript
  request.method = 'GET';
  request.url = '/v3/user/webhooks/event/settings';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Test Event Notification Settings

**This endpoint allows you to test your event webhook by sending a fake event notification post to the provided URL.**

Twilio SendGrid's Event Webhook will notify a URL of your choice via HTTP POST with information about events that occur as Twilio SendGrid processes your email.

Typical uses of this data are to remove unsubscribes, react to spam reports, determine unengaged recipients, identify bounced email addresses, or create advanced analytics of your email program.

### POST /user/webhooks/event/test


```javascript
  const data = {
  "url": "url"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/user/webhooks/event/test';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Create a parse setting

**This endpoint allows you to create a new inbound parse setting.**

The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the content, and then have that content POSTed by Twilio SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).

### POST /user/webhooks/parse/settings


```javascript
  const data = {
  "hostname": "myhostname.com",
  "send_raw": false,
  "spam_check": true,
  "url": "http://email.myhosthame.com"
};
  request.body = data;
  request.method = 'POST';
  request.url = '/v3/user/webhooks/parse/settings';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve all parse settings

**This endpoint allows you to retrieve all of your current inbound parse settings.**

The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the content, and then have that content POSTed by Twilio SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).

### GET /user/webhooks/parse/settings


```javascript
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/settings';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Delete a parse setting

**This endpoint allows you to delete a specific inbound parse setting.**

The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the content, and then have that content POSTed by Twilio SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).

### DELETE /user/webhooks/parse/settings/{hostname}


```javascript
  request.method = 'DELETE';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Update a parse setting

**This endpoint allows you to update a specific inbound parse setting.**

The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the content, and then have that content POSTed by Twilio SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).

### PATCH /user/webhooks/parse/settings/{hostname}


```javascript
  const data = {
  "send_raw": true,
  "spam_check": false,
  "url": "http://newdomain.com/parse"
};
  request.body = data;
  request.method = 'PATCH';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieve a specific parse setting

**This endpoint allows you to retrieve a specific inbound parse setting.**

The inbound parse webhook allows you to have incoming emails parsed, extracting some or all of the content, and then have that content POSTed by Twilio SendGrid to a URL of your choosing. For more information, please see our [User Guide](https://sendgrid.com/docs/API_Reference/Webhooks/parse.html).

### GET /user/webhooks/parse/settings/{hostname}


```javascript
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/settings/{hostname}';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
## Retrieves Inbound Parse Webhook statistics.

**This endpoint allows you to retrieve the statistics for your Parse Webhook usage.**

Twilio SendGrid's Inbound Parse Webhook allows you to parse the contents and attachments of incoming emails. The Parse API can then POST the parsed emails to a URL that you specify. The Inbound Parse Webhook cannot parse messages greater than 20MB in size, including all attachments.

There are many pre-made integrations for the Twilio SendGrid Parse Webhook which make processing events easy. You can find these integrations in the [Library Index](https://sendgrid.com/docs/Integrate/libraries.html#-Webhook-Libraries).

### GET /user/webhooks/parse/stats


```javascript
  const queryParams = {
  'aggregated_by': 'day',
  'end_date': '2016-04-01',
  'limit': 'test_string',
  'offset': 'test_string',
  'start_date': '2016-01-01'
};
  request.qs = queryParams;
  request.method = 'GET';
  request.url = '/v3/user/webhooks/parse/stats';
  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
```
