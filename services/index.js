const userService = require('./user')
const userTokenService = require('./userToken')
const settingService = require('./setting')
const categoryService = require('./category')
const fileService = require('./file.service')
const baseService = require('./base')

module.exports = {
  userService,
  userTokenService,
  settingService,
  categoryService,
  fileService,
  baseService
}