const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const productSchema = new Schema({
  service_category_code: {
    type: String,
    required: true
  },
  service_category_name: {
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