# Send an email with a template id and a version id override

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world', 
  templateId: 'd-12345678901234567890123456789012',
  versionIdOverride: 'd1234567-8901234567-890123456789012',
};
sgMail.send(msg);
```
