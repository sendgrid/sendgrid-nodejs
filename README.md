# Sendgrid-nodejs

This nodejs module allows you to quickly and easily send emails through SendGrid using [nodejs](http://nodejs.org/).

WARNING2: This module was recently upgraded from [0.3.x](https://github.com/sendgrid/sendgrid-nodejs/tree/v0.3.2) to 0.4.x. There were API breaking changes for how `to` and `addTo` worked. See [the note under addTo](https://github.com/sendgrid/sendgrid-nodejs#addto) for more information.

WARNING: This module was recently upgraded from [0.2.x](https://github.com/sendgrid/sendgrid-nodejs/tree/v0.2.11) to 0.3.x. There were API breaking changes. 
Callback function now acts as a normal Node callback, i.e., (error, result). This means your logic in your callback handler should be REVERSED!
For documentation on 0.2.x, please [go here](https://github.com/sendgrid/sendgrid-nodejs/tree/v0.2.11).

[![BuildStatus](https://travis-ci.org/sendgrid/sendgrid-nodejs.png?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)
[![NPM version](https://badge.fury.io/js/sendgrid.png)](http://badge.fury.io/js/sendgrid)

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
sendgrid.send({
  to:       'example@example.com',
  from:     'other@example.com',
  subject:  'Hello World',
  text:     'My first email through SendGrid.'
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
```

## Installation

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x therefore you likely already have it.

Add the following to your `package.json` file:

```json
{
  ...
  "dependencies": {
    ...
    "sendgrid": "0.4.3"
  }
}
```

Install sendgrid-nodejs and its dependencies:

```bash
npm install
```

### Alternative Installation

You can also install sendgrid locally with the following command:

```bash
npm install sendgrid
```

## SendGrid APIs

SendGrid provides two methods of sending email: the Web API, and SMTP API.  SendGrid recommends using the SMTP API for sending emails.
For an explanation of the benefits of each, refer to http://docs.sendgrid.com/documentation/get-started/integrate/examples/smtp-vs-rest/.

This library implements a common interface to make it very easy to use either API.

Please open a [GitHub issue](https://github.com/sendgrid/sendgrid-nodejs/issues) if you find bugs or missing features.

## Usage

To begin using this library, initialize the SendGrid object with your SendGrid credentials.

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
```

Create a new JavaScript object with your message details.

```javascript
var payload   = {
  to      : 'to@example.com',
  from    : 'from@other.com',
  subject : 'Saying Hi',
  text    : 'This is my first email through SendGrid'
}
```

Send it.

```javascript
sendgrid.send(payload, function(err, json) {
  if (err) { console.error(err); }
  console.log(json);
});
```

**Alternatively you can opt to send via SMTP rather than via the WEB API. Just initialize with the `api: 'smtp'` option.**

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key, {api: 'smtp'});
```

## Advanced Usage

There are two additioanl objects built into this library that will help you use this library as a power user.

+ Email
+ SmtpapiHeaders

### Email

Email helps you more powerfully prepare your message to be sent.


To get started create an Email object where `params` is a javascript object. You can pass in as much or as little to `params` as you want.

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
var Email     = sendgrid.Email;
var email     = new Email(params);
```

#### Sample

Here is a sample for using it.

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
var Email     = sendgrid.Email;
var email     = new Email({
  to:       'person@somewhere.com',
  from:     'you@yourself',
  subject:  'What was Wenger thinking sending Walcott on that early?',
  text:     'Did you see that ludicrous display last night?'
});
sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
```

#### Available params

```javascript
var params = {
  smtpapi:  new sengrid.SmtpapiHeaders(),
  to:       [],
  toname:   [],
  from:     '',
  fromname: '',
  subject:  '',
  text:     '',
  html:     '',
  bcc:      [],
  replyto:  '',
  date:     new Date(),
  files: [
    {
      filename:     '',           // required only if file.content is used.
      contentType:  '',           // optional
      cid:          '',           // optional, used to specify cid for inline content
      path:         '',           //
      url:          '',           // == One of these three options is required
      content:      ('' | Buffer) //
    }
  ],
  file_data:  {},
  headers:    {}
};
```

NOTE: anything that is available in the Email constructor is available for use in the `sendgrid.send` function.

#### Setting params

You can set params like you would for any standard JavaScript object.

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
var Email     = sendgrid.Email;
var email     = new Email({to: 'person@email.com'});
email.to      = "different@email.com";
email.replyto = "reply-here@email.com";
email.subject = "This is a subject";
```

#### addTo

You can add one or multiple TO addresses using `addTo`.

```javascript
var email     = new Email(); 
email.addTo('foo@bar.com');
email.addTo('another@another.com');
sendgrid.send(email, function(err, json) { });
```

NOTE: This is different than setting an array on `to`. The array on `to` will show everyone the to addresses it was sent to. Using addTo will not. Usually, you'll want to use `addTo`.  

#### setFrom

```javascript
var email     = new Email(); 
email.setFrom('foo@bar.com');
sendgrid.send(email, function(err, json) { });
```

#### setHeaders

You can set custom headers. 

```javascript
var email     = new Email(); 
email.setHeaders({full: 'hearts'});   // headers = {full: 'hearts'}
email.setHeaders({mask: 'salesman'}); // headers = {mask: 'salesman'}
sendgrid.send(email, function(err, json) { });
```

#### addHeaders

You can add custom headers. This will ADD rather than SET headers.

```javascript
var email     = new Email(); 
email.setHeaders({full: 'hearts'});   // headers = {full: 'hearts'}
email.addHeaders({spin: 'attack'});   // headers = {full: 'hearts', spin: 'attack'}
email.addHeaders({mask: 'salesman'}); // headers = {full: 'hearts', spin: 'attack', mask: 'salesman'}
sendgrid.send(email, function(err, json) { });
```

#### addSubVal

```javascript
var email     = new Email();
email.addSubVal('keep', 'secret'); // sub = {keep: ['secret']}
email.addSubVal('other', ['one', 'two']);   // sub = {keep: ['secret'], other: ['one', 'two']}
```

#### setSection 

```javascript
var email     = new Email();
email.setSection({'-charge-': 'This ship is useless.'}); // section = {'-charge-': 'This ship is useless.'}
```

#### addSection

```javascript
var email     = new Email();
email.setSection({'-charge-': 'This ship is useless.'}); // section = {'-charge-': 'This ship is useless.'}
email.addSection({'-bomber-': 'Only for sad vikings.'}); // section = {'-charge-': 'This ship is useless.',
```

#### setUniqueArgs

```javascript
var email     = new Email();
email.setUniqueArgs({cow: 'chicken'}); // unique_args = {cow: 'chicken'}
email.setUniqueArgs({dad: 'proud'});   // unique_args = {dad: 'proud'}
```

#### addUniqueArgs

```javascript
var email     = new Email();
email.setUniqueArgs({cow: 'chicken'}); // unique_args = {cow: 'chicken'}
email.addUniqueArgs({cat: 'dog'});     // unique_args = {cow: 'chicken', cat: 'dog'}
```

#### setFilterSetting

You can set a filter using an object literal.

```javascript
var email     = new Email();
email.setFilterSetting({
  'footer': {
    'setting': {
      'enable': 1,
      'text/plain': 'You can haz footers!'
    }
  }
});
```

#### setCategory

```javascript
var email     = new Email();
email.setCategory('tactics');        // category = ['tactics']
email.setCategory('snowball-fight'); // category = ['snowball-fight']
```

#### addCategory

```javascript
var email     = new Email();
email.setCategory('tactics');        // category = ['tactics']
email.addCategory('advanced');       // category = ['tactics', 'advanced']
```

#### addFilterSetting

Alternatively, you can add filter settings one at a time.

```javascript
var email     = new Email();
email.addFilterSetting('footer', 'enable', 1);
email.addFilterSetting('footer', 'text/html', '<strong>boo</strong>');
```

#### addFile

You can add files directly from content in memory. It will try to guess the contentType based on the filename.

```javascript
email.addFile({
  filename: 'secret.txt',
  content:  new Buffer('You will never know....')
});
```

You can add files directly from a url. It will try to guess the contentType based on the filename.

```javascript
email.addFile({
  filename: 'icon.jpg',
  url: 'http://i.imgur.com/2fDh8.jpg'
});
```

You can add files from a path on the filesystem. It will try to grap the filename and contentType from the path.

```javascript
email.addFile({
  path: '../files/resume.txt'
});
```

You can tag files for use as inline HTML content. It will mark the file for inline disposition using the specified "cid".

```javascript
email.addFile({
  cid: 'the_logo',           // should match cid value in html
  path: '../files/logo.png'
});
email.addHtml('<div>Our logo:<img src="cid:the_logo"></div>');
```

## Web Options

sendgrid-nodejs uses the node request module. You can pass in options
to be merged. This enables you to use your own https.Agent, node-tunnel
or the request proxy url. Please note that sendgrid requires https.

```javascript
var sendgrid = require('sendgrid')('username', 'password', { web: {
proxy: "http://localproxy:3128" } });
```

or

```javascript
var https = require('https');
var agent = new https.Agent();
// Set Max Sockets to 500
agent.maxSockets = 500;

var sendgrid = require('sendgrid')('username', 'password', { web: {
pool: agent } });
```

## SMTP options

You can change the port to 465 if you prefer. When initializing with the smtp api, also initialize with the port. 

```javascript
var sendgrid  = require('sendgrid')('username', 'password', {api: 'smtp', port: 465});
var payload   = {...};
sendgrid.send(payload, function(err, json) {
  if (err) { console.error(err); }
  console.log(json);
});
```

You can also pass some additional fields through the smtp to the underlying nodemailer. The list of these fields are [here](https://github.com/andris9/Nodemailer#e-mail-message-fields). To do this, you have to use the underlying `.smtp` method. This is really for power users.

```javascript
var sendgrid            = require('sendgrid')('username', 'password', {api: 'smtp'});
var payload             = {...};
var nodeMailerOptions   = {
  messageId: "some-message-id" 
}
sendgrid.smtp(payload, nodeMailerOptions, function(err, json) {
  if (err) { console.error(err); }
  console.log(json);
}
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Running Tests

The existing tests can be run using [Mocha](http://visionmedia.github.io/mocha/) with the following command:

```bash
npm test
```

You can run individual tests with the following command:

```bash
./node_modules/.bin/mocha [path to test].js
```

### Integration Tests

In order to run the integration tests, you'll need to update the environment file with your valid SendGrid credentials. Start by making a live copy of the example:

```bash
cp .env.example .env.test
```

Next, open up `.env.test` and fill it in.  After you have updated the environment file with your credentials, you can run the suite using the following command:

```bash
npm test
```

## License

Licensed under the MIT License.

