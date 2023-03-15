const authController = require('./auth')
const userController = require('./user')
const settingController = require('./setting')
const categoryController = require('./category')
const fileController = require('./file')
const productController = require('./product')
const bookingController = require('./booking')
const orderController = require('./order')
const horseServiceController = require('./horse_service')

module.exports = {
  authController,
  userController,
  settingController,
  categoryController,
  fileController,
  productController,
  bookingController,
  orderController,
  horseServiceController
}