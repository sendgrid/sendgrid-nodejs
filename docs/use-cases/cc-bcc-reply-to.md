# CC, BCC and Reply To

You can specify the `cc`, `bcc`, and `replyTo` fields for more control over who you send the email to and where people will reply to:

```js
const msg = {
  to: 'recipient@example.org',
  cc: 'someone@example.org',
  bcc: ['me@example.org', 'you@example.org'],
  from: 'sender@example.org',
  replyTo: 'othersender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
```
