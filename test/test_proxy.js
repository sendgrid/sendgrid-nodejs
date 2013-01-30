var SendGrid = require('../').SendGrid;
var user = "username"
var key = "password";
var options = { proxy: { host: 'localhost',port:'3128'}};
var sendgrid = new SendGrid(user, key,options);
sendgrid.send({
  to: 'xxxx@gmail.com',
  from: 'xxxx@email.com',
  subject: 'Hello World',
  text: 'My first email through SendGrid'
}, function(success, message) {
  if (!success) {
    console.log(message);
  }
});
