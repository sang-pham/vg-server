const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  category_code: {
    type: String
  },
  category_name: {
    type: String,
    required: true,
    unique: true
  },
  parent_category_id: {
    type: mongoose.Types.ObjectId,
    default: null
  },
  parent_category_code: {
    type: String,
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
const Category = mongoose.model('categories', categorySchema)

categorySchema.pre('save', function (next) {
  this.updated = new Date()
  return next()
})

module.exports = Category