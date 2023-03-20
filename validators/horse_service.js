const {checkSchema} = require("express-validator")
const { validateObjectId } = require('./common')
const {ObjectId} = require('../models')
const { constant } = require('../utils')

const validateCreateHorseService = checkSchema({
  // booking_id: {
  //   in: 'body',
  //   errorMessage: 'booking_id must be filled',
  //   custom: {
  //     options: (value) => {
  //       return validateObjectId(value, 'booking_id')
  //     }
  //   },
  //   customSanitizer: {
  //     options: (value) => {
  //       return ObjectId.isValid(value) ? new ObjectId(value) : value
  //     }
  //   }
  // },
  service_type: {
    in: 'body',
    errorMessage: 'Invalid service_type',
    custom: {
      options: (value) => {
        return constant.HORSE_SERVICE_TYPE.find(item => item == value) ? true : false
      }
    },
  }
})

const validateDeleteHorseService = checkSchema({
  id: {
    in: 'req.params',
    errorMessage: 'booking_id must be filled',
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
})

module.exports = {
  validateCreateHorseService,
  validateDeleteHorseService
}