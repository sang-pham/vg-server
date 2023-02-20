const express = require('express');
const passport = require('./passport');
require('dotenv').config()
const mongoose = require('mongoose')
const session = require('express-session')

const app = express();

mongoose.set("strictQuery", false);

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.MONGOQUERYPARAMS}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err)
  }
);

app.use(passport.initialize());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/sample-auth', passport.authenticate('google', {
  scope: ['profile', 'email']
}, (req, res) => {
  console.log(req, res)
  res.status(200).send('Sample auth')
}))


app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  return res.status(200).send('Login success')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (port) => {
  console.log(`Server is listening on port ${PORT}`)
});