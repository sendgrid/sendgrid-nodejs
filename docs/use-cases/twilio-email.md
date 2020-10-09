First, follow the [Twilio Setup](twilio-setup.md) guide for creating a Twilio account and setting up environment variables with the proper credentials.

Then, initialize the Twilio Email Client.

```js
const client = require('@sendgrid/client');

client.setTwilioEmailAuth(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET);

// or

client.setTwilioEmailAuth(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
```

Or similarly using the mail helper.

```js
const mail = require('@sendgrid/mail');

mail.setTwilioEmailAuth(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET);

// or

mail.setTwilioEmailAuth(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
```

This sets the client to use Twilio Auth and the Twilio Email API.
