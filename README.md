<<<<<<< HEAD
=======
# Special Announcement

We have released a [v3 beta branch](https://github.com/sendgrid/sendgrid-nodejs/tree/v3beta) for this library that supports our new v3 Mail Send endpoint which is in open beta. The v3/mail/send/beta endpoint is not a production endpoint, so you should not integrate with it for your production email sending. However, when we make this an officially released feature it will be available at v3/mail/send.

Please try it out and let us know what you think about the endpoint and the library in the [issues area of this repo](https://github.com/sendgrid/sendgrid-nodejs/issues), all of your feedback will be taken into account to influence the endpoint and this library.

Beginning with v3/mail/send/beta, the new version of our library will only support v3 endpoints.. Once this endpoint is out of beta, we will update the endpoint, removing the “/beta” from the URI. At this point, the v3 beta branch will be merged to master and will be our official library going forward. This means that we will no longer formally support the v2 mail.send.json endpoint in any of our libraries.

So long as you are not automatically pulling new versions of the library into your production code base, your integration will not break regardless of which endpoint you’re using. By the way, don't pull new versions into your production code base, because breaking changes break things.

The /api/mail.send.json endpoint, known as v2 mail send, is NOT going away. It will continue to work as it always has, happily sending your emails along as if nothing happened.

# SendGrid-nodejs

This nodejs module allows you to quickly and easily send emails through SendGrid using [nodejs](http://nodejs.org/).

>>>>>>> master
[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.svg?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![NPM version](https://badge.fury.io/js/sendgrid.svg)](http://badge.fury.io/js/sendgrid)

**This library allows you to quickly and easily use the SendGrid Web API via Node.js.**

# Announcements

**BREAKING CHANGE as of 2016.06.14**

Version 3.0.0 brings you full support for all Web API v3 endpoints. We
have the following resources to get you started quickly:

-   [SendGrid
    Documentation](https://sendgrid.com/docs/API_Reference/Web_API_v3/index.html)
-   [Usage Docs](https://github.com/sendgrid/sendgrid-nodejs/blob/master/USAGE.md)
-   [Example
    Code](https://github.com/sendgrid/sendgrid-nodejs/tree/master/examples)

Thank you for your continued support!

All updates to this library is documented in our [CHANGELOG](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CHANGELOG.md).

# Installation

## Setup Environment Variables

First, get your free SendGrid account [here](https://sendgrid.com/free?source=sendgrid-nodejs).

Next, update your environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys).

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

## Install Package

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
  requestPost.path = '/v3/mail/send'
  requestPost.body = requestBody
  sg.API(requestPost, function (response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })
```

## General v3 Web API Usage

```javascript
var sg = require('sendgrid-nodejs').SendGrid(process.env.SENDGRID_API_KEY)

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
- [Usage Docs](https://github.com/sendgrid/sendgrid-nodejs/blob/master/USAGE.md)
- [Example Code](https://github.com/sendgrid/sendgrid-nodejs/tree/master/examples)
- [v3 Web API Mail Send Helper](https://github.com/sendgrid/sendgrid-nodejs/tree/master/lib/helpers/mail/README.md

## Roadmap

If you are intersted in the future direction of this project, please take a look at our [milestones](https://github.com/sendgrid/sendgrid-nodejs/milestones). We would love to hear your feedback.

## How to Contribute

We encourage contribution to our libraries, please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#feature_request)
* [Bug Reports](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#submit_a_bug_report)
* [Improvements to the Codebase](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#improvements_to_the_codebase)

# About

sendgrid-nodejs is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

sendgrid-nodejs is maintained and funded by SendGrid, Inc. The names and logos for sendgrid-nodejs are trademarks of SendGrid, Inc.

![SendGrid Logo]
(https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)
