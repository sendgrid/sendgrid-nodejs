var nodemailer = require('nodemailer');
var sgTransport = require('../src/sendgrid-transport.js');

var options = {
    auth: {
        api_user: process.env['SENDGRID_USERNAME'],
        api_key: process.env['SENDGRID_PASSWORD']
    }
}

var mailer = nodemailer.createTransport(sgTransport(options));

var email = {
    to: ['foo@example.com', 'bar@example.com'],
    from: 'baz@example.com',
    subject: 'Hi there',
    text: 'Awesome sauce',
    html: '<b>Awesome sauce</b>',
    attachments: [
      {
        filename: 'test.txt',
        path: __dirname + '/test.txt'
      }
    ]
};

mailer.sendMail(email, function(err, res) {
    if (err) { 
        console.log(err) 
    }
    console.log(res);
});
