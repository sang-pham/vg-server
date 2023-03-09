const express = require('express')
const passport = require('./passport')
require('dotenv').config()
require('./models/db')
// const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const settingRoute = require('./routes/setting')
const categoryRoute = require('./routes/category')
const fileRoute = require('./routes/file')
const productRoute = require('./routes/product')
const bookingRoute = require('./routes/booking')
const orderRoute = require('./routes/order')
const cors = require('cors')
const logger = require('./utils/logger')

const app = express();

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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
app.use('/api/user', userRoute)
app.use('/api/setting', settingRoute)
app.use('/api/category', categoryRoute)
app.use('/api/file', fileRoute)
app.use('/api/product', productRoute)
app.use('/api/booking', bookingRoute)
app.use('/api/order', orderRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, (port) => {
  logger.info(`Server is listening on port ${PORT}`)
});
