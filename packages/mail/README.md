## Mail service for the Sendgrid API
This is a dedicated service for interaction with the mail endpoint of the Sendgrid API.

### Initialization with API key
Load the library and set the API key if you haven’t set it before:

```js
//Load library
const sgMail = require('@sendgrid/mail');

//Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### Basic usage (single email to one recipient)
Load the library, prepare your email data and use the `send` method:

```js
//Load library
const sgMail = require('@sendgrid/mail');

//Create email data
const data = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};

//Send email
sgMail.send(data);
```

### Basic usage (single email to multiple recipients)
The `to` field can contain an array of recipients, which will send a single email with all of the recipients in the `to` field. The recipients will be able to see each other:

```js
//Load library
const sgMail = require('@sendgrid/mail');

//Create email data
const data = {
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};

//Send email
sgMail.send(data);
```

### Basic usage (multiple emails to multiple recipients)
If you want to send multiple _individual_ emails to multiple recipient where they don't see each others email addresses, use `sendMultiple` instead:

```js
//Load library
const sgMail = require('@sendgrid/mail');

//Create email data
const data = {
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};

//Send emails
sgMail.sendMultiple(data);
```

Note that `sendMultiple(data)` is a convenience shortcut for `send(data, true)`.

### Basic usage (multiple single emails)
The `send` method also accepts an array of email data if you want to send multiple different single emails with for example different content and sender values. This will send multiple requests (in parallel), so be aware of any API rate restrictions:

```js
//Load library
const sgMail = require('@sendgrid/mail');

//Create emails data
const emails = [
  {
    to: 'recipient1@example.org',
    from: 'sender@example.org',
    subject: 'Hello recipient 1',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
  },
  {
    to: 'recipient2@example.org',
    from: 'other-sender@example.org',
    subject: 'Hello recipient 2',
    text: 'Hello other plain world!',
    html: '<p>Hello other HTML world!</p>',
  },
];

//Send emails
sgMail.send(emails);
```

### Using transactional templates
Configure the substitution tag wrappers:

```js
sgMail.setSubstitutionWrappers('{{', '}}');
```

Then provide a template ID and substitutions:

```js
const data = {
  templateId: 'sendgrid-template-id',
  substitutions: {
    name: 'Some One',
    id: '123',
  },
};
```

### Flexible email address fields
The email address fields (`to`, `from`, `cc`, `bcc`, `replyTo`) are flexible and can be any of the following:

```js
const data = {

  //Simple email address string
  to: 'someone@example.org',

  //Email address with name
  to: 'Some One <someone@example.org>',

  //Object with name/email
  to: {
    name: 'Some One',
    email: 'someone@example.org',
  },
};
```

### Handling success/failure
The `send` and `sendMultiple` methods return a `Promise`, so you can handle success and capture errors:

```js
sgMail
  .send(data)
  .then(() => {
    //Celebrate
  })
  .catch(error => {
    //Do something with the error
  });
```

Alternatively, pass a callback function as the last parameter:

```js
sgMail
  .send(data, (error, result) => {
    if (error) {
      //Do something with the error
    }
    else {
      //Celebrate
    }
  });
```

### Customization per recipient
To send multiple individual emails to multiple recipients with a different subject and/or substitutions, expand the `to` array as follows:

```js
//Load library
const sgMail = require('@sendgrid/mail');

//Create email data
const data = {
  to: [
    {
      email: 'recipient1@example.org',
      subject: 'Hello recipient 1',
      substitutions: {
        name: 'Recipient 1',
        id: '123',
      },
    },
    {
      email: 'recipient2@example.org',
      subject: 'Hello recipient 2',
      substitutions: {
        name: 'Recipient 2',
        id: '456',
      },
    }
  ],
  from: 'sender@example.org',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};

//Send emails
sgMail.sendMultiple(emails);
```

### Sending attachments


### Advanced usage
All other advanced settings are supported and can be passed in through the data object according to the expected format as per the [API v3 documentation](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html). Note that you can use either `camelCase` or `snake_case` for property names:

```js
const data = {

  //Manually provide personalizations instead of using the `to` property
  personalizations: Array,

  //Subject
  subject: String,

  //Manually provide contents array instead of using `html` and `text`
  content: Array,

  //Attachments
  attachments: Array,

  //Template ID
  templateId: String,

  //Sections
  sections: {},

  //Headers
  headers: {},

  //Categories
  categories: Array,

  //Custom arguments
  customArgs: {},

  //Time to send at (in seconds)
  sendAt: Number,

  //Batch ID
  batchId: String,

  //ASM
  asm: {},

  //IP pool name
  ipPoolName: String,

  //Mail settings
  mailSettings: {},

  //Tracking settings
  trackingSettings: {},
}
```
