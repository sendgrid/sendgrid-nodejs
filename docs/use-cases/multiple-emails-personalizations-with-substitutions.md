# Send Multiple Emails with Personalizations and Substitutions

Personalizations are an array of objects, each representing a separate email, that allow you to customize the metadata of each email sent within a request. With substitutions you can also have the email template dynamically be updated through [substitution tags](https://docs.sendgrid.com/for-developers/sending-email/substitution-tags). 

The below example shows how multiple emails, each with varying metadata and substitutions, are sent with personalizations.

```js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  from: 'sender1@example.org',
  subject: 'Ahoy!',
  text: 'Ahoy {{name}}!',
  html: '<p>Ahoy {{name}}!</p>',
  personalizations: [
    {
      to: 'recipient1@example.org',
      substitutions: {
        name: 'Jon'
      }
    },
    {
      to: 'recipient2@example.org',
      substitutions: {
        name: 'Jane'
      }
    },
    {
      to: 'recipient3@example.org',
      substitutions: {
        name: 'Jack'
      }
    }
  ],
};

sgMail.send(msg);
```

The default `substitutionWrappers` are `{{` and `}}` in the node.js library, but you can change it using the `substitutionWrappers` property.

You can also use the SendGrid helper classes to achieve the same outcome:

```js
const sgMail = require('@sendgrid/mail');
const sgHelpers = require('@sendgrid/helpers');
const Mail = sgHelpers.classes.Mail;
const Personalization = sgHelpers.classes.Personalization;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const mail = new Mail();
mail.setFrom('sender1@example.org');
mail.setSubject('Ahoy');
mail.addTextContent('Ahoy {{name}}!');
mail.addHtmlContent('<p>Ahoy {{name}}!</p>');

const personalization1 = new Personalization();
personalization1.setTo('recipient1@example.org');
personalization1.addSubstitution('name', 'Jon');
mail.addPersonalization(personalization1);

const personalization2 = new Personalization();
personalization1.setTo('recipient2@example.org');
personalization1.addSubstitution('name', 'Jane');
mail.addPersonalization(personalization2);

const personalization3 = new Personalization();
personalization1.setTo('recipient3@example.org');
personalization1.addSubstitution('name', 'Jack');
mail.addPersonalization(personalization3);

sgMail.send(mail);
```

Refer to [the SendGrid documentation](https://docs.sendgrid.com/for-developers/sending-email/personalizations) for more details about personalizations.
