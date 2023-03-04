const mongoose = require('mongoose')
const User = require('./user')
const UserToken = require('./user_token')
const Setting = require('./setting')
const Category = require('./category')
const File = require('./file')
const Product = require('./product')
const Booking = require('./booking')
const mongoDb = require('./db')
const ObjectId = mongoose.Types.ObjectId


module.exports = {
  User,
  UserToken,
  Setting,
  ObjectId,
  Category,
  File,
  Product,
  Booking,
  mongoDb
}