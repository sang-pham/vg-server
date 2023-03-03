const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const productSchema = new Schema({
  product_type_code: {
    type: String,
    required: true
  },
  product_type_name: {
    type: String,
    required: true
  },
  product_info: {
    type: Object,
    default: {}
  },
  created: {
    type: Date,
    default: new Date()
  },
  updated: {
    type: Date,
    default: new Date()
  }
})

const Product = mongoose.model('products', productSchema)

module.exports = Product