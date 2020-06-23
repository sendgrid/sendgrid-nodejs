# Timeout

The `setTimeout` method allows you to set a timeout on a request. The request will be aborted after the timeout. Note that the timeout is in milliseconds. Details [here](https://github.com/axios/axios#request-config).

```js
const sgMail = require('@sendgrid/mail');
sgMail.setTimeout(3000);
```
