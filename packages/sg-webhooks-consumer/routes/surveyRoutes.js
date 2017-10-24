const config = require('../config');
const _ = require('lodash');
const Path = require('path-parser');
const {
  URL
} = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mailer = require('../services/mailer');
const User = require('../models/User');
const Survey = require('../models/Survey');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async(req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id
    }).select({
      recipients: false
    }).sort({
      dateSent: -1
    });
    res.send(surveys);
  });
  app.get('/api/surveys/submit', (req, res) => {
    let redirect = "http://localhost:3000/surveys";
    if (config.NODE_ENV === 'production') {
      redirect = config.hostName;
    }
    res.redirect(redirect);
  });
  app.get('/api/surveys/manual', (req, res) => {
    Survey.updateOne({
      _id: req.query.surveyId,
      recipients: {
        $elemMatch: {
          email: req.query.email,
          responded: false
        }
      }
    }, {
      $inc: {
        [req.query.response]: 1
      },
      $set: {
        'recipients.$.responded': true
      },
      lastResponded: new Date()
    }).exec((err, data) => {
      console.log('data', data);
    });
  });
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const picked = ({
      title,
      subject,
      heading,
      recipients
    }) => ({
      title,
      subject,
      heading,
      recipients
    });
    const surveyData = picked(req.body);
    const survey = new Survey({
      title: surveyData.title,
      subject: surveyData.subject,
      heading: surveyData.heading,
      recipients: surveyData.recipients.split(",").map(email => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    mailer(surveyData, survey._id).then(async() => {
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    }).catch(error => {
      console.error(error.toString());
      const {
        message,
        code,
        response
      } = error;
      const {
        headers,
        body
      } = response;
      res.send(422);
    });
  });
}
