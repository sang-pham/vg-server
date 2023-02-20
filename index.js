const express = require('express')
const passport = require('./passport')
require('dotenv').config()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')

const app = express();

mongoose.set("strictQuery", false);

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.MONGOQUERYPARAMS}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err)
  }
);

app.use(express.json())

app.use(passport.initialize());

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);

app.get('/auth/google/callback', passport.authenticate('google',  { 
  failureRedirect: '/signup',
  session: false 
}), (req, res) => {
  return res.status(200).send('Regist info success')
});

app.use('/', authRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, (port) => {
  console.log(`Server is listening on port ${PORT}`)
});