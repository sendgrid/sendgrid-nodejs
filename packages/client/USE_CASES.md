This documentation provides examples for specific SendGrid v3 API non mail/send use cases. Please [open an issue](https://github.com/sendgrid/sendgrid-nodejs/issues) or make a pull request for any use cases you would like us to document here. Thank you!

# Table of Contents

* [How to Setup a Domain Whitelabel](#domain_whitelabel)
* [How to View Email Statistics](#email_stats)
* [How to Setup Email Sending by Sendgrid on Azure](#send_via_azure)


<a name="domain-white-label"></a>
# How to Setup a Domain Whitelabel

You can find documentation for how to setup a domain whitelabel via the UI [here](https://sendgrid.com/docs/Classroom/Basics/Whitelabel/setup_domain_whitelabel.html) and via API [here](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md#whitelabel).

Find more information about all of SendGrid's whitelabeling related documentation [here](https://sendgrid.com/docs/Classroom/Basics/Whitelabel/index.html).

<a name="email-stats"></a>
# How to View Email Statistics

You can find documentation for how to view your email statistics via the UI [here](https://app.sendgrid.com/statistics) and via API [here](https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/client/USAGE.md#stats).

Alternatively, we can post events to a URL of your choice via our [Event Webhook](https://sendgrid.com/docs/API_Reference/Webhooks/event.html) about events that occur as SendGrid processes your email.

<a name="send_via_azure"></a>
# How to Setup Email Sending by Sendgrid on Azure

1. First create a account on azure. You can opt for free trial here or buy a subscription.
2. I am assuming you already have sendgrid API Key with you.
3. Create a sample node.js App. with an index.js and create a package.json file using npm init or yarn init. For the rest if the tutorial I will use yarn as my dependency-manager.
4. Install sendgrid-nodejs as a dependency using yarn add @sendgrid/mail.
5. Now we need the SendGrid API key to be as an Environment Variable in our application. For that we will create an sendgrid.env file in our local system. Add it to .gitignore file and refresh the terminal. 
```shell
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```
6. Now lets go to our index.js file and copy paste the following code.
```js
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
This will enable you to send a simple message to be sent to your email.
7. If you have followed all steps till here. Your app should work fine in local. Now it's time to deploy in Azure.
8. Go to Azure dashboard and click on new and type web-apps. Click on the Web-apps block, it will create a pop up fill up name, billing type, OS type as Linux and select Runtime as Node.js 8.0.0 
9. This will take a few seconds and search for the app you just created. Clicking on that will open a pop up. Choose Deployment Options from that and click on Local Git Repository.

