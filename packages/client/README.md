[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.svg?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)

**This package is part of a monorepo, please see [this README](https://github.com/sendgrid/sendgrid-nodejs/blob/master/README.md) for details.**

# Client for the Sendgrid v3 Web API
This client library is used by the other [SendGrid service packages](https://www.npmjs.com/org/sendgrid) to make requests to the [Sendgrid v3 Web API](https://sendgrid.com/docs/API_Reference/api_v3.html). You can also use it independently to make custom requests to the SendGrid v3 Web API and other HTTP APIs.

To be notified when this package is updated, please subscribe to email [notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

# Installation

## Prerequisites

- Node.js version 6, 7 or 8
- A SendGrid account, [sign up for free](https://sendgrid.com/free?source=sendgrid-nodejs) to send up to 40,000 emails for the first 30 days or check out [our pricing](https://sendgrid.com/pricing?source=sendgrid-nodejs).

## Obtain an API Key

Grab your API Key from the [SendGrid UI](https://app.sendgrid.com/settings/api_keys).

## Setup Environment Variables

Do not hard code your [SendGrid API Key](https://app.sendgrid.com/settings/api_keys) into your code. Instead, use an environment variable or some other secure means of protecting your SendGrid API Key. Following is an example of using an environment variable.

Update the development environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys), for example:

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

```sh
npm install --save @sendgrid/client
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add @sendgrid/client
```

<a name="general"></a>
## General v3 Web API Usage Example

Please see [USAGE.md](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md) for all endpoint examples for the [SendGrid v3 Web API](https://sendgrid.com/docs/API_Reference/api_v3.html).

```js
const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);
const request = {
  method: 'GET',
  url: '/v3/api_keys'
};
client.request(request)
.then(([response, body]) => {
  console.log(response.statusCode);
  console.log(body);
})
```

## Add a Custom Default Header
```js
sgClient.setDefaultHeader('User-Agent', 'Some user agent string');
```

## Change Request Defaults
```js
sgClient.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/');
```

## Overwrite Promise Implementation
You can overwrite the promise implementation you want the client to use. Defaults to the ES6 `Promise`:

```js
global.Promise = require('bluebird');
```

## Instantiate Client Instances Manually
```js
const {Client} = require('@sendgrid/client');
const sgClient1 = new Client();
const sgClient2 = new Client();
sgClient1.setApiKey('KEY1');
sgClient2.setApiKey('KEY2');
```

<a name="announcements"></a>
# Announcements

All updates to this library are documented in our [CHANGELOG](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CHANGELOG.md) and [releases](https://github.com/sendgrid/sendgrid-nodejs/releases). You may also subscribe to email [release notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

<a name="roadmap"></a>
# Roadmap

If you are interested in the future direction of this project, please take a look at our open [issues](https://github.com/sendgrid/sendgrid-nodejs/issues) and [pull requests](https://github.com/sendgrid/sendgrid-nodejs/pulls). We would love to hear your feedback.

<a name="contribute"></a>
# How to Contribute

We encourage contribution to our libraries (you might even score some nifty swag), please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#feature-request)
* [Bug Reports](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#submit-a-bug-report)
* [Improvements to the Codebase](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#improvements-to-the-codebase)

<a name="troubleshooting"></a>
# Troubleshooting

Please see our [troubleshooting guide](https://github.com/sendgrid/sendgrid-nodejs/blob/master/TROUBLESHOOTING.md) for common library issues.

<a name="about"></a>
# About

@sendgrid/client is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

@sendgrid/client is maintained and funded by SendGrid, Inc. The names and logos for @sendgrid/client are trademarks of SendGrid, Inc.

![SendGrid Logo](https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)
