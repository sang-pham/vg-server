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
    console.log(accessToken, refreshToken, profile)
    if (profile.id) {
      let email = profile.emails[0].value
      let last_name = profile.name.familyName
      let first_name = profile.name.givenName
      const user = await userService.upsertUserInfo(email, {
        email,
        last_name,
        first_name
      })
      console.log(user)
      done(null, user)
    }
  })
);

// passport.serializeUser((user, done) => {
//   console.log(user)
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   console.log(id)
//   User.findById(id)
//     .then(user => {
//       done(null, user);
//     })
// });

module.exports = passport