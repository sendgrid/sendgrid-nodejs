![SendGrid Logo](https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)

[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.svg?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)
[![Twitter Follow](https://img.shields.io/twitter/follow/sendgrid.svg?style=social&label=Follow)](https://twitter.com/sendgrid)
[![GitHub contributors](https://img.shields.io/github/contributors/sendgrid/sendgrid-nodejs.svg)](https://github.com/sendgrid/sendgrid-nodejs/graphs/contributors)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sendgrid/sendgrid-nodejs/blob/master/LICENSE.md)

**This library allows you to quickly and easily use the SendGrid Web API v3 via Node.js.**

We want this library to be community-driven, and SendGrid led. We need your help to realize this goal. To help make sure we are building the right things in the right order, we ask that you create [issues](https://github.com/sendgrid/sendgrid-nodejs/issues) and [pull requests](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CONTRIBUTING.md) or simply upvote or comment on existing issues or pull requests.

For updates to this library, see our [CHANGELOG](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CHANGELOG.md) and [releases](https://github.com/sendgrid/sendgrid-nodejs/releases). 

Subscribe to email [release notifications](https://dx.sendgrid.com/newsletter/nodejs) to receive emails about releases and breaking changes.

We appreciate your continued support, thank you!

# Table of Contents

* [Introduction - Please Read First](#introduction)
* [Announcements](#announcements)
* [Roadmap](#roadmap)
* [How to Contribute](#contribute)
* [Troubleshooting](#troubleshooting)
* [About](#about)
* [License](#license)

<a name="introduction"></a>
# Introduction - Please Read First

This library is broken up into several packages as a monorepo so that you only need to install the packages necessary for your use case. This README contains information pertaining to all packages. For examples on how to get started quickly, head over to the READMEs of each individual package (linked and described below), which includes detailed examples.

## .env file

You will find a file in the root of the project called .env_sample. You can run `cp .env_sample .env` or manually rename the file to `.env`; be sure to add your [API key](https://sendgrid.com/docs/User_Guide/Settings/api_keys.html#-Creating-an-API-key).

* [@sendgrid/mail](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail) - if you just want to send email
* [@sendgrid/client](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/client) - to use all other [SendGrid v3 Web API endpoints](https://sendgrid.com/docs/API_Reference/api_v3.html)
* [@sendgrid/inbound-mail-parser](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/inbound-mail-parser) - help with parsing the SendGrid Inbound Parse API
* [@sendgrid/contact-importer](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/contact-importer) - help with importing contacts into the ContactDB
* [@sendgrid/helpers](https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/helpers) - a collection of classes and helpers used internally by the above packages

<a name="announcements"></a>
# Announcements

All updates to this library are documented in our [CHANGELOG](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CHANGELOG.md) and [releases](https://github.com/sendgrid/sendgrid-nodejs/releases). You may also subscribe to email [release notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

<a name="roadmap"></a>
# Roadmap

If you are interested in the future direction of this project, please take a look at our open [issues](https://github.com/sendgrid/sendgrid-nodejs/issues) and [pull requests](https://github.com/sendgrid/sendgrid-nodejs/pulls). We would love to hear your feedback.

<a name="contribute"></a>
# How to Contribute

We encourage contribution to our libraries (you might even score some nifty swag), please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#feature_request)
* [Bug Reports](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#submit_a_bug_report)
* [Improvements to the Codebase](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#improvements_to_the_codebase)

<a name="troubleshooting"></a>
# Troubleshooting

Please see our [troubleshooting guide](https://github.com/sendgrid/sendgrid-nodejs/blob/master/TROUBLESHOOTING.md) for common library issues.

<a name="about"></a>
# About

sendgrid-nodejs is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

sendgrid-nodejs is maintained and funded by SendGrid, Inc. The names and logos for sendgrid-nodejs are trademarks of SendGrid, Inc.

<a name="license"></a>
# License
[The MIT License (MIT)](https://github.com/sendgrid/sendgrid-nodejs/blob/master/LICENSE.md)
