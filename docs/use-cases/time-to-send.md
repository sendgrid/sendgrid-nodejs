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

await sgMail.send(msg);
```

Keep in mind the following limitations:

1. Emails can only be scheduled, at most, 72 hours in advance.
2. If successful, the call to `sgMail.send()` returns a 202 status code with an empty response body. Currently, cancelling a scheduled email [requires a change of password or contacting our support team](https://sendgrid.com/docs/for-developers/sending-email/stopping-an-in-progress-send/#stopping-transactional-email).
