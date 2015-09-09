var sg = require('./lib/sendgrid')("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");

var email = new sg.Email();

email.addTo('tushar@sendgr.com');
email.subject = 'Testing CC + BCC';
email.from = 'me@example.com';
email.text = 'Testing';
email.addCc('tushar@sendgrid.com');
email.bcc = 'tushar@sendgrid.com';

sg.send(email, function(err, json) {
  if (err) console.error(err);
  console.log(json);
});
