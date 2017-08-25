# Mail Service for the Sendgrid v3 Web API
This is a dedicated service for interaction with the mail endpoint of the [Sendgrid v3 API](https://sendgrid.com/docs/API_Reference/api_v3.html).

# Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

```sh
npm install --save @sendgrid/mail
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add @sendgrid/mail
```

<a name="quick_start"></a>
# Quick Start, Hello Email

For more complex use cases, please see [USE_CASES.md](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md).

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
```

<a name="about"></a>
# About

@sendgrid/mail is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

@sendgrid/mail is maintained and funded by SendGrid, Inc. The names and logos for @sendgrid/mail are trademarks of SendGrid, Inc.

![SendGrid Logo](https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)