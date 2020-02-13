# Kitchen Sink - an example with all settings used

All other options from the [API definition](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html) are supported (note that some settings can be used in multiple ways, see above for full details for each setting):

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  cc: 'someone@example.org',
  bcc: ['me@example.org', 'you@example.org'],
  from: 'sender@example.org',
  replyTo: 'othersender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  templateId: 'sendgrid-template-id',
  substitutionWrappers: ['{{', '}}'],
  substitutions: {
    name: 'Some One',
    id: '123',
  },
  attachments: [
    {
      content: 'Some attachment content',
      filename: 'some-attachment.txt',
    },
  ],
  categories: ['Transactional', 'My category'],
  sendAt: 1500077141,
  headers: {
    'X-CustomHeader': 'Custom header value',
  },
  sections: {},
  customArgs: {
    myCustomArg: 'some string', // must be a string
  },
  batchId: 'sendgrid-batch-id',
  asm: {
    groupId: 1
  },
  ipPoolName: 'sendgrid-ip-pool-name',
  mailSettings: {},
  trackingSettings: {},
};
sgMail
  .send(msg)
  .then(() => console.log('Mail sent successfully'))
  .catch(error => console.error(error.toString()));
```

### Caveats:

As per [issue #288](https://github.com/sendgrid/sendgrid-nodejs/issues/288), please note that the `customArgs` field *must* have a string value. 
