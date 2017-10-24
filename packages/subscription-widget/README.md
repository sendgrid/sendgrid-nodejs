# Email Subscription Widget with Double Opt-In

Note: This is not an officially supported SendGrid library

This is an open source repository to add a flexible email subscription widget, like the one shown below, to any website using [SendGrid](https://sendgrid.com/). After following these directions, you'll be able to add a snippet of HTML to any website that will collect email addresses for your app or business. This widget utilizes [double opt-in](https://sendgrid.com/docs/Glossary/opt_in_email.html) functionality, which means users must confirm their email addresses by clicking an email that is automatically sent to their provided email address.

![alt text](https://github.com/devchas/sendgrid_subscription_widget/blob/master/server/static/sample-form.png "Sample Form")

## Requirements

Before following these instructions, you must:
* Have a SendGrid account - [sign up here](https://sendgrid.com/pricing/)
* Sign up for a [free Heroku account](https://signup.heroku.com/)

## Instructions

### Initial SendGrid Set-up - Create API Key & Contact List
To begin, you will first need to create an API key on SendGrid's website. Once logged in, go to Settings -> API Keys, and click the blue button in the top right corner of the website.  You will be creating a General API key, which must have *Full Access* to *Mail Send* and *Marketing Campaigns*.  Keep this API key in a *safe* and *private* location.  You will need it later.

### Fork this Repository to Create Your Own Copy
If you are unfamiliar with Github, simply click the button that reads *Fork* in the top right of this page. Doing this will provide you with your own copy.  You'll need to change a few basic settings in your copy.

### Deploy to Heroku

**Make sure you Fork this repository before clicking the Deploy to Heroku button below**

Click the button below to deploy this app to the Heroku account you created earlier.  Once complete, locate the URL of your app.  You will need this for the following step.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Once the app is deployed, you may want to connect your forked Github repository to your Heroku app for easy deployment. You can do this by navigating to the *Deploy* tab within your app on Heroku and following the instructions.

### Update Your App Settings in Your Forked Repository on Github
Navigate to settings.js in your forked copy of the repository and change each of the four variables to the appropriate values. You can find your app's URL by opening your app or navigating to the *Activity* tab in Heroku and scrolling to the middle of the page to the domains section. See the example below.

```javascript
exports.url = 'https://your_heroku_app_name.herokuapp.com';
exports.senderEmail = "sender@example.com";
exports.senderName = "Sender Name";

// set 'exports.listId = null' to add contact to all contacts, but no specific list
exports.listID = 651138;

// set 'exports.templateId = null' to opt out of using a template
exports.templateId = "dbc810ec-b776-4345-b0c7-02e2bbcd2ab4"
```

#### Add Contact to a Custom Marketing List (Optional)
By default, the widget is configured to save a new contact to your master list of ALL CONTACTS. However, you may choose to save new contacts to a specified custom list as well. To do so, you must first create a new contact list by navigating to Marketing Campaigns -> Contacts, and then click the blue button in the top right corner of the page. Once the list is created, you will require the list ID.  You can find this number by navigating to the list and looking at the URL.  The list ID will be the numbers following the last forward slash.  For example, the list ID of a list with URL of https://sendgrid.com/marketing_campaigns/lists/651138 would be 651138. Once you have created a new list, change the value of exports.listId to the ID of that marketing list.  This value is null by default.

#### Use a Transactional Template (Optional)
You may also send your confirmation email using [transactional email templates](https://sendgrid.com/solutions/transactional-email-templates/) to give your email a more professional look and feel.  To do so, you must first create a template by following the steps provided in [this guide](https://sendgrid.com/docs/User_Guide/Transactional_Templates/index.html). Once you have created a custom transacitonal email template, change the value of the exports.templateId to the ID of the template you created. If you choose to use templates, **you must include a substitution tag named "link_insert"**. This will be substituted with the link that signs up a user in the double opt-in process. (Example template below)

![alt text](https://github.com/devchas/sendgrid_subscription_widget/blob/master/server/static/template.png "Transactional Email Template")

#### Edit the Form with Your Custom URL
Navigate to the index.html file (server -> static -> index.html) and change the action in the form to reflect your app's URL. Remember to leave "/confirmEmail" at the end. The text in this file is what you will be embedding in your website. See below for an example.

```html
<form action="https://your_heroku_app_name.herokuapp.com/confirmEmail" method="post">
	<fieldset>
		<legend>Enter Your Information</legend>
		<label for="email">Email:</label>
		<input type="text" name="email" placeholder="hello@example.com" /><br>
		<label for="first_name">First Name:</label>		
		<input type="text" name="first_name" placeholder="John" /><br>
		<label for="last_name">Last Name:</label>
		<input type="text" name="last_name" placeholder="Doe" /><br>
		<button type="submit" value="Submit" />SIGN UP</button>
	</fieldset>
</form>
```

*Remember to always re-deploy your app after making any changes.*

### Add API Key as Environmental Variable on Heroku
Next, configure your API key as an environmental variable, which can be done either through Heroku's user interface or the Heroku CLI as shown in [these directions](https://devcenter.heroku.com/articles/config-vars). Updating the environment variable in your Heroku account can be done by logging into your heroku account, navigating to your newly deployed app, and clicking settings. Inside the settings page you will see an option to "Reveal Config Vars".  You must name your variable holding your API key *SG_API_KEY*.

### Enable Event Webhook
The final step is to enable the event webhook on your SendGrid account. This will allow the opt-in component of the signup to function properly. In order to set up an event webhook, navigate to Settings -> Mail Settings, and then click on *Event Notification*.  

Make sure the toggle in the top left of that section is set to *ON*. Click edit. Enter the root URL of your Heroku app + '/signup'. The following is an example URL: https://your_heroku_app_name.herokuapp.com/signup. 

For the types of events to receive, make sure to select only *Clicked*. Then, click the blue check box in the top right corner of the section to save changes.


### Test Your Widget
In order to easily test that your subscription widget is working properly, you may navigate to the root URL of your Heroku app and enter an email that you have access to. If everything is working, you should receive an email with a link to confirm your subscription. Upon clicking this link, the email should be added to the SendGrid contact list you created earlier.

## Usage and Customization

### Usage

In order to use this widget, once you've followed the setup steps above, drop all of text from the index.html file you altered earlier into any website.

### Customization

You may change the look and feel of the form or create a new one.  The form will continue to work so long as the action is what you specified earlier, the method is post, and there is an input element with name *email*.  The default widget comes with three fields: 1) email, 2) first name, 3) last name.  You may remove first and/or last name if you so choose.  In addition, you may change the form's styling by adjusting the CSS contained in index.html.

#### Adding New Fields
You may also add [custom fields](https://sendgrid.com/docs/User_Guide/Marketing_Campaigns/custom_fields.html) to the form to save other information about your users during the sign up process. To do so, simply add an additional input field with the name(s) of your custom field(s). If you add a custom field to your form that does not already exist in your SendGrid account, one will automatically be created with the name specified in the form. The example below shows a form with the custom field "favorite_color".

```html
<form action="https://your_heroku_app_name.herokuapp.com/confirmEmail" method="post">
	<fieldset>
		<legend>Enter Your Information</legend>
		<label for="email">Email:</label>
		<input type="text" name="email" placeholder="hello@example.com" /><br>
		<label for="first_name">First Name:</label>		
		<input type="text" name="first_name" placeholder="John" /><br>
		<label for="last_name">Last Name:</label>
		<input type="text" name="last_name" placeholder="Doe" /><br>
		<label for="favorite_color">Favorite Color:</label>
		<input type="text" name="favorite_color" placeholder="Blue" /><br>
		<button type="submit" value="Submit" />SIGN UP</button>
	</fieldset>
</form>
```

You may also change the look of the check-inbox.html and success.html files, both of which are located in the static folder with index.html.  These are the pages that users will be directed to upon entering their email and cliking the confirmation link, respectively.

Finally, you may change the content of the confirmation email by changing the *mailText* variable in the contact_list_controller.js file, which is located in the controllers folder. However, be sure to keep the link intact. If you choose to use a transactional email template, the mail text will be produced by the template, and you may ignore this step.

```javascript
mailText = "Thanks for signing up! Click <a href='" + url + "'>this link</a> \
	to sign up!  This link will be active for 24 hours."
```
 
