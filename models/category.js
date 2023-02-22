const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  category_type: {
    type: String,
    required: true
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
  this.update = new Date()
  return next()
})

categorySchema.pre(['remove', 'deleteOne'], async function(next) {
  try {
    await Category.deleteMany({
      _id: new ObjectId(this._id)
    })
    return next()
  } catch (error) {
    return next(error)
  }
})

module.exports = Category