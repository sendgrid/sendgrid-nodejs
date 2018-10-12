# Transactional Templates

For this example, we assume you have created a [transactional template](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html). Following is the template content we used for testing.

Email Subject:

```text
{{ subject }}
```

Template Body:

```html
<html>
<head>
    <title></title>
</head>
<body>
Hello {{ name }},
<br /><br/>
I'm glad you are trying out the template feature!
<br /><br/>
I hope you are having a great day in {{ city }} :)
<br /><br/>
</body>
</html>
```

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  templateId: 'd-f43daeeaef504760851f727007e0b5d0',
  dynamic_template_data: {
    subject: 'Testing Templates',
    name: 'Some One',
    city: 'Denver',
  },
};
sgMail.send(msg);
```

There's no need to specify the substitution wrappers as it will assume that you're using [Handlebars](https://handlebarsjs.com/) templating by default.
