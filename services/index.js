const userService = require('./user')
const userTokenService = require('./userToken')
const settingService = require('./setting')
const categoryService = require('./category')
const fileService = require('./file.service')
const productService = require('./product')
const bookingService = require('./booking')
const orderService = require('./order')
const horseService = require('./horse_service')
const baseService = require('./base')

module.exports = {
  userService,
  userTokenService,
  settingService,
  categoryService,
  fileService,
  productService,
  bookingService,
  orderService,
  horseService,
  baseService
}