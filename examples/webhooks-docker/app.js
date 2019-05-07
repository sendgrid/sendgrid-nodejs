const express = require('express')
const app = express()
const port = 3000

const eventWebhook = require('./routes/events')
const parseWebhook = require('./routes/inbound-parse')

app.get('/', (req, res) => res.status(200).json({status: 'ok'}))

app.use('/event_webhook', eventWebhook)
app.use('/parse_webhook', parseWebhook)


app.listen(port, () => console.log(`Twilio SendGrid webhook listener started on port ${port}!`))