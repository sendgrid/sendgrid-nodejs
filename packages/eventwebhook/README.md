# Install:
```
npm install --save @sendgrid/eventwebhook
```

# Handler webhook auth:
```
  //
  // HANDLERS 
  // 
  var authHandler = (req, res, next) => {
    const {EventWebhook}    = require('@sendgrid/eventwebhook')
      , ew                  = new EventWebhook()
      , PUBLIC_KEY          = YOUR_TWILIO_SENDGRID_PUBLIC_KEY
      , SIGNATURE           = req.headers["x-twilio-email-event-webhook-signature"]
      , TIMESTAMP           = req.headers["x-twilio-email-event-webhook-timestamp"]
      , PAYLOAD             = req.rawBody || req._body                               // https://github.com/restify/node-restify/issues/928
      , KEY                 = ew.convertPublicKeyToECDSA(PUBLIC_KEY)
      , isValid             = ew.verifySignature(KEY, PAYLOAD, SIGNATURE, TIMESTAMP)

    if(!isValid) { 
      console.log(`Error invalid sendgrid signature @${req.url}`)
      return res.send(401, {"success": false, "err": "err_invalid_sendgrid_signature"})
    }
    
    return next() 
 }
 
 var mainHandler  = (req, res, next) => {
   /* PUT HERE YOUR MAIN REQUEST HANDLER */
   res.send(200, {"success": true})
 }
 
 //
 // EXPRESS / RESTIFY ROUTE LISTENER: 
 //
 app.post("/event", authHandler, mainHandler)
```
