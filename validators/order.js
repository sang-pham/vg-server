const {checkSchema} = require("express-validator")
const { validateObjectId } = require('./common')
const { ObjectId } = require('../models')

const validateCreateHorseClubOrder = checkSchema({
  booking_id: {
    in: 'body',
    custom: {
      options: (value) => {
        return validateObjectId(value, 'id')
      }
    },
    customSanitizer: {
      options: (value) => {
        return ObjectId.isValid(value) ? new ObjectId(value) : value
      }
    }
  },
  service_id: {
    in: 'body',
    custom: {
      options: (value) => {
        return validateObjectId(value, 'id')
      }
    },
    customSanitizer: {
      options: (value) => {
        return ObjectId.isValid(value) ? new ObjectId(value) : value
      }
    }
  },
  order_info: {
    in: 'body',
    errorMessage: 'Order info must be filled',
    notEmpty: true
  },
  booking_time: {
    in: 'body.order_info',
    errorMessage: 'Booking time must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  }
})

module.exports = {
  validateCreateHorseClubOrder
}