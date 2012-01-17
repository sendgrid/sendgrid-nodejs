# sendgrid-nodejs #
This nodejs module allows you to quickly and easily send emails through
SendGrid using nodejs.

## License ##
Licensed under the MIT License.

## Install ##
```
npm install sendgrid-nodejs
```
## Usage ##
### It can be this easy ###
```javascript
var SendGrid = require('sendgrid-nodejs').SendGrid;
var sendgrid = new SendGrid(user, key);
sendgrid.send({
  to: 'example@example.com',
  from: 'other@example.com',
  subject: 'Hello World',
  text: 'My first email through SendGrid'
});
```
And you're done!

### Digging in ###
There are two objects that you really need to know to get started:
+   SendGrid
+   Email

#### Email ####
Email is the object that will help you easily perpare your message to be
sent.
To get started create an Email object

```javascript
var email = new Email(optionalParams);
```
You can pass in as much or as litle to optionalParams as you want, as
the email object has methods for manipulating all of the data.

**params structure**

```javascript
var default_mail_params = {
  to: [],
  from: '',
  smtpapi: new SmtpapiHeaders(),
  subject: '',
  text: '',
  html: '',
  bcc: [],
  replyto: '',
  date: new Date(),
  files: {},
  file_data: {},
  headers: {}
};
```
Sample for using it:

```javascript
var email = new Email({
  to: 'sample@sample.com',
  from: 'sample@sample.com',
  subject: 'Hey',
  text: 'Did you see that ludicrous display last night?'
});
```

##### Setting data #####
In general setting a value will override it while adding that value will
add it to the existing values but will override existing keys with the
new value.

```javascript
var email = new Email({
  to: 'sample@sample.com',
  from: 'sample@sample.com',
  subject: 'Listen',
  text: 'Haved you tried turning it off and on again'
});

// Add other to addresses
email.addTo('moo@cow.com');
// addTo also takes an array
email.addTo(['solid@snake.com', 'liquid@snake.com']);

// setHeaders will override any header values already set
email.setHeaders({customHeader: 'some-value'});
// addHeaders will add to existing headers, overriding existing keys
email.addHeaders({customHeaderTwo: 'Another value'});

// Adding substitution values
email.addSubVal('key', value);

// Setting unique args will override any values already set
email.setUniqueArgs({cow: 'chicken'});
// Adding unique args will add to existing values, overriding existing
keys
email.addUniqueArgs({cat: 'dog'});

// Setting/Adding a category
email.setCategory('tactics');
email.setCategory('advanced');

// Setting/Adding a Section
email.setSection({'-section-': 'text name'});
email.addSection({'-other-': 'person name'});

// Setting a Filter, takes an object literal
email.setFilterSetting({
  'footer': {
    'setting': {
      'enable': 1,
      'text/plain': 'You can haz footers!'
    }
  }
});
// Adding a filter via addFilterSetting
email.addFilterSetting('footer', 'enable', 1);
email.addFilterSetting('footer', 'text/hmtl', '<strong>boo</strong>');


// Adding a file
email.addFile('secret.txt', '/path/to/file');
```

More examples can be find in the test

## Tests ##
If you're interested in seeing some sample code or just want to run the
test then here's what you need to know.
Test written in the test/lib folder can be ran as in and should all
pass.
Test written in test/intergration need the values in test/test.setup to
be set in order to run and will require a SendGrid account, as these
test will send actual emails.

Running 

```
make test
```

will run all tests, otherwise you can run individual tests by running

```
mocha /path/to/test.test.js
```

For information on how to use Sendgrid see:
[SendGrid API Docs](http://docs.sendgrid.com/documentation/api/)