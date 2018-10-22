If you have a non-library SendGrid issue, please contact our [support team](https://support.sendgrid.com).

If you can't find a solution below, please open an [issue](https://github.com/sendgrid/sendgrid-nodejs/issues).


## Table of Contents

* [Migrating from Web API v2 to Web API v3](#migrating)
* [Continue Using Web API v2](#v2)
* [Testing Web API v3 /mail/send Calls Directly](#testing)
* [Error Messages](#error)
* [Versions](#versions)
* [Environment Variables and Your SendGrid API Key](#environment)
* [Using the Package Manager](#package-manager)
* [Viewing the Request Body](#request-body)
* [Wrapping Text](#wrapping-text)

<a name="migrating"></a>
## Migrating from v2 to v3

Please review [our guide](https://sendgrid.com/docs/Classroom/Send/v3_Mail_Send/how_to_migrate_from_v2_to_v3_mail_send.html) on how to migrate from v2 to v3.

<a name="v2"></a>
## Continue Using v2

[Here](https://github.com/sendgrid/sendgrid-nodejs/tree/b57b32caa47608a15d23940a0dedc82a91e7b6aa) is the last working version with v2 support.

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

Add the following to your `package.json` file:

```json
{
  ...
  "dependencies": {
    ...
    "sendgrid": "1.9.2"
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
npm install sendgrid@1.9.2
```

Download:

Click the "Clone or download" green button in [GitHub](https://github.com/sendgrid/sendgrid-nodejs/tree/b57b32caa47608a15d23940a0dedc82a91e7b6aa) and choose download.

<a name="testing"></a>
## Testing v3 /mail/send Calls Directly

[Here](https://sendgrid.com/docs/Classroom/Send/v3_Mail_Send/curl_examples.html) are some cURL examples for common use cases.

<a name="error"></a>
## Error Messages

To read the error message returned by SendGrid's API, please see [this example](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md#success-failure-errors).

<a name="versions"></a>
## Versions

We follow the MAJOR.MINOR.PATCH versioning scheme as described by [SemVer.org](http://semver.org). Therefore, we recommend that you always pin (or vendor) the particular version you are working with to your code and never auto-update to the latest version. Especially when there is a MAJOR point release, since that is guaranteed to be a breaking change. Changes are documented in the [CHANGELOG](https://github.com/sendgrid/sendgrid-nodejs/blob/master/CHANGELOG.md) and [releases](https://github.com/sendgrid/sendgrid-nodejs/releases) section.

<a name="environment"></a>
## Environment Variables and Your SendGrid API Key

All of our examples assume you are using [environment variables](packages/client#setup-environment-variables) to hold your SendGrid API key.

If you choose to add your SendGrid API key directly (not recommended):

`process.env.SENDGRID_API_KEY`

becomes

`'SENDGRID_API_KEY'`

In the first case SENDGRID_API_KEY is in reference to the name of the environment variable, while the second case references the actual SendGrid API Key.

If you're using Kubernetes Secrets and passing the API Keys to the Environment using it, You may find that there is a `\n` character in the environment variable. You can use the trim function to remove it like this:

```
process.env.SENDGRID_API_KEY.trim();
```

<a name="package-manager"></a>
## Using the Package Manager

We upload this library to [npm](https://www.npmjs.com/package/sendgrid) whenever we make a release. This allows you to use [npm](https://www.npmjs.com) for easy installation.

In most cases we recommend you download the latest version of the library, but if you need a different version, please use:

`npm install @sendgrid/[package name]@X.X.X` 

Please check [here](https://www.npmjs.com/org/sendgrid) for a list of package names.

If you are using a `package.json` file:

```json
{
  ...
  "dependencies": {
    ...
    "@sendgrid/[package name]": "X.X.X"
  }
}
```

<a name="request-body"></a>
## Viewing the Request Body

When debugging or testing, it may be useful to examine the raw request body to compare against the [documented format](https://sendgrid.com/docs/API_Reference/api_v3.html).

You can do this right before you call `sgMail.send(msg);` like so:

```javascript
const {
  classes: {
    Mail,
  },
} = require('@sendgrid/helpers');
const mail = Mail.create(data);
const body = mail.toJSON();
console.log(body);
```

<a name="wrapping-text"></a>
## Wrapping Text

You can write blog posts using e-mail with the help of SendGrid API, like so:
```javascript
sgMail.setApiKey(process.env.SendGrid_API_KEY);
let msg = {
  to: '<your-name>@blogger.com',
  from: '<your-name>@gmail.com',
  subject: title,
  html: html,
};
sgMail.send(msg);
``` 
You can also wrap the text in the HTML to make a multi-line blog post:
```javascript
<div style="white-space: pre-wrap;">
  <code>
    int a = 10;
    int b = 10;
    int d = 10;
  </code>
</div>
