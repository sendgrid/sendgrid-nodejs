# Specifying Custom Headers

Use the `headers` property to specify any custom headers (note that these can also be set globally per the [API specification](https://sendgrid.com/docs/API_Reference/api_v3.html):

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello custom header',
  html: '<p>Some email content</p>',
  headers: {
    'X-CustomHeader': 'Custom header value',
  },
};
```
