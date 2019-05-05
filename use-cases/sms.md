Following are the steps to add Twilio SMS to your app:

## 1. Obtain a Free Twilio Account

Sign up for a free Twilio account [here](https://www.twilio.com/try-twilio?source=sendgrid-nodejs).

## 2. Update Your Environment Variables

You can obtain your Account Sid and Auth Token from [twilio.com/console](https://twilio.com/console).

### Mac

```bash
echo "export TWILIO_ACCOUNT_SID='YOUR_TWILIO_ACCOUNT_SID'" > twilio.env
echo "export TWILIO_AUTH_TOKEN='YOUR_TWILIO_AUTH_TOKEN'" >> twilio.env
echo "twilio.env" >> .gitignore
source ./twilio.env
```

### Windows

Temporarily set the environment variable (accessible only during the current CLI session):

```bash
set TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
set TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
```

Permanently set the environment variable (accessible in all subsequent CLI sessions):

```bash
setx TWILIO_ACCOUNT_SID "YOUR_TWILIO_ACCOUNT_SID"
setx TWILIO_AUTH_TOKEN "YOUR_TWILIO_AUTH_TOKEN"
```

## 3. Install the Twilio Helper Library

`npm install twilio`

Then, you can execute the following code.

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
