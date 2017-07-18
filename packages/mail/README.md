# Mail service for the Sendgrid API
This is a dedicated service for interaction with the mail endpoint of the Sendgrid API.

## Basic usage

### Initialization with API key
Load the library and set the API key if you haven’t set it before:

```js
//Load library
const sgMail = require('@sendgrid/mail');

//Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### Single email to one recipient
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

### Single email to multiple recipients
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

### Multiple emails to multiple recipients
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

Note that `sendMultiple(data)` is a convenience shortcut for `send(data, true)`, and alternatively you can also set the `isMultiple` flag to `true` on your `data` object.

### Multiple single emails
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

## Advanced usage
All other advanced settings are supported and can be passed in through the data object according to the expected format as per the [API v3 documentation](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html). Note that you can use either `camelCase` or `snake_case` for property names.

### Using transactional templates
Configure the substitution tag wrappers globally:

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

Alternatively, you may specify the substitution wrappers via the data object as well. This will override any wrappers you may have configured globally.

```js
const data = {
  templateId: 'sendgrid-template-id',
  substitutionWrappers: ['{{', '}}'],
  substitutions: {
    name: 'Some One',
    id: '123',
  },
};
```

### Customization per recipient
To send multiple individual emails to multiple recipients with a different subject and/or substitutions, expand the `to` array as follows:

```js
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
```

### Sending attachments
Attachments can be sent by providing an array of `attachments` as per the API specifications:

```js
const data = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello attachment',
  html: '<p>Here’s an attachment for you!</p>',
  attachments: [
    {
      content: 'Some attachment content',
      filename: 'some-attachment.txt',
    },
  ],
};
```

### Manually providing personalizations
Instead of using the `to` shorthand proper, you can still manually provide `personalizations` as per the API definition:

```js
const data = {
  from: 'sender@example.org',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  personalizations: [
    {
      to: [
        {
          name: 'Someone',
          email: 'someone@example.org',
        },
      ],
      cc: [
        {
          name: 'Someone Else',
          email: 'someone.else@example.org',
        },
      ],
      subject: 'Some subject',
    }
  ],
};
```

### Manually providing content
Instead of using the `text` and `html` shorthand properties, you can manually use the `content` property:

```js
const data = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello manual content',
  content: [
    {
      type: 'text/html',
      value: '<p>Hello HTML world!</p>',
    },
    {
      type: 'text/plain',
      value: 'Hello plain world!',
    },
  ],
};
```

### Specifying time to send at
Use the `sendAt` property to specify when to send the emails (in seconds, not milliseconds):

```js
const data = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello delayed email',
  html: '<p>Some email content</p>',
  sendAt: 1500077141,
};
```

### Specifying custom headers
Use the `headers` property to specify any custom headers:

```js
const data = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello custom header',
  html: '<p>Some email content</p>',
  headers: {
    'X-CustomHeader': 'Custom header value',
  },
};
```

### Specifying categories
Use the `categories` property to provide an array of categories for your email:

```js
const data = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello email with categories',
  html: '<p>Some email content</p>',
  categories: [
    'transactional', 'customer', 'weekly',
  ],
};
```

### Other options
All other options from the [API definition](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html) are supported:

```js
const data = {

  //Sections
  sections: {},

  //Custom arguments
  customArgs: {},

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
