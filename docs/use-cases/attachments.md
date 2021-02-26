# Attachments

Attachments can be sent by providing an array of `attachments` as per the [API specification](https://sendgrid.com/docs/api-reference/):

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello attachment',
  html: '<p>Here’s an attachment for you!</p>',
  attachments: [
    {
      content: 'Some base 64 encoded attachment content',
      filename: 'some-attachment.txt',
      type: 'plain/text',
      disposition: 'attachment',
      content_id: 'mytext'
    },
  ],
};
```

Reading and converting a local PDF file.

```js
import fs from 'fs';

fs.readFile(('Document.pdf'), (err, data) => {
  if (err) {
    // do something with the error
  }
  if (data) {
    const msg = {
      to: 'recipient@test.org',
      from: 'sender@test.org',
      subject: 'Attachment',
      html: '<p>Here’s an attachment for you!</p>',
      attachments: [
        {
          content: data.toString('base64'),
          filename: 'some-attachment.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
          content_id: 'mytext',
        },
      ],
    };
  }
});
```

If you are using a PDF URL:

```js
import request from 'request';

request(fileURl, { encoding: null }, (err, res, body) => {
  if (err) { return err; }
  if (body) {
    const textBuffered = Buffer.from(body);

    const msg = {
      to: 'recipient@test.org',
      from: 'sender@test.org',
      subject: 'Attachment',
      html: '<p>Here’s an attachment for you!</p>',
      attachments: [
        {
          content: textBuffered.toString('base64'),
          filename: 'some-attachment.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
          content_id: 'mytext',
        },
      ],
    };
    // send msg here
  }
});
```
