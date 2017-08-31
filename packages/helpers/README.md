[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.svg?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)

**This package is part of a monorepo, please see [this README](https://github.com/sendgrid/sendgrid-nodejs/blob/master/README.md) for details.**

# Support classes and helpers for the Sendgrid NodeJS libraries
This is a collection of classes and helpers used internally by the
[Sendgrid NodeJS libraries](https://www.npmjs.com/org/sendgrid).

Note that not all objects represented in the Sendgrid API have helper classes assigned to them, because it is not expected that developers will use these classes themselves. They are primarily for internal use and developers are expected to use the publicly exposed API in the [various endpoint services](https://www.npmjs.com/org/sendgrid).

To be notified when this package is updated, please subscribe to email [notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

## Mail class
Used to compose a `Mail` object that converts itself to proper JSON for use with the [Sendgrid v3 API](https://sendgrid.com/docs/API_Reference/api_v3.html). This class supports a slightly different API to make sending emails easier in many cases by not having to deal with personalization arrays, instead offering a simpler interface for composing mails.

## Attachment class
Used by the inbound mail parser to compose `Attachment` objects.

## Personalization class
Used by the Mail class to compose `Personalization` objects.

## Email address
`Helper` class to represent an email address with name/email. Used by both the `Mail` and `Personalization` classes to deal with email addresses of various formats.

## Helpers
Internal helpers that mostly speak for themselves.

<a name="contribute"></a>
# How to Contribute

We encourage contribution to our libraries (you might even score some nifty swag), please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CONTRIBUTING.md) guide for details.

* [Feature Request](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#feature_request)
* [Bug Reports](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#submit_a_bug_report)
* [Improvements to the Codebase](https://github.com/sendgrid/sendgrid-nodejs/tree/master/CONTRIBUTING.md#improvements_to_the_codebase)

<a name="about"></a>
# About

@sendgrid/helpers is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

@sendgrid/helpers is maintained and funded by SendGrid, Inc. The names and logos for @sendgrid/helpers are trademarks of SendGrid, Inc.

![SendGrid Logo](https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)
