[![BuildStatus](https://travis-ci.com/sendgrid/sendgrid-nodejs.svg?branch=main)](https://travis-ci.com/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)

**This package is part of a monorepo, please see [this README](../../README.md) for details.**

# Inbound Parse Service for the [SendGrid Inbound Parse API](https://sendgrid.com/docs/API_Reference/Parse_Webhook/inbound_email.html)
This package helps get you started consuming and processing [Inbound Parse](https://sendgrid.com/docs/API_Reference/Parse_Webhook/inbound_email.html) data.

To be notified when this package is updated, please subscribe to email [notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

## Prerequisites

- Node.js version 6, 8 or >=10
- A Twilio SendGrid account, [sign up for free](https://sendgrid.com/free?source=sendgrid-nodejs) to send up to 40,000 emails for the first 30 days or check out [our pricing](https://sendgrid.com/pricing?source=sendgrid-nodejs).

## Obtain an API Key

Grab your API Key from the [Twilio SendGrid UI](https://app.sendgrid.com/settings/api_keys).

# Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh
npm install --save @sendgrid/inbound-mail-parser
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add @sendgrid/inbound-mail-parser
```

<a name="contribute"></a>
# How to Contribute

We encourage contribution to our libraries (you might even score some nifty swag), please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/blob/HEAD/CONTRIBUTING.md) guide for details.

* [Feature Request](../../CONTRIBUTING.md#feature-request)
* [Bug Reports](../../CONTRIBUTING.md#submit-a-bug-report)
* [Improvements to the Codebase](../../CONTRIBUTING.md#improvements-to-the-codebase)

<a name="troubleshooting"></a>
# Troubleshooting

Please see our [troubleshooting guide](../../TROUBLESHOOTING.md) for common library issues.

<a name="about"></a>
# About

@sendgrid/inbound-mail-parser is maintained and funded by Twilio SendGrid, Inc. The names and logos for @sendgrid/inbound-mail-parser are trademarks of Twilio SendGrid, Inc.

If you need help installing or using the library, please check the [Twilio SendGrid Support Help Center](https://support.sendgrid.com).

If you've instead found a bug in the library or would like new features added, go ahead and open issues or pull requests against this repo!

![Twilio SendGrid Logo](../../twilio_sendgrid_logo.png)
