# sendgrid #
This nodejs module allows you to quickly and easily send emails through
SendGrid using nodejs.

[![Build
Status](https://travis-ci.org/sendgrid/sendgrid-nodejs.png?branch=master)](https://travis-ci.org/sendgrid/sendgrid-nodejs)

## License ##
Licensed under the MIT License.

## Install ##

```
npm install sendgrid
```

## Testing ##

In order to run the integration tests, you'll need to update the config file with your valid SendGrid credentials.  Start by making a live copy of the sample:

```
cp test/config.sample.js test/config.js
```

Next, open up `test/config.js` and fill it in.  After you have updated the configuration file with your credentials, you can run the suite using the following command:

```
npm test
```

You can run individual tests with the following command:

```
./node_modules/.bin/mocha [path to test].js
```

## Usage ##
### It can be this easy ###

```javascript
var SendGrid = require('sendgrid').SendGrid;
var sendgrid = new SendGrid(user, key);
sendgrid.send({
  to: 'example@example.com',
  from: 'other@example.com',
  subject: 'Hello World',
  text: 'My first email through SendGrid'
}, function(success, message) {
  if (!success) {
    console.log(message);
  }
});
```

And you're done!

### Digging in ###
There are two objects that you really need to know to get started:
+   SendGrid
+   Email

#### Email ####
Email is the object that will help you easily perpare your message to be sent.

NOTE: anything that is available in the Email constructor is available
for use in both the `sendgrid.send` and `sendgrid.smtp` functions.

To get started create an Email object:

```javascript
var Email = require('sendgrid').Email;
var email = new Email(optionalParams);
```

You can pass in as much or as little to optionalParams as you want, as
the email object has methods for manipulating all of the data.

**params structure**

```javascript
var optionalParams = {
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

Sample for using it:

```javascript
var email = new Email({
  to: 'walks.it.in@sample.com',
  from: 'arsenal@sample.com',
  subject: 'What was Wenger thinking sending Walcott on that early?',
  text: 'Did you see that ludicrous display last night?'
});
```

##### Setting data #####
Here is an example of all of the functions available on the email object. The comments to the right show the current state of the variables as the functions are called. If you have specific question, see the [SendGrid API Docs](http://docs.sendgrid.com/documentation/api/). Feel free to open an issue if you find bugs or missing features.

```javascript
var email = new Email({
  to: 'denim@sample.com',
  from: 'roy@sample.com',
  subject: 'Listen',
  text: 'Have you tried turning it off and on again'
});

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
