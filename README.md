[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.svg?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![NPM version](https://badge.fury.io/js/sendgrid.svg)](http://badge.fury.io/js/sendgrid)

**This library allows you to quickly and easily use the SendGrid Web API via Node.js.**

# Announcements

**NOTE: The `/mail/send/beta` endpoint is currently in beta!

Since this is not a general release, we do not recommend POSTing production level traffic through this endpoint or integrating your production servers with this endpoint.

When this endpoint is ready for general release, your code will require an update in order to use the official URI.

By using this endpoint, you accept that you may encounter bugs and that the endpoint may be taken down for maintenance at any time. We cannot guarantee the continued availability of this beta endpoint. We hope that you like this new endpoint and we appreciate any [feedback](dx+mail-beta@sendgrid.com) that you can send our way.**

**BREAKING CHANGE as of XXXX.XX.XX**

Version 3.0.0 brings you full support for all Web API v3 endpoints. We
have the following resources to get you started quickly:

-   [SendGrid
    Documentation](https://sendgrid.com/docs/API_Reference/Web_API_v3/index.html)
-   [Usage Docs](https://github.com/sendgrid/sendgrid-nodejs/blob/v3beta/USAGE.md)
-   [Example
    Code](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/examples)

Thank you for your continued support!

All updates to this library is documented in our [CHANGELOG](https://github.com/sendgrid/sendgrid-nodejs/blob/v3beta/CHANGELOG.md).

# Installation

## Environment Variables

First, get your free SendGrid account [here](https://sendgrid.com/free?source=sendgrid-nodejs).

Next, update your environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys).

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

## TRYING OUT THE V3 BETA MAIL SEND

```bash
git clone -b v3beta --single-branch https://github.com/sendgrid/sendgrid-nodejs.git
cd sendgrid-nodejs
npm install
```

* Update the to and from [emails](https://github.com/sendgrid/sendgrid-nodejs/blob/v3beta/examples/helpers/mail/example.js#L4).

```bash
node examples/helpers/mail/example.js
```

## TRYING OUT THE V3 BETA WEB API

```bash
git clone -b v3beta --single-branch https://github.com/sendgrid/sendgrid-nodejs.git
```

* Check out the documentation for [Web API v3 endpoints](https://sendgrid.com/docs/API_Reference/Web_API_v3/index.html).
* Review the corresponding [examples](https://github.com/sendgrid/sendgrid-nodejs/blob/v3beta/examples).

```bash
touch test.js
```

Copy the desired example into `test.js`.

Change the path to the Sendgrid library to `./lib/sendgrid.js`.

```
node test.js
```

* Check out the documentation for [Web API v3 /mail/send/beta endpoint](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html).

## Once we are out of v3 BETA, the following will apply

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

Add the following to your `package.json` file:

```json
{
  ...
  "dependencies": {
    ...
    "sendgrid": "^3.0.0"
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

# Quick Start

## Hello Email

```javascript
  var helper = require('sendgrid-nodejs').helper

  from_email = new helper.Email("test@example.com")
  to_email = new helper.Email("test@example.com")
  subject = "Hello World from the SendGrid Node.js Library"
  content = new helper.Content("text/plain", "some text here")
  mail = new helper.Mail(from_email, subject, to_email, content)

  var sg = require('sendgrid-nodejs').SendGrid(process.env.SENDGRID_API_KEY)

  var requestBody = mail.toJSON()
  var request = sg.emptyRequest()
  requestPost.method = 'POST'
  requestPost.path = '/v3/mail/send/beta'
  requestPost.body = requestBody
  sg.API(requestPost, function (response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })
```

## General v3 Web API Usage

```javascript
var sg = require('../lib/sendgrid.js').SendGrid(process.env.SENDGRID_API_KEY)

// GET Collection
var request = sg.emptyRequest()
requestGet.method = 'GET'
requestGet.path = '/v3/api_keys'
sg.API(requestGet, function (response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})
```

# Usage

- [SendGrid Docs](https://sendgrid.com/docs/API_Reference/Web_API_v3/index.html)
- [Usage Docs](https://github.com/sendgrid/sendgrid-nodejs/blob/v3beta/USAGE.md)
- [Example Code](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/examples)
- [v3 Web API Mail Send Helper](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/lib/helpers/mail/README.md

## Roadmap

If you are intersted in the future direction of this project, please take a look at our [milestones](https://github.com/sendgrid/sendgrid-nodejs/milestones). We would love to hear your feedback.

## How to Contribute

We encourage contribution to our libraries, please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md#feature_request)
* [Bug Reports](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md#submit_a_bug_report)
* [Improvements to the Codebase](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta/CONTRIBUTING.md#improvements_to_the_codebase)

# About

sendgrid-nodejs is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

sendgrid-nodejs is maintained and funded by SendGrid, Inc. The names and logos for sendgrid-nodejs are trademarks of SendGrid, Inc.

![SendGrid Logo]
(https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)
