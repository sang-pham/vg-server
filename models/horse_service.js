const mongoose =  require('mongoose')
const { Schema } = require('mongoose')
const constant = require('../utils/constant')

const horseServiceSchema = new Schema({
  service_info: {
    type: Object,
    default: null
  },
  service_type: {
    type: String,
    enum: constant.HORSE_SERVICE_TYPE,
    required: true
  },
  price_detail: {
    type: Object,
    required: true,
    default: null
    /*
      example: {
        'CHILD': {
          price: 22,
          time: 20(in minutes) or null
        }
      }
    */
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
})

const HorseService = mongoose.model('horse_services', horseServiceSchema)
 
module.exports = HorseService