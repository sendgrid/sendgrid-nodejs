This documentation provides examples for specific email use cases. Please [open an issue](https://github.com/sendgrid/sendgrid-nodejs/issues) or make a pull request for any email use cases you would like us to document here. Thank you!

# Table of Contents

* [Send a Single Email to a Single Recipient](#single-email-single-recipient)
* [Send a Single Email to Multiple Recipients](#single-email-multiple-recipients)
* [Send Multiple Emails to Multiple Recipients](#multiple-emails-multiple-recipients)
* [CC, BCC and Reply To](#cc-bcc-reply-to)
* [Handling Success/Failure/Errors](#success-failure-errors)
* [Advanced Usage](#advanced)
  * [Transactional Templates](#transactional-templates)
  * [Attachments](#attachments)
  * [Customization Per Recipient](#customization)
  * [Manually Providing Content](#manual-content)
  * [Specifying Time to Send At](#time-to-send)
  * [Specifying Custom Headers](#custom-headers)
  * [Specifying Categories](#categories)
  * [Kitchen Sink - an example with all settings used](#kitchensink)
  * [Managing multiple API keys](#multipleapikeys)
* [Deploy a simple Hello Email app on Digital Ocean with Node.js](#digitaloceandeploy)  
* [Deploy a Simple App on Google App Engine with Node.js](#gae)
* [Deploy a Simple App on Heroku with Node.js](#heroku)
* [How to Setup a Domain Whitelabel](#domain-white-label)
* [How to View Email Statistics](#email-stats)

<a name="single-email-single-recipient"></a>
# Send a Single Email to a Single Recipient

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.send(msg);
```

<a name="single-email-multiple-recipients"></a>
# Send a Single Email to Multiple Recipients

The `to` field can contain an array of recipients, which will send a single email with all of the recipients in the `to` field. The recipients will be able to see each other:

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.send(msg);
```

If you want to send multiple _individual_ emails to multiple recipient where they don't see each others email addresses, use `sendMultiple` instead:

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: ['recipient1@example.org', 'recipient2@example.org'],
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
sgMail.sendMultiple(msg);
```

Note that `sendMultiple(msg)` is a convenience shortcut for `send(msg, true)`, and alternatively you can also set the `isMultiple` flag to `true` on your `msg` object.

<a name="multiple-emails-multiple-recipients"></a>
# Send Multiple Emails to Multiple Recipients

The `send` method also accepts an array of email msg if you want to send multiple different single emails with for example different content and sender values. This will send multiple requests (in parallel), so be aware of any API rate restrictions:

```js
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
sgMail.send(emails);
```

<a name="cc-bcc-reply-to"></a>
# CC, BCC and Reply To

You can specify the `cc`, `bcc` and `replyTo` fields for more control over who you send the email to and where people will reply to:

```js
const msg = {
  to: 'recipient@example.org',
  cc: 'someone@example.org',
  bcc: ['me@example.org', 'you@example.org'],
  from: 'sender@example.org',
  replyTo: 'othersender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
```

## Flexible email address fields
The email address fields (`to`, `from`, `cc`, `bcc`, `replyTo`) are flexible and can be any of the following:

```js
const msg = {

  //Simple email address string
  to: 'someone@example.org',

  //Email address with name
  to: 'Some One <someone@example.org>',

  //Object with name/email
  to: {
    name: 'Some One',
    email: 'someone@example.org',
  },

  //Arrays are supported for to, cc and bcc
  to: [
    'someone@example.org',
    'Some One <someone@example.org>',
    {
      name: 'Some One',
      email: 'someone@example.org',
    },
  ],
};
```

<a name="success-failure-errors"></a>
# Handling Success/Failure/Errors

The `send` and `sendMultiple` methods return a `Promise`, so you can handle success and capture errors:

```js
sgMail
  .send(msg)
  .then(() => {
    //Celebrate
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    const {message, code, response} = error;

    //Extract response msg
    const {headers, body} = response;
  });
```

Alternatively, pass a callback function as the last parameter:

```js
sgMail
  .send(msg, (error, result) => {
    if (error) {
      //Do something with the error
    }
    else {
      //Celebrate
    }
  });
```

<a name="advanced"></a>
# Advanced Usage

All other advanced settings are supported and can be passed in through the msg object according to the expected format as per the [API v3 documentation](https://sendgrid.com/docs/API_Reference/api_v3.html). Note that you can use either `camelCase` or `snake_case` for property names.

<a name="transactional-templates"></a>
## Transactional Templates

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

<a name="attachments"></a>
## Attachments

Attachments can be sent by providing an array of `attachments` as per the [API specification](https://sendgrid.com/docs/API_Reference/api_v3.html):

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

<a name="customization"></a>
## Customization Per Recipient

To send multiple individual emails to multiple recipients with additional customization (like a different subject), use the `personalizations` field as per the [API definition](https://sendgrid.com/docs/API_Reference/api_v3.html) instead of `to`, leveraging all customization options:

```js
const msg = {
  personalizations: [
    {
      to: 'recipient1@example.org',
      subject: 'Hello recipient 1',
      substitutions: {
        name: 'Recipient 1',
        id: '123',
      },
      headers: {
        'X-Custom-Header': 'Recipient 1',
      },
      customArgs: {
        myArg: 'Recipient 1',
      },
    },
    {
      to: 'recipient2@example.org',
      subject: 'Hello recipient 2',
      substitutions: {
        name: 'Recipient 2',
        id: '456',
      },
      headers: {
        'X-Custom-Header': 'Recipient 2',
      },
      customArgs: {
        myArg: 'Recipient 1',
      },
      sendAt: 1500077141,
    }
  ],
  from: 'sender@example.org',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
```

If the `substitutions` field is provided globally as well, these substitutions will be merged with any custom substitutions you provide in the `personalizations`.

<a name="manual-content"></a>
## Manually Providing Content

Instead of using the `text` and `html` shorthand properties, you can manually use the `content` property:

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello manual content',
  content: [
    {
      type: 'text/plain',
      value: 'Hello plain world!',
    },
    {
      type: 'text/html',
      value: '<p>Hello HTML world!</p>',
    },
  ],
};
```

<a name="custom-headers"></a>
## Specifying Custom Headers

Use the `headers` property to specify any custom headers (note that these can also be set globally per the [API specification](https://sendgrid.com/docs/API_Reference/api_v3.html):

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello custom header',
  html: '<p>Some email content</p>',
  headers: {
    'X-CustomHeader': 'Custom header value',
  },
};
```

<a name="time-to-send"></a>
## Specifying Time to Send At

Use the `sendAt` property to specify when to send the emails (in [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) seconds, not milliseconds):

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello delayed email',
  html: '<p>Some email content</p>',
  sendAt: 1500077141,
};
```

<a name="categories">categories</a>
## Specifying Categories

Use the `categories` property to provide an array of categories for your email:

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello email with categories',
  html: '<p>Some email content</p>',
  categories: [
    'transactional', 'customer', 'weekly',
  ],
};
```

Specifying a single `category` is also supported:

```js
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello email with categories',
  html: '<p>Some email content</p>',
  category: 'transactional',
};
```

<a name="multipleapikeys"></a>
## Managing multiple API keys

In cases where you need to manage multiple instances of the mailer (or underlying client),
for example when you are using multiple API keys, you can import the mail service class and
instantiate new instances as required:

```js
const {MailService} = require('@sendgrid/mail');

//Instantiate mailers
const sgMail1 = new MailService();
const sgMail2 = new MailService();

//Set different API keys
sgMail1.setApiKey('KEY1');
sgMail2.setApiKey('KEY2');

//Now send emails with the mailers as per the usual
```

<a name="kitchen-sink"></a>
## Kitchen Sink - an example with all settings used

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
    myCustomArg: 123,
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

<a name="digitaloceandeploy"></a>
# Deploy a simple Hello Email app on Digital Ocean with Node.js

### Create a DigitalOcean droplet and install Node.js
[This tutorial by DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04#create-nodejs-application) walks through the process of setting up a Node.js application on Ubuntu. The tutorial will take a simplified, summarized approach.

First, create a [DigitalOcean](https://www.digitalocean.com) droplet.  Then, login to your VPS from command line. Next, install Node.js.  The following commands are explained in detail in the aforementioned tutorial.
```
$ sudo apt-get update
$ sudo apt-get install git
$ cd ~
$ wget [Insert Linux Binaries (.tar.xz) download link]
$ mkdir node
$ tar xvf node-v*.tar.?z --strip-components=1 -C ./node
$ cd ~
$ rm -rf node-v*
$ mkdir node/etc
$ echo 'prefix=/usr/local' > node/etc/npmrc
$ sudo mv node /opt/
$ sudo chown -R root: /opt/node
$ sudo ln -s /opt/node/bin/node /usr/local/bin/node
$ sudo ln -s /opt/node/bin/npm /usr/local/bin/npm
```

### Creating the repository
Next, create a directory to house our Node.js application that will send email. The application will be housed in a directory located at /var/www/domain.com
```
$ cd /var
$ mkdir www & cd www
$ mkdir domain.com && cd domain.com
```
[This tutorial by DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps) walks through the process of setting up automatic deployment with git with a VPS.  Again, this tutorial will not go into the detail behind the commands but will provide a summary.

```
$ cd ~/var
$ mkdir repo && cd repo
$ mkdir site.git && cd site.git
$ git init --bare
$ cd hooks
$ cat > post-receive
```
When you execute this command, you will have a blank line indicating that everything you type will be saved to this file. So let's type:
```
#!/bin/sh
git --work-tree=/var/www/domain.com --git-dir=/var/repo/site.git checkout -f
```
When you finish typing, press 'control-d' to save. In order to execute the file, we need to set the proper permissions using:
```
$ chmod +x post-receive
```
Then exit and return to local machine
```
$ exit
```

### Create send email repo on local machine
```
$ cd /my/workspace
$ mkdir project && cd project
$ git init
$ git remote add live ssh://user@mydomain.com/var/repo/site.git
```

Install package manager and SendGrid dependency. Interactively create a package.json file using
```
$ npm init
```
Then follow the prompts. Next, install the SendGrid mail dependency.
```
$ npm install --save @sendgrid/mail
```
Create an index.js file where we will save our Hello Email script
```
$ touch index.js
```

Insert Hello Email script into index.js
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
```

Next, add a .gitignore file with your /node_modules.

Then, push code to Digital Ocean
```
$ git add .
$ git commit -m "My project is ready"
$ git push live master
  Counting objects: 7, done.Delta compression using up to 4 threads.Compressing objects: 100% (7/7), done.Writing objects: 100% (7/7), 10.56 KiB, done.Total 7 (delta 0), reused 0 (delta 0)To ssh://user@mydomain.com/var/repo/site.git* [new branch]      master -> master
```

### Final Setup on DigitalOcean

Navigate to app directory on DigitalOcean
```
$ ssh root@[your-IP-address]
$ cd /var/www/domain.com
```

Install dependencies and set API key.  Install dependencies on your DigitalOcean droplet.
```
$ npm install
```
Save your SendGrid API key as an environment variable.
```
$ export SENDGRID_API_KEY=[your-api-key]
```

Test that your app works
```
$ node index.js
```

=======
<a name="gae"></a>
## Deploy a Simple App on Google App Engine with Node.js

Before you begin, setup google app engine and install required packages by following [getting started](https://cloud.google.com/nodejs/getting-started/hello-world) guide.

#### Setup your environment variables
Include your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys) in `app.yaml`, for example: 

```yaml
# Note: Don't commit the app.yaml file with API key, keep it changed locally - only used in deployment
env_variables:
  SENDGRID_API_KEY: YOUR_API_KEY
```

#### Install necessary packages, and update package.json

For example:

```
yarn add @sendgrid/mail
yarn add express
```

Edit `package.json` as follows:

```json
"scripts": {
  "deploy": "gcloud app deploy",
  "start": "node app.js"
},
```

#### Implement the Hello Email app.js file

```js
const express = require('express');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();

app.get('/send', (req, res) => {
  const {query: {to = 'test@example.com', from = 'test@example.com'}} = req;
  // other options could be customized further
  
  const msg = {
    to,
    from,
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>Hello Email app</strong>',
  };
  
  sgMail.send(msg).then(() => {
    res.status(200).send('Hello, world!').end();
  }).catch(e => {
    console.error(e.toString());
    res.status(500).end();
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
```

#### Deploy and running the app on App Engine

1. Deploy the Hello World app by running the following command from the application directory:
   ```
   gcloud app deploy
   ```
  
 #### Send email 
 
 Using the following snippet you should be able to send emails with the deployed app (replace `to` and `from` with your own)
 
 ```curl
 curl -X GET \
  'http://your_project_id.appspot.com/send?to=to%40example.com&from=from%40example.com' \
  -H 'cache-control: no-cache'
 ```

<a name="deploy_heroku"></a>
# Deploy a Simple App on Heroku with Node.js

Here are step by step instructions to deploy your Node.js app to Heroku (assuming you have a NodeJS app running on localhost tracked by git):

- `heroku create` (you may need to have your `heroku login` ready)
- `git push heroku master`
- `heroku ps:scale web=1`
- `heroku config:set SENDGRID_API_KEY=SG.YOUR.OWN-API_KEY-HERE` (replace `SG.YOUR.OWN-API_KEY-HERE` with your own [api key from sendgrid](https://app.sendgrid.com/settings/api_keys)

If you run into any other non SendGrid related issues, don't forget to read through [Heroku's deployment documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs).
 
<a name="domain-white-label"></a>
# How to Setup a Domain Whitelabel

You can find documentation for how to setup a domain whitelabel via the UI [here](https://sendgrid.com/docs/Classroom/Basics/Whitelabel/setup_domain_whitelabel.html) and via API [here](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md#whitelabel).

Find more information about all of SendGrid's whitelabeling related documentation [here](https://sendgrid.com/docs/Classroom/Basics/Whitelabel/index.html).

<a name="email-stats"></a>
# How to View Email Statistics

You can find documentation for how to view your email statistics via the UI [here](https://app.sendgrid.com/statistics) and via API [here](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md#stats).

Alternatively, we can post events to a URL of your choice via our [Event Webhook](https://sendgrid.com/docs/API_Reference/Webhooks/event.html) about events that occur as SendGrid processes your email.

