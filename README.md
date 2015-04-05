# SendGrid-nodejs

This nodejs module allows you to quickly and easily send emails through SendGrid using [nodejs](http://nodejs.org/).

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
    "sendgrid": "1.6.0"
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

## Example App

There is a [sendgrid-nodejs-example app](https://github.com/sendgrid/sendgrid-nodejs-example) to help jumpstart your development.

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

### Email

Email helps you more powerfully prepare your message to be sent.


To get started create an Email object where `params` is a javascript object. You can pass in as much or as little to `params` as you want.

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
var email     = new sendgrid.Email(params);
```

#### Sample

Here is a sample for using it.

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
var email     = new sendgrid.Email({
  to:       'foo@bar.com',
  from:     'you@yourself.com',
  subject:  'Subject goes here',
  text:     'Hello world'
});
sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
```

#### Available params

```javascript
var params = {
  smtpapi:  new sendgrid.smtpapi(),
  to:       [],
  toname:   [],
  from:     '',
  fromname: '',
  subject:  '',
  text:     '',
  html:     '',
  bcc:      [],
  cc:       [],
  replyto:  '',
  date:     '',
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
var email     = new sendgrid.Email({to: 'person@email.com'});
email.to      = "different@email.com";
email.replyto = "reply-here@email.com";
email.subject = "This is a subject";
```

#### addTo

You can add one or multiple TO addresses using `addTo`.

```javascript
var email     = new sendgrid.Email(); 
email.addTo('foo@bar.com');
email.addTo('another@another.com');
sendgrid.send(email, function(err, json) { });
```

NOTE: This is different than setting an array on `to`. The array on `to` will show everyone the to addresses it was sent to. Using addTo will not. Usually, you'll want to use `addTo`.  

#### setTos

```javascript
var email     = new sendgrid.Email(); 
email.setTos(['foo@bar.com', 'another@another.com']);
sendgrid.send(email, function(err, json) { });
```

#### setFrom

```javascript
var email     = new sendgrid.Email(); 
email.setFrom('foo@bar.com');
sendgrid.send(email, function(err, json) { });
```

#### addCc

You can add one or multiple CC addresses using `addCc`.

```javascript
var email     = new sendgrid.Email();
email.addCc('foo@bar.com');
email.addCc('another@another.com');
sendgrid.send(email, function(err, json) { });
```

#### setCcs

You can multiple CC addresses using `setCcs`.

```javascript
var email     = new sendgrid.Email();
email.setCcs(['foo@bar.com', 'another@another.com');
sendgrid.send(email, function(err, json) { });
```

#### setSubject

```javascript
var email     = new sendgrid.Email(); 
email.setSubject('Some subject');
sendgrid.send(email, function(err, json) { });
```

#### setText

```javascript
var email     = new sendgrid.Email(); 
email.setText('Some text');
sendgrid.send(email, function(err, json) { });
```

#### setHtml

```javascript
var email     = new sendgrid.Email(); 
email.setHtml('<h1>Some html</h1>');
sendgrid.send(email, function(err, json) { });
```

#### setDate

```javascript
var email     = new sendgrid.Email();
email.setDate('Wed, 17 Dec 2014 19:21:16 +0000');
sendgrid.send(email, function(err, json) { });
```

#### setSendAt

```javascript
var email     = new sendgrid.Email();
email.setSendAt(1409348513);
sendgrid.send(email, function(err, json) { });
```

#### setSendEachAt

```javascript
var email     = new sendgrid.Email();
email.setSendEachAt([1409348513, 1409348514]);
sendgrid.send(email, function(err, json) { });
```

#### addSendEachAt

```javascript
var email     = new sendgrid.Email();
email.addSendEachAt(1409348513);
email.addSendEachAt(1409348514);
sendgrid.send(email, function(err, json) { });
```

#### addHeader

You can add custom headers. This will ADD rather than SET headers.

```javascript
var email     = new sendgrid.Email(); 
email.setHeaders({full: 'hearts'});   // headers = {full: 'hearts'}
email.addHeader('spin', 'attack');   // headers = {full: 'hearts', spin: 'attack'}
email.addHeader('mask', 'salesman'); // headers = {full: 'hearts', spin: 'attack', mask: 'salesman'}
sendgrid.send(email, function(err, json) { });
```

#### setHeaders

You can set custom headers. 

```javascript
var email     = new sendgrid.Email(); 
email.setHeaders({full: 'hearts'});   // headers = {full: 'hearts'}
email.setHeaders({mask: 'salesman'}); // headers = {mask: 'salesman'}
sendgrid.send(email, function(err, json) { });
```

#### addSubstitution

```javascript
var email     = new sendgrid.Email();
email.addSubstitution('keep', 'secret'); // sub = {keep: ['secret']}
email.addSubstitution('other', ['one', 'two']);   // sub = {keep: ['secret'], other: ['one', 'two']}
```

#### setSubstitutions

```javascript
var email     = new sendgrid.Email();
email.setSubstitutions({keep: ['secret'], other: ['one', 'two']}); // sub = {keep: ['secret'], other: ['one', 'two']});
```

#### addSection

```javascript
var email     = new sendgrid.Email();
email.addSection('-charge-', 'This ship is useless.'); // section = {'-charge-': 'This ship is useless.'}
```

#### setSections 

```javascript
var email     = new sendgrid.Email();
email.setSections({'-charge-': 'This ship is useless.'}); // section = {'-charge-': 'This ship is useless.'}
```

#### addUniqueArg

```javascript
var email     = new sendgrid.Email();
email.setUniqueArgs({cow: 'chicken'});   // unique_args = {cow: 'chicken'}
email.addUniqueArg('cat', 'dog');        // unique_args = {cow: 'chicken', cat: 'dog'}
```

#### setUniqueArgs

```javascript
var email     = new sendgrid.Email();
email.setUniqueArgs({cow: 'chicken'}); // unique_args = {cow: 'chicken'}
email.setUniqueArgs({dad: 'proud'});   // unique_args = {dad: 'proud'}
```

#### addCategory

```javascript
var email     = new sendgrid.Email();
email.addCategory('tactics');        // category = ['tactics']
email.addCategory('advanced');       // category = ['tactics', 'advanced']
```

#### setCategories

```javascript
var email     = new sendgrid.Email();
email.setCategories(['tactics']);        // category = ['tactics']
email.setCategories(['snowball-fight']); // category = ['snowball-fight']
```

#### addFilter

Alternatively, you can add filter settings one at a time.

```javascript
var email     = new sendgrid.Email();
email.addFilter('footer', 'enable', 1);
email.addFilter('footer', 'text/html', '<strong>boo</strong>');
```

#### setFilters

You can set a filter using an object literal.

```javascript
var email     = new sendgrid.Email();
email.setFilters({
  'footer': {
    'settings': {
      'enable': 1,
      'text/html': '<strong>You can haz footers!</strong>'
    }
  }
});
```

#### setASMGroupID

You can set an ASM Group ID using an integer.

```javascript
var email     = new sendgrid.Email();
email.setASMGroupID(123);        // asm_group_id = 123
```

#### addFile

You can add files directly from content in memory. It will try to guess the contentType based on the filename.

```javascript
email.addFile({
  filename: 'secret.txt',
  content:  new Buffer('You will never know....')
});
```

You can add files directly from a url. It will try to guess the contentType based on the filename. **Note:** `filename` is required when using a url.

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

## Templates
You can easily use SendGrid's [template engine](https://sendgrid.com/docs/User_Guide/Apps/template_engine.html).

```javascript
var email = new sendgrid.Email();
email.addTo('example@domain.com');
email.subject = "Send with templates app";
email.from = 'from@example.com';
email.text = 'Hi there!';
email.html = '<h1>Hi there!</h1>';
 
// add filter settings one at a time
email.addFilter('templates', 'enable', 1);
email.addFilter('templates', 'template_id', '09c6ab89-9157-4710-8ca4-db7927c631d6');
 
// or set a filter using an object literal.
email.setFilters({
    'templates': {
        'settings': {
            'enable': 1,
            'template_id' : '09c6ab89-9157-4710-8ca4-db7927c631d6',
        }
    }
});
```

## Options

### Changing URL
You may change the URL sendgrid-nodejs uses to send email by supplying various parameters to `options`, all parameters are optional:

```javascript
var sendgrid = require('sendgrid')('username', 'password', { "protocol" : "http", "host" : "sendgrid.org", "endpoint" : "/send", "port" : "80" });
```

A full URI may also be provided:

```javascript
var sendgrid = require('sendgrid')('username', 'password', { "uri" : "http://sendgrid.org:80/send" });
```

### Request

sendgrid-nodejs uses the node request module. You can pass in options
to be merged. This enables you to use your own https.Agent, node-tunnel
or the request proxy url. Please note that sendgrid requires https.

```javascript
var sendgrid = require('sendgrid')('username', 'password', {
proxy: "http://localproxy:3128" });
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

## Issues
When filing an issue please include your ```package.json``` and the output of
```npm ls sendgrid``` to help us isolate and repro the issue

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

