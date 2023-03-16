const {checkSchema} = require("express-validator")
const { validateObjectId } = require('./common')

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
  booking_time: {
    in: 'body',
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