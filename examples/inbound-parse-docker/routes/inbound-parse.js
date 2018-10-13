const express = require('express')
const router = express.Router()
const formidable = require('express-formidable')

router.use(formidable())

router.post('/', (req, res) => {
    console.log('---------- START RECEIVED WEBHOOK DATA ----------')
    // Email data comes in as a form.  Using express-formidable to 
    // handle the form data.  Form fields are available in req.fields
    // Below, extracting the from and text.
    // You can take this data and do something more interesting with it
    // such as sending it to a database.
    // Attachments are stored in /tmp based on the default configuration
    // of the formidable middleware.
    // console.log(req.fields)
    console.log()
    console.log('HEADERS: ' + req.fields.headers)
    console.log()
    console.log('DKIM: ' + req.fields.dkim)
    // TODO: The server is sending a non JS compliant key name
    // console.log()
    // console.log('CONTENT-IDS: ' + req.fields.content-ids)
    console.log()
    console.log('TO: ' + req.fields.to)
    console.log()
    console.log('HTML: ' + req.fields.html)
    console.log()
    console.log('FROM: ' + req.fields.from)
    console.log()
    console.log('SENDER-IP: ' + req.fields.sender_ip)
    console.log()
    console.log('SPAM-REPORT: ' + req.fields.spam_report)
    console.log()
    console.log('ENVELOPE: ' + req.fields.envelope)
    console.log()
    console.log('ATTACHMENTS: ' + req.fields.attachments)
    console.log()
    console.log('SPAM-SCORE: ' + req.fields.spam_score)
    // TODO: The server is sending a non JS compliant key name
    // console.log()
    // console.log('ATTACHMENT-INFO: ' + req.fields.attachment-info)
    console.log()
    console.log('CHARSETS: ' + req.fields.charsets)
    console.log()
    console.log('SPF: ' + req.fields.SPF)
    console.log()
    console.log('MESSAGE TEXT: ' + req.fields.text)
    console.log()
    console.log('---------- END RECEIVED WEBHOOK DATA ----------')

    res.sendStatus(200)
})

module.exports = router