First, follow the guide to [set up signature verification for event webhooks](https://sendgrid.com/docs/for-developers/tracking-events/getting-started-event-webhook-security-features/)

An example of a server to process incoming event webhooks:
```javascript
const bodyParser = require("body-parser");
const express = require('express');
const functions = require("firebase-functions");
var app = express();

const {EventWebhook, EventWebhookHeader} = require('@sendgrid/eventwebhook');

const verifyRequest = function (publicKey, payload, signature, timestamp) {
  const eventWebhook = EventWebhook();
  const ecPublicKey = eventWebhook.convertPublicKeyToECDSA(publicKey);
  return eventWebhook.verifySignature(ecPublicKey, payload, signature, timestamp);
}

// Example using bodyParser middleware
app.use(bodyParser.text({ type: 'application/json' }));
app.post("/sendgrid/webhook", async (req, resp) => {
  try {
    const key = '<your_public_key>';
    const signature = req.get(EventWebhookHeader.SIGNATURE());
    const timestamp = req.get(EventWebhookHeader.TIMESTAMP());

    if (verifyRequest(key, req.body, signature, timestamp)) {
      resp.send(204);
    } else {
      resp.send(403);
    }
  } catch (error) {
    resp.status(500).send(error);
  }
})

// Example using firebase functions
app.post("/sendgrid/webhook", async (req, resp) => {
  try {
    const signature = req.header(EventWebhookHeader.SIGNATURE());
    const timestamp = req.header(EventWebhookHeader.TIMESTAMP());

    //getConfig is mostly a wrapper to functions.config() to get cloud function configuration json
    const key = getConfig().sendgrid.webhook_verification_key;
    
    //Because this is a cloud function environment, we can access the original request body (not the parsed payload) on req.rawBody. 
    //We need to cast to functions.https.Request because `rawBody` is not available on the normal express.Request object. 
    //the rawBody is of type {Buffer}
    const bodyPayload = (req as functions.https.Request).rawBody;

    const verified = verifyRequest(key, bodyPayload, signature, timestamp);
    logger.info("Sendgrid key verified", verified);
    if (!verified) {
        resp.send(403);
        return;
    }
    resp.send(204);
  } catch (error) {
    logger.error("Failed to process webhook", error);
    resp.status(500).send(error);
  }
})
```
