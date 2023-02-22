const mongoose = require('mongoose')
const { Schema } = mongoose

const settingSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  path: {
    type: String,
    required: true
  },
  file_type: {
    type: String
  },
  description: {
    type: String
  },
  created: {
    type: Date,
    default: new Date()
  },
})

const Setting = mongoose.model('settings', settingSchema)
module.exports = Setting