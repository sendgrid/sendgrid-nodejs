# Timeout

The `setTimeout` method allows you to set a timeout on a request. It controls two timeouts: `read timeout` and `connection timeout` ([details](https://github.com/request/request#requestoptions-callback)). The request will be aborted after the timeout. Note that the timeout is in milliseconds.

```js
const sgMail = require('@sendgrid/mail');
sgMail.setTimeout(3000);
```
