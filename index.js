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
const horseServiceRoute = require('./routes/horse_service')
const horseRoute = require("./routes/horse")
const configRoute = require("./routes/configs")
const customerRoute = require("./routes/customers")
const horsePlaceRoute = require("./routes/horse_place")

const cors = require('cors')
const logger = require('./utils/logger')

const app = express();

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.all('/*', function(req, res, next) {
  logger.info("Request " + req.url)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.all('/*', function(req, res, error, next) {
  logger.error("error " + error)
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
app.use('/api/admin-accounts', userRoute)
app.use('/api/setting', settingRoute)
app.use('/api/category', categoryRoute)
app.use('/api/file', fileRoute)
app.use('/api/product', productRoute)
app.use('/api/booking', bookingRoute)
app.use('/api/order', orderRoute)
app.use('/api/horse-service', horseServiceRoute)
app.use('/api/horse-club', horseRoute)
app.use('/api/configs', configRoute)
app.use('/api/customers', customerRoute)
app.use('/api/horse-place', horsePlaceRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, (port) => {
  logger.info(`Server is listening on port ${PORT}`)
});
