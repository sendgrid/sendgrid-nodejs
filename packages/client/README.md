# Client for the Sendgrid v3 Web API
This client library is used by the other [SendGrid service packages](https://www.npmjs.com/org/sendgrid) to make requests to the [Sendgrid v3 Web API](https://sendgrid.com/docs/API_Reference/api_v3.html). You can also use it independently to make custom requests to the SendGrid v3 Web API and other HTTP APIs.

# Install Package

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

```js
const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);
const request = {
  method: 'GET',
  url: '/v3/api_keys'
};
client.request(request)
.then(response => {
    console.log(JSON.stringify(response[0].body));
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

<a name="about"></a>
# About

@sendgrid/client is guided and supported by the SendGrid [Developer Experience Team](mailto:dx@sendgrid.com).

@sendgrid/client is maintained and funded by SendGrid, Inc. The names and logos for @sendgrid/client are trademarks of SendGrid, Inc.

![SendGrid Logo](https://uiux.s3.amazonaws.com/2016-logos/email-logo%402x.png)
