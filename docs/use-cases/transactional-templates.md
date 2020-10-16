# Transactional Templates

For this example, we assume you have created a [dynamic transactional template](https://sendgrid.com/docs/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates/) in the UI or via the API. Following is the template content we used for testing.

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
  dynamicTemplateData: {
    subject: 'Testing Templates',
    name: 'Some One',
    city: 'Denver',
  },
};
sgMail.send(msg);
```

There's no need to specify the substitution wrappers as it will assume that you're using [Handlebars](https://handlebarsjs.com/) templating by default.

## Prevent Escaping Characters

Per Handlebars' documentation: If you don't want Handlebars to escape a value, use the "triple-stash", {{{

> If you include the characters ', " or & in a subject line replacement be sure to use three brackets.

Email Subject:

```text
{{{ subject }}}
```

Template Body:

```html
<html>
<head>
    <title></title>
</head>
<body>
Hello {{{ name }}},
<br /><br/>
I'm glad you are trying out the template feature!
<br /><br/>
<%body%>
<br /><br/>
I hope you are having a great day in {{{ city }}} :)
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
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
  templateId: 'd-f43daeeaef504760851f727007e0b5d0',
  dynamic_template_data: {
    subject: 'Testing Templates & Stuff',
    name: 'Some "Testing" One',
    city: '<b>Denver<b>',
  },
};
sgMail.send(msg);
```
