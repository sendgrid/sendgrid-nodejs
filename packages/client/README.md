## Client for the Sendgrid API
This client library is used by the other service packages to make requests to the Sendgrid API. You can however use it independently to make custom requests to the API as well.

### Usage
```js
//Load client
const sgClient = require('@sendgrid/client');

//Set API key
sgClient.setApiKey(process.env.SENDGRID_API_KEY);

//Add a custom default header
sgClient.setDefaultHeader('User-Agent', 'Some user agent string');

//Change request defaults (e.g. baseUrl)
sgClient.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/');
```

### Overwrite Promise implementation
You can overwrite the promise implementation you want the client to use. Defaults to the ES6 `Promise`:

```js
global.Promise = require('bluebird');
```
