First, follow the guide to [set up signature verification for event webhooks](https://sendgrid.com/docs/for-developers/tracking-events/getting-started-event-webhook-security-features/)

An example of a server to process incoming event webhooks:
```javascript
const bodyParser = require("body-parser");
const express = require('express');
const functions = require("firebase-functions");
const app = express();

const {EventWebhook, EventWebhookHeader} = require('@sendgrid/eventwebhook');

const verifyRequest = function (publicKey, payload, signature, timestamp) {
  const eventWebhook = new EventWebhook();
  const ecPublicKey = eventWebhook.convertPublicKeyToECDSA(publicKey);
  return eventWebhook.verifySignature(ecPublicKey, payload, signature, timestamp);
}

// Using bodyParser middleware to process the body
app.use(bodyParser.text({ type: 'application/json' }));

app.post("/sendgrid/webhook", async (req, resp) => {
  try {
    const key = '<your_public_key>';
    // Alternatively, you can get your key from your firebase function cloud config
    // const key = getConfig().sendgrid.webhook_verification_key;

    const signature = req.get(EventWebhookHeader.SIGNATURE());
    const timestamp = req.get(EventWebhookHeader.TIMESTAMP());

    const requestBody = req.body;
    // Alternatively, if using firebase cloud functions, remove the middleware and use:
    // const requestBody = (req as functions.https.Request).rawBody;

    if (verifyRequest(key, requestBody, signature, timestamp)) {
      resp.send(204);
    } else {
      resp.send(403);
    }
  } catch (error) {
    resp.status(500).send(error);
  }
})
```
