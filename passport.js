const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const User = require('./models/user');

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile)
    if (profile.id) {
      User.findOne({googleId: profile.id})
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.name.familyName + ' ' + profile.name.givenName
            })
            .save()
            .then(user => done(null, user));
          }
        })
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(id)
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

module.exports = passport