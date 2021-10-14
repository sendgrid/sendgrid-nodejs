# Send Multiple Emails with Personalizations

Personalizations are an array of objects, each representing a separate email, that allow you to override the metadata of each email sent within a single request. The below example shows how three emails, each with varying metadata, are sent with personalizations.

Refer to [the Sendgrid documentation](https://docs.sendgrid.com/for-developers/sending-email/personalizations) for more details about personalizations.
```js
const sgMail = require('@sendgrid/mail');
const sgHelpers = require('@sendgrid/helpers');
const Personalization = sgHelpers.classes.Personalization;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'recipient1@example.org',
    from: 'sender1@example.org',
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    personalizations: []
};

const personalization1 = new Personalization();
personalization1.setTo(['recipient2@example.org', 'recipient3@example.org']);
personalization1.setFrom('sender2@example.org');
personalization1.setSubject('Howdy world');
msg.personalizations.push(personalization1);

const personalization2 = new Personalization();
personalization2.setTo(['recipient4@example.org', 'recipient5@example.org', 'recipient6@example.org']);
personalization2.setFrom('sender3@example.org');
personalization2.setCc('recipient7@example.org');
personalization2.setSubject('Salutations world');
msg.personalizations.push(personalization2);

sgMail.send(msg);
```
