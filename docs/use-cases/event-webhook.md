First, follow the guide to [set up signature verification for event webhooks](https://sendgrid.com/docs/for-developers/tracking-events/getting-started-event-webhook-security-features/)

**Note:** It is important that the body of the request is verified raw (as a `Buffer` or `string`), not after it was parsed as `json`.  
If you are using `express.json()` or `bodyParser.json()` you will need to exclude the webhook path from it (one way to do it is using [express-unless](https://www.npmjs.com/package/express-unless)).

An example of a server to process incoming event webhooks:
```javascript
const bodyParser = require("body-parser"); // With Express 4.16+ you do not need this and can use express.json() and express.raw() instead
const unless = require('express-unless');
const express = require('express');
const functions = require("firebase-functions");
const app = express();

const {EventWebhook, EventWebhookHeader} = require('@sendgrid/eventwebhook');

const verifyRequest = function (publicKey, payload, signature, timestamp) {
  const eventWebhook = new EventWebhook();
  const ecPublicKey = eventWebhook.convertPublicKeyToECDSA(publicKey);
  return eventWebhook.verifySignature(ecPublicKey, payload, signature, timestamp);
}

// Exclude the webhook path from any json parsing
const json_parser = bodyParser.json();
json_parser.unless = unless;
app.use(json_parser.unless({ path: ["/sendgrid/webhook"]}));

app.post("/sendgrid/webhook",
  // parse req.body as a Buffer
  bodyParser.raw({ type: 'application/json' }),
  async (req, resp) => {
    try {
      const key = '<your_public_key>';
      // Alternatively, you can get your key from your firebase function cloud config
      // const key = getConfig().sendgrid.webhook_verification_key;

      const signature = req.get(EventWebhookHeader.SIGNATURE());
      const timestamp = req.get(EventWebhookHeader.TIMESTAMP());

      // Be sure to _not_ remove any leading/trailing whitespace characters (e.g., '\r\n').
      const requestBody = req.body;
      // Alternatively, if using firebase cloud functions, remove the middleware and use:
      // const requestBody = (req as functions.https.Request).rawBody;

      if (verifyRequest(key, requestBody, signature, timestamp)) {
        resp.sendStatus(204);
      } else {
        resp.sendStatus(403);
      }
    } catch (error) {
      resp.status(500).send(error);
    }
})
```
