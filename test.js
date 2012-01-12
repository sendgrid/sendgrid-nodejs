var SendGrid = require('./lib/sendgrid');
var Email = require('./lib/email');
console.log(require('./lib/sendgrid'));
console.log(SendGrid);
console.log(Email);

var sender = new SendGrid({api_user: 'siyegen', api_key: 'supermailsforus'});
var email = new Email({
  to: "whatever@whatmoorawr.com",
  from: 'testy@testerson.com',
  subject: 'Simple mailer ',
  text: 'oh yeah man, for real  ✔ 3 tests complete (',
  html: '<b>oh</b> yeah man, for <i>reaaaaaaal</i>  ✔ 3 tests complete ('
});

var x_smtpapi = {};

x_smtpapi.to = ["david.tomberlin@sendgrid.com"];
email.params["x-smtpapi"] = x_smtpapi;
email.params["x-smtpapi"].filters = {
  "footer": {
    "settings": {
      "enable": 1,
      "text/plain" : "THIS IS A FOOTERS, for real  ✔ 3 tests complete (",
      "text/html" : "THIS IS A FOOTERS \u00a2, for real  ✔ 3 tests complete ("
    }
  }
};
// console.dir(email.params['x-smtpapi']);
console.log(email);

sender.smtp(email, function(success, err) {
  if(success) console.log('Email sent');
  else console.log(err);
});


