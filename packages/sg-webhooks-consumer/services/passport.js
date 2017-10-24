const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const config = require('../config');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).exec((err, user) => {
    done(null, user);
  })
});
passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async(accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({
    googleId: profile.id
  })
  if (existingUser) {
    return done(null, existingUser);
  }
  const user = await new User({
    googleId: profile.id
  }).save();
  done(null, user);
}));
