const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const { userService } = require('./services')

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    if (profile.id) {
      let username = profile.emails[0].value
      let last_name = profile.name.familyName
      let first_name = profile.name.givenName
      const user = await userService.upsertUserInfo(username, {
        username,
        last_name,
        first_name
      })
      done(null, user)
    }
  })
);

module.exports = passport