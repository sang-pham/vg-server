const authValidator = require('./auth')
const userValidator = require('./user')
const categoryValidator = require('./category')
const commonValidator = require('./common')
const productValidator = require('./product')

module.exports = {
  authValidator,
  userValidator,
  categoryValidator,
  commonValidator,
  productValidator
}