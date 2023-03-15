const authValidator = require('./auth')
const userValidator = require('./user')
const categoryValidator = require('./category')
const commonValidator = require('./common')
const productValidator = require('./product')
const horseServiceValidator = require('./horse_service')
const bookingValidator = requrie('./booking')

module.exports = {
  authValidator,
  userValidator,
  categoryValidator,
  commonValidator,
  productValidator,
  horseServiceValidator,
  bookingValidator
}