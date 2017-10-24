## To Start Local Server - 
 A. Setting Up the server - 
 
  1. Install heroku-cli
  2. Install nodemon with `npm i -g nodemon`
  3. Run `npm i` to install the server-side dependencies
  4. Run `touch .env` then open it and fill it like the sample .env file.
  5. Run `npm start` and make sure the mongo instance is also running.
     
 B. Setting Up the client - 
 
  1. Run `cd client ` in separate terminal to change into client directory.
  2. In client directory run `npm i` to install client-side dependencies.
  3. In client directory run `touch .env` and fill `stripePubKey=pk_test_--------------` in it .
  4. In client directory run `npm start `.
  5. Navigate to localhost:3000 in the browser.


  Go to https://app.sendgrid.com/settings/mail_settings and enable Event Notification. There pass the callback url as `{hosturl}/api/surveys/webhooks`. Also check that click tracking is enabled.
 
## Sample .env file
```
NODE_ENV=development
port=5000
googleClientID=-------------.apps.googleusercontent.com
googleClientSecret=--------------
mongoURI=mongodb://localhost:27017/merndemodb
cookieKey=---------------
HOST_URL=http://localhost:5000
stripePubKey=pk_test_--------------
stripeSecretKey=sk_test_-------------
```

## Milestones 
 1. [x] Configure Express to work with React.js via Proxy.
 2. [x] Google Oauth2.0 Api.
 3. [x] Stripe payment Api.
 4. [x] Setup production build to Heroku.
 5. [x] Handle multiple env variables for both server and client.
 6. [x] Use ES2017 syntax with async/await instead of promises.
 7. [x] React with Redux architecture.
 8. [x] Session Authentication with Passport.js and Cookies.
 9. [x] Create Webhooks for Google and Stripe Apis.
 10. [x] Database Management using MongoDB.

Note - 
1. Heroku Cli is used for handling **environment variables** and deploys.
2. To get **googleClientID** and **googleClientSecret** make a new project at [here](https://console.developers.google.com) and enable the Google+ api.
3. To get **stripePubKey** and **stripeSecretKey** create account on [Stripe](http://stripe.com/).
4. If you don't have **mongodb** locally, then create a remote db [here](https://mlab.com/home)
