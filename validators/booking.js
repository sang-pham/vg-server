const {checkSchema} = require("express-validator")
const { validateObjectId } = require('./common')

const validateBookingById = checkSchema({
  id: {
    in: 'param',
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
  }
})

module.exports = {
  validateBookingById
}