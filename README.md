[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.svg?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![NPM version](https://badge.fury.io/js/sendgrid.svg)](http://badge.fury.io/js/sendgrid)

**This library allows you to quickly and easily use the SendGrid Web API via Node.js.**

**NOTE: The `/mail/send/beta` endpoint is currently in beta!

Since this is not a general release, we do not recommend POSTing production level traffic through this endpoint or integrating your production servers with this endpoint.

When this endpoint is ready for general release, your code will require an update in order to use the official URI.

By using this endpoint, you accept that you may encounter bugs and that the endpoint may be taken down for maintenance at any time. We cannot guarantee the continued availability of this beta endpoint. We hope that you like this new endpoint and we appreciate any [feedback](dx+mail-beta@sendgrid.com) that you can send our way.**

# Installation

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

Add the following to your `package.json` file:

```json
{
  ...
  "dependencies": {
    ...
    "sendgrid": "^1.9.2"
  }
}
```

Install sendgrid-nodejs and its dependencies:

```bash
npm install
```

### Alternative Installation

You can also install sendgrid locally with the following command:

```bash
npm install sendgrid
```

## Dependencies

- The SendGrid Service, starting at the [free level](https://sendgrid.com/free?source=sendgrid-nodejs)
- [Nodejs-HTTP-Client](https://github.com/sendgrid/nodejs-http-client)

## Environment Variables

First, get your free SendGrid account [here](https://sendgrid.com/free?source=sendgrid-nodejs).

Next, update your environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys).

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

# Quick Start

## Hello Email

```javascript
  var helper = require('sendgrid-nodejs').helper

  from_email = new helper.Email("dx@sendgrid.com")
  to_email = new helper.Email("elmer.thomas@sendgrid.com")
  subject = "Hello World from the SendGrid Node.js Library"
  content = new helper.Content("text/plain", "some text here")
  mail = new helper.Mail(from_email, subject, to_email, content)

  var sg = require('sendgrid-nodejs').SendGrid(process.env.SENDGRID_API_KEY)

  var requestBody = toSend
  var emptyRequest = require('sendgrid-rest').request
  var requestPost = JSON.parse(JSON.stringify(emptyRequest))
  requestPost.method = 'POST'
  requestPost.path = '/v3/mail/send/beta'
  requestPost.requestBody = requestBody
  sg.API(requestPost, function (response) {
    console.log(response.statusCode)
    console.log(response.responseBody)
    console.log(response.responseHeaders)
  })
```

## General v3 Web API Usage

```javascript
var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

// GET Collection
var emptyRequest = require('sendgrid-rest').request
var requestGet = JSON.parse(JSON.stringify(emptyRequest))
requestGet.method = 'GET'
requestGet.path = '/v3/api_keys'
sg.API(requestGet, function (response) {
  console.log(response.statusCode)
  console.log(response.responseBody)
  console.log(response.responseHeaders)
})
```

# Usage

- [SendGrid Docs](https://sendgrid.com/docs/API_Reference/index.html)
- [v3 Web API](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/USAGE.md)
- [Example Code](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/examples)
- [v3 Web API Mail Send Helper](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/lib/helpers/mail/README.md)

# Announcements

**BREAKING CHANGE as of XXXX.XX.XX**

Version 3.0.0 brings you full support for all Web API v3 endpoints. We
have the following resources to get you started quickly:

-   [SendGrid
    Documentation](https://sendgrid.com/docs/API_Reference/Web_API_v3/index.html)
-   [Usage
    Documentation](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/USAGE.md)
-   [Example
    Code](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/examples)

Thank you for your continued support!

## Roadmap

[Milestones](https://github.com/sendgrid/sendgrid-nodejs/milestones)

## How to Contribute

We encourage contribution to our libraries, please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md#feature_request)
* [Bug Reports](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md#submit_a_bug_report)
* [Improvements to the Codebase](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md#improvements_to_the_codebase)

## Unsupported Libraries

- [Official and Unsupported SendGrid Libraries](https://sendgrid.com/docs/Integrate/libraries.html)

# About

![SendGrid Logo]
(https://assets3.sendgrid.com/mkt/assets/logos_brands/small/sglogo_2015_blue-9c87423c2ff2ff393ebce1ab3bd018a4.png)

sendgrid-nodejs is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

sendgrid-nodejs is maintained and funded by SendGrid, Inc. The names and logos for sendgrid-nodejs are trademarks of SendGrid, Inc.


