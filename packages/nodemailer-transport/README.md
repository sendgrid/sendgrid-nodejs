[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.svg?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)

**This package is part of a monorepo, please see [this README](https://github.com/sendgrid/sendgrid-nodejs/blob/master/README.md) for details.**

# Nodemailer Transport Service for the Sendgrid v3 Web API
This is a dedicated transport service for interaction with the nodemailer service of the [Sendgrid v3 API](https://sendgrid.com/docs/API_Reference/api_v3.html).

To be notified when this package is updated, please subscribe to email [notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

# Installation

## Prerequisites

- Node.js version 6, 7 or 8
- A SendGrid account, [sign up for free](https://sendgrid.com/free?source=sendgrid-nodejs) to send up to 40,000 emails for the first 30 days or check out [our pricing](https://sendgrid.com/pricing?source=sendgrid-nodejs).
- Nodemailer

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
npm install --save @sendgrid/nodemailer-transport
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add @sendgrid/nodemailer-transport
```

<a name="quick-start"></a>
# Quick Start, Hello Email

The following is the minimum needed code to send an simple email. Use this example, and modify the `to` and `from` variables:

For more complex use cases, please see [USE_CASES.md](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md).

```js
const nodemailer = require('nodemailer');
const sgTransport = require('../src/sendgrid-transport.js');

let options = {
    auth: {
        api_user: process.env['SENDGRID_USERNAME'],
        api_key: process.env['SENDGRID_PASSWORD']
    }
}

let mailer = nodemailer.createTransport(sgTransport(options));

let email = {
    to: ['foo@example.com', 'bar@example.com'],
    from: 'baz@example.com',
    subject: 'Hi there',
    text: 'Awesome sauce',
    html: '<b>Awesome sauce</b>',
    attachments: [
      {
        filename: 'test.txt',
        path: __dirname + '/test.txt'
      }
    ]
};

mailer.sendMail(email, function(err, res) {
    if (err) { 
        console.log(err) 
    }
    console.log(res);
});
```
*test.txt*:
```text
Hello text
```

After executing the above code, you should have an email in the inbox of the to recipient. You can check the status of your email [in the UI](https://app.sendgrid.com/email_activity?). Alternatively, we can post events to a URL of your choice using our [Event Webhook](https://sendgrid.com/docs/API_Reference/Webhooks/event.html). This gives you data about the events that occur as SendGrid processes your email.

<a name="troubleshooting"></a>
# Troubleshooting

Please see our [troubleshooting guide](https://github.com/sendgrid/sendgrid-nodejs/blob/master/TROUBLESHOOTING.md) for common library issues.

<a name="announcements"></a>
# Announcements

All updates to this library are documented in our [CHANGELOG](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CHANGELOG.md) and [releases](https://github.com/sendgrid/sendgrid-nodejs/releases). You may also subscribe to email [release notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

<a name="roadmap"></a>
# Roadmap

If you are interested in the future direction of this project, please take a look at our open [issues](https://github.com/sendgrid/sendgrid-nodejs/issues) and [pull requests](https://github.com/sendgrid/sendgrid-nodejs/pulls). We would love to hear your feedback!

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

@sendgrid/nodemailer-transport is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

@sendgrid/nodemailer-transport is maintained and funded by SendGrid, Inc. The names and logos for @sendgrid/nodemailer-transport are trademarks of SendGrid, Inc.

![SendGrid Logo](https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)