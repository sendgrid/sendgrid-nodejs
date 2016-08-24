This documentation provides examples for specific use cases. Please [open an issue](https://github.com/sendgrid/sendgrid-nodejs/issues) or make a pull request for any use cases you would like us to document here. Thank you!

# Table of Contents

* [Transactional Templates](#transactional_templates)

<a name="transactional_templates"></a>
# Transactional Templates

For this example, we assume you have created a [transactional template](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html). Following is the template content we used for testing.

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
Hello -name-,
<br /><br/>
I'm glad you are trying out the template feature!
<br /><br/>
<%body%>
<br /><br/>
I hope you are having a great day in -city- :)
<br /><br/>
</body>
</html>
```

## With Mail Helper Class

```javascript
var helper = require('sendgrid').mail;
var from_email = new helper.Email('test@example.com');
var to_email = new helper.Email('test@example.com');
var subject = 'I\'m replacing the subject tag';
var content = new helper.Content(
  'text/html', 'I\'m replacing the <strong>body tag</strong>');
var mail = new helper.Mail(from_email, subject, to_email, content);
mail.personalizations[0].addSubstitution(
  new helper.Substitution('-name-', 'Example User'));
mail.personalizations[0].addSubstitution(
  new helper.Substitution('-city-', 'Denver'));
mail.setTemplateId('13b8f94f-bcae-4ec6-b752-70d6cb59f932');

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
```

## Without Mail Helper Class

```javascript
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: {
    personalizations: [
      {
        to: [
          {
            email: 'test@example.com',
          },
        ],
        'substitutions': {
          '-name-': 'Example User',
          '-city-': 'Denver',
        },
        subject: 'I\'m replacing the subject tag',
      },
    ],
    from: {
      email: 'test@example.com',
    },
    content: [
      {
        type: 'text/html',
        value: 'I\'m replacing the <strong>body tag</strong>',
      },
    ],
    'template_id': '13b8f94f-bcae-4ec6-b752-70d6cb59f932',
  },
});

sg.API(request, function(error, response) {
  if (error) {
    console.log('Error response received');
  }
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
```