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
  services: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        requrie: true,
        refPath: 'serviceModel'
      },
      price_detail: {
        type: Object,
        default: null,
        required: true
      }
    }
  ],
  serviceModel: {
    type: String,
    required: true,
    enum: ['horse_services'],
    default: 'horse_services'
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
}, {
  virtuals: true
})

bookingSchema.virtual('bookingServices', {
  ref: function() { 
    return this.serviceModel;
  },
  localField: 'services._id',
  foreignField: '_id'
})

const Booking = mongoose.model('bookings', bookingSchema)

module.exports = Booking