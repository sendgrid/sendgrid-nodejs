# Choosing a data-residency to send messages to

Use the `setDataResidency` setter to specify which host to send to:

Send to EU (data-residency: `https://api.eu.sendgrid.com/`)
```js
const sgMail = require('@sendgrid/mail');
sgMail.setDataResidency('eu');
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.send(msg);
```
Send to Global region, this is also the default host, if the setter is not used
(data-residency: `https://api.sendgrid.com/`)
```js
const sgMail = require('@sendgrid/mail');
sgMail.setDataResidency('global');
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.send(msg);
```

## Limitations

1. Emails can only be sent to two hosts for now; 'eu' (https://api.eu.sendgrid.com/) and 'global' (https://api.eu.sendgrid.com/)
2. The default data-residency is https://api.sendgrid.com/
3. The valid values for `region` in `client.setDataResidency(region)` are only `eu` and `global`. Case-sensitive.
