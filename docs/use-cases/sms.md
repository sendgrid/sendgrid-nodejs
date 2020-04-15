First, follow the [Twilio Setup](twilio-setup.md) guide for creating a Twilio account and setting up environment variables with the proper credentials.

Then, install the Twilio Helper Library.

```bash
npm install twilio
```

Finally, send a message.

```js
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+12345678901',  // Text this number
    from: '+12345678901' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
```

For more information, please visit the [Twilio SMS Node.js documentation](https://www.twilio.com/docs/sms/quickstart/node).
