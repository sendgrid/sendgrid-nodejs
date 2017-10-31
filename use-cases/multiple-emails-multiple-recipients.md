# Send Multiple Emails to Multiple Recipients

The `send` method also accepts an array of email msg if you want to send multiple different single emails with for example different content and sender values. This will send multiple requests (in parallel), so be aware of any API rate restrictions:

```js
const emails = [
  {
    to: 'recipient1@example.org',
    from: 'sender@example.org',
    subject: 'Hello recipient 1',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
  },
  {
    to: 'recipient2@example.org',
    from: 'other-sender@example.org',
    subject: 'Hello recipient 2',
    text: 'Hello other plain world!',
    html: '<p>Hello other HTML world!</p>',
  },
];
sgMail.send(emails);
```
