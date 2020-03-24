# Hide Warnings

When using dynamic templates, if one of the values in the template data contains a single quote, a double quote or an ampersand, a warning will be logged.

To hide this warning, set `hideWarnings` to `true` in the message.

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  templateId: 'd-f43daeeaef504760851f727007e0b5d0',
  dynamic_template_data: {
    subject: 'Testing Templates',
    name: 'Some One',
    city: 'Denver',
    company: 'Recipient & Sender'
  },
  hideWarnings: true // now the warning won't be logged
};
sgMail.send(msg);
```