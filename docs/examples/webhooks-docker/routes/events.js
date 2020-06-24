const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())

router.post('/', (req, res) => {

    // Modify and extend the business logic applied to the req.body
    // array.  You could send this to a file, database, or other system
    // for storage and analysis.
    console.log(req.body)

    let events = req.body

    events.forEach(element => {
        console.log()
        console.log('---------- EVENT START ----------')
        console.log('EMAIL:', element.email)
        console.log('TIMESTAMP:', element.timestamp)
        // TODO: invalid JSON key name
        // console.log('EMAIL:', element.smtp-id)
        console.log('EVENT:', element.event)
        console.log('CATEGORY:', element.category)
        console.log('SG_EVENT_ID:', element.sg_event_id)
        console.log('SG_MESSAGE_ID:', element.sg_message_id)
        console.log('USERAGENT:', element.useragent)
        console.log('IP:', element.ip)
        console.log('URL:', element.url)
        console.log('ASM_GROUP_ID:', element.asm_group_id)
        console.log('---------- EVENT END ----------')
        console.log()
    });

    res.sendStatus(200)
})

module.exports = router