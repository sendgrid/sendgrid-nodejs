# Creating a Scheduled Send

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

## Limitations

1. Emails can only be scheduled, at most, 72 hours in advance.
2. If successful, without a `batchId` set, the call to `sgMail.send()` returns a 202 status code with an empty response body. Currently, cancelling a scheduled email without a `batchId` set [requires a change of password or contacting our support team](https://sendgrid.com/docs/for-developers/sending-email/stopping-an-in-progress-send/#stopping-transactional-email).

## [To Cancel or Pause Your Scheduled Send](https://sendgrid.com/docs/for-developers/sending-email/stopping-a-scheduled-send/#canceling-transactional-email):

1. Create a [Batch ID](https://github.com/sendgrid/sendgrid-nodejs/blob/HEAD/packages/client/USAGE.md#create-a-batch-id).
2. Assign Batch ID to a `msg` object:
```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello delayed email',
  html: '<p>Some email content</p>',
  sendAt: 1500077141,
  batchId: 'YOUR_BATCH_ID'
};

await sgMail.send(msg);
```
3. [Update your Batch ID](https://github.com/sendgrid/sendgrid-nodejs/blob/HEAD/packages/client/USAGE.md#post-userscheduled_sends) with a `cancel` or `pause` status.
