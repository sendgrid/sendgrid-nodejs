# (LEGACY) Transactional Templates

For this example, we assume you have created a [legacy transactional template](https://sendgrid.com/docs/ui/account-and-settings/mail/#legacy-email-template). Following is the template content we used for testing.

Template ID (replace with your own):

```text
13b8f94f-bcae-4ec6-b752-70d6cb59f932
```

Email Subject:

```text
<%subject%>
```

Template Body:

```html
<html>
<head>
    <title></title>
</head>
<body>
Hello {{name}},
<br /><br/>
I'm glad you are trying out the template feature!
<br /><br/>
<%body%>
<br /><br/>
I hope you are having a great day in {{city}} :)
<br /><br/>
</body>
</html>
```

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  templateId: '13b8f94f-bcae-4ec6-b752-70d6cb59f932',
  substitutions: {
    name: 'Some One',
    city: 'Denver',
  },
};
sgMail.send(msg);
```

Alternatively, you may specify the substitution wrappers via the msg object as well. This will override any wrappers you may have configured globally.

```js
const msg = {
  ...
  substitutionWrappers: ['{{', '}}'],
  ...
};
```
