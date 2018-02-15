# Send a Single Email to Multiple Recipients

The `to` field can contain an array of recipients, which will send a single email with all of the recipients in the `to` field. The recipients will be able to see each other:

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.send(msg);
```

If you want to send multiple _individual_ emails to multiple recipient where they don't see each others email addresses, use `sendMultiple` instead:

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.sendMultiple(msg);
```

Note that `sendMultiple(msg)` is a convenience shortcut for `send(msg, true)`, and alternatively you can also set the `isMultiple` flag to `true` on your `msg` object.
