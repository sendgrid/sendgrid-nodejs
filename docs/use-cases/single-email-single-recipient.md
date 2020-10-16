# Send a Single Email to a Single Recipient

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.send(msg);
```
