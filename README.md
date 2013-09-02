# Sendgrid-nodejs

This nodejs module allows you to quickly and easily send emails through SendGrid using [nodejs](http://nodejs.org/).

Note: This module was recently upgraded from [0.2.x](https://github.com/sendgrid/sendgrid-nodejs/tree/v0.2.11) to 0.3.x. There were API breaking changes. For documentation on 0.2.x, please [go here](https://github.com/sendgrid/sendgrid-nodejs/tree/v0.2.11).

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
    "sendgrid": "0.3.0-rc.1.7"
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

## Usage ##

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

## Power Usage

There are two additioanl objects built into this library that will help you use this library as a power user.

+ Email
+ SmtpapiHeaders

### Email

Email helps you more powerfully prepare your message to be sent.

NOTE: anything that is available in the Email constructor is available for use in the `sendgrid.send` function.

To get started create an Email object:

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
var Email     = sendgrid.Email;
var email     = new Email(params);
```

You can pass in as much or as little to `params` as you want, as
the email object has methods for manipulating all of the data.

**params structure**

```javascript
var params = {
  to: [],
  toname: [],
  from: '',
  fromname: '',
  smtpapi: new SmtpapiHeaders(),
  subject: '',
  text: '',
  html: '',
  bcc: [],
  replyto: '',
  date: new Date(),
  files: [
    {
      filename: '',          // required only if file.content is used.
      contentType: '',       // optional
      cid: '',               // optional, used to specify cid for inline content
      path: '',              //
      url: '',               // == One of these three options is required
      content: ('' | Buffer) //
    }
  ],
  file_data: {},
  headers: {}
};
```

Here is a sample for using it:

```javascript
var email = new Email({
  to: 'walks.it.in@sample.com',
  from: 'arsenal@sample.com',
  subject: 'What was Wenger thinking sending Walcott on that early?',
  text: 'Did you see that ludicrous display last night?'
});
```

#### Setting data

Here is an example of all of the functions available on the email object. The comments to the right show the current state of the variables as the functions are called. If you have a specific question, see the [SendGrid API Docs](http://docs.sendgrid.com/documentation/api/). Please open a [GitHub issue](https://github.com/sendgrid/sendgrid-nodejs/issues) if you find bugs or missing features.

```javascript
var sendgrid  = require('sendgrid')(api_user, api_key);
var Email     = sendgrid.Email;
var email     = new Email({
  to: 'denim@sample.com',
  from: 'roy@sample.com',
  subject: 'Listen',
  text: 'Have you tried turning it off and on again'
});

/* Setting various params */
email.replyto = "noreply@sample.com";
email.subject = "This is a subject";

/** The following examples update the 'x-smtpapi' headers **/

/* To Addresses */
email.addTo('moo@cow.com');       // to = ['moo@cow.com']
email.addTo(['solid@snake.com',
            'liquid@snake.com']); // to = ['moo@cow.com', 'solid@snake.com', 'liquid@snake.com']

/* Custom Email Headers */
email.setHeaders({full: 'hearts'});   // headers = {full: 'hearts'}
email.addHeaders({spin: 'attack'});   // headers = {full: 'hearts', spin: 'attack'}
email.setHeaders({mask: 'salesman'}); // headers = {mask: 'salesman'}

/* Substitution */
email.addSubVal('keep', 'secret'); // sub = {keep: ['secret']}
email.addSubVal('keep', 'safe');   // sub = {keep: ['secret', 'safe']}

/* Section */
email.setSection({'-charge-': 'This ship is useless.'}); // section = {'-charge-': 'This ship is useless.'}
email.addSection({'-bomber-': 'Only for sad vikings.'}); // section = {'-charge-': 'This ship is useless.',
                                                         //            '-bomber-': 'Only for sad vikings.'}
email.setSection({'-beam-': 'The best is for first'});   // section = {'-beam-': 'The best is for first'}

/* Unique Args */
email.setUniqueArgs({cow: 'chicken'}); // unique_args = {cow: 'chicken'}
email.addUniqueArgs({cat: 'dog'});     // unique_args = {cow: 'chicken', cat: 'dog'}
email.setUniqueArgs({dad: 'proud'});   // unique_args = {dad: 'proud'}

/* Category */
email.setCategory('tactics');        // category = ['tactics']
email.addCategory('advanced');       // category = ['tactics', 'advanced']
email.setCategory('snowball-fight'); // category = ['snowball-fight']

/* Filters */
// You can set a filter using an object literal
email.setFilterSetting({
  'footer': {
    'setting': {
      'enable': 1,
      'text/plain': 'You can haz footers!'
    }
  }
});

// Alternatively, you can add filter settings one at a time.
email.addFilterSetting('footer', 'enable', 1);
email.addFilterSetting('footer', 'text/html', '<strong>boo</strong>');

/* Attachments */

/*
 * You can add files directly from content in memory.
 *
 * It will try to guess the contentType based on the filename.
 */
email.addFile({
  filename: 'secret.txt',
  content:  new Buffer('You will never know....')
});

/*
 * You can add files directly from a url.
 *
 * It will try to guess the contentType based on the filename.
 */
email.addFile({
  filename: 'icon.jpg',
  url: 'http://i.imgur.com/2fDh8.jpg'
});

/*
 * You can add files from a path on the filesystem.
 *
 * It will try to grap the filename and contentType from the path.
 */
email.addFile({
  path: '../files/resume.txt'
});

/*
 * You can tag files for use as inline HTML content.
 *
 * It will mark the file for inline disposition using the specified "cid".
 */
email.addFile({
  cid: 'the_logo',           // should match cid value in html
  path: '../files/logo.png'
});
email.addHtml('<div>Our logo:<img src="cid:the_logo"></div>');
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

