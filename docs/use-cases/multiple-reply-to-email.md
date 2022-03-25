# Multiple emails in replyTo

An array of recipients who will receive replies and/or bounces. Each object in this array must contain the recipient's email address. Each object in the array may optionally contain the recipient's name. You can either choose to use “reply_to” field or “reply_to_list” but not both. [API specification](https://docs.sendgrid.com/api-reference/mail-send/mail-send#multiple-reply-to-emails)

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Multiple mail in replyTo',
  html: '<p>Here’s an example of multiple replyTo email for you!</p>',
  replyToList: [
        {
            'name': 'Test User1',
            'email': 'test_user1@example.org'
        },
        {
            'email': 'test_user2@example.org'
        }
    ],
};
```

