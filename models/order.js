const mongoose = require('mongoose')
const { Schema } = mongoose
const { constant } = require('../utils')

const orderSchema = new Schema({
  order_type: {
    type: Number,
    default: constant.ORDER_TYPE.PRODUCT
  },
  user_info: {
    type: Object,
    required: true
  },
  order_info: {
    type: Object,
    required: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  updated: {
    type: Date,
    default: new Date()
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: null
  },
  product: {
    type: Object,
    default: null
  },
  booking: {
    type: Object,
    default: null
  }
})

const Order = mongoose.model('orders', orderSchema)

module.exports = Order