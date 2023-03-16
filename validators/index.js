const authValidator = require('./auth')
const userValidator = require('./user')
const categoryValidator = require('./category')
const commonValidator = require('./common')
const productValidator = require('./product')
const horseServiceValidator = require('./horse_service')
const bookingValidator = require('./booking')
const orderValidator = require('./order')

module.exports = {
  authValidator,
  userValidator,
  categoryValidator,
  commonValidator,
  productValidator,
  horseServiceValidator,
  bookingValidator,
  orderValidator
}