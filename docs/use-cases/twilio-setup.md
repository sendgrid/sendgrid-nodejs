## 1. Obtain a Free Twilio Account

Sign up for a free Twilio account [here](https://www.twilio.com/try-twilio?source=sendgrid-nodejs).

## 2. Set Up Your Environment Variables

The Twilio API allows for authentication using with either an API key/secret or your Account SID/Auth Token. You can create an API key [here](https://twil.io/get-api-key) or obtain your Account SID and Auth Token [here](https://twil.io/console).

Once you have those, follow the steps below based on your operating system.

### Linux/Mac

```bash
echo "export TWILIO_API_KEY='YOUR_TWILIO_API_KEY'" > twilio.env
echo "export TWILIO_API_SECRET='YOUR_TWILIO_API_SECRET'" >> twilio.env

# or

echo "export TWILIO_ACCOUNT_SID='YOUR_TWILIO_ACCOUNT_SID'" > twilio.env
echo "export TWILIO_AUTH_TOKEN='YOUR_TWILIO_AUTH_TOKEN'" >> twilio.env
```

Then:

```bash
echo "twilio.env" >> .gitignore
source ./twilio.env
```

### Windows

Temporarily set the environment variable (accessible only during the current CLI session):

```bash
set TWILIO_API_KEY=YOUR_TWILIO_API_KEY
set TWILIO_API_SECRET=YOUR_TWILIO_API_SECRET

: or

set TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
set TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
```

Or permanently set the environment variable (accessible in all subsequent CLI sessions):

```bash
setx TWILIO_API_KEY "YOUR_TWILIO_API_KEY"
setx TWILIO_API_SECRET "YOUR_TWILIO_API_SECRET"

: or

setx TWILIO_ACCOUNT_SID "YOUR_TWILIO_ACCOUNT_SID"
setx TWILIO_AUTH_TOKEN "YOUR_TWILIO_AUTH_TOKEN"
```
