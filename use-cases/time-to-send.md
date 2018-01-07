# Specifying Time to Send At

Use the `sendAt` property to specify when to send the emails (in [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) seconds, not milliseconds):

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello delayed email',
  html: '<p>Some email content</p>',
  sendAt: 1500077141,
};
```
