const userService = require('./user')
const userTokenService = require('./userToken')
const settingService = require('./setting')
const categoryService = require('./category')
const fileService = require('./file.service')
const productService = require('./product')
const bookingService = require('./booking')
const orderService = require('./order')
const horseService = require('./horse_service')
const horseClubSetService = require('./horse_club_set')
const baseService = require('./base')
const authService = require('./auth.service')
const customerService = require('./customer.service.js')
const horsePlaceService = require('./horse_place.js')

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
  baseService,
  authService,
  horseClubSetService,
  customerService,
  horsePlaceService
}