const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const passport = require('passport');

require('./services/passport');
const config = require('./config');

mongoose.connect(config.mongoURI);

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [config.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/billingRoutes')(app);

if (config.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get('/', (req, res) => {
    res.send({
      message: "Api Server Running !"
    });
  });
}

app.listen(config.port, () => {
  console.log(`app listening on port ${config.port}`);
});
