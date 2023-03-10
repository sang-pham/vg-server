const mongoose =  require('mongoose')
const { Schema } = require('mongoose')

const bookingSchema = new Schema({
  booking_type_code: {
    type: String,
    required:  true
  },
  booking_type_name: {
    type: String,
    required: true
  },
  booking_info: {
    type: Object,
    default: {}
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: new Date()
  },
  updated: {
    type: Date,
    default: new Date()
  },
})

const Booking = mongoose.model('bookings', bookingSchema)

module.exports = Booking