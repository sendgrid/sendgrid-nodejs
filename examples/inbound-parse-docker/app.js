const express = require('express')
const app = express()
const formidable = require('express-formidable')
const port = 3000

app.use(formidable())



app.get('/', (req, res) => res.send('Hello World!'))

app.post('/parse_webhook', (req, res) => {
    console.log('---------- RECEIVED WEBHOOK DATA ----------')
    // Email data comes in as a form.  Using express-formidable to 
    // handle the form data.  Form fields are available in req.fields
    // Below, extracting the from and text.
    // You can take this data and do something more interesting with it
    // such as sending it to a database.
    console.log()
    console.log('FROM: ' + req.fields.from)
    console.log()
    console.log('MESSAGE TEXT: ' + req.fields.text)

    res.sendStatus(200)
})

app.listen(port, () => console.log(`SendGrid Inbound Parse webhook listener started on port ${port}!`))