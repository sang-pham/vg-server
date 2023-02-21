const {checkSchema} = require("express-validator")
const { validateObjectId } = require('./common')
const {ObjectId} = require('../models')

const validateCreateUser = checkSchema({
  username: {
    in: 'body',
    errorMessage: 'Username must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  }
})

const validateDeleteUser = checkSchema({
  user_id: {
    in: 'query',
    custom: {
      options: (value) => {
        return validateObjectId(value, 'user_id')
      }
    },
    customSanitizer: {
      options: (value) => {
        return ObjectId.isValid(value) ? new ObjectId(value) : value
      }
    }
  }
})

const commonValidateGet = {
  page: {
    in: 'query',
    errorMessage: 'Giá trị page không hợp lệ',
    isInt: {
      options: {
        min: 1
      }
    },
    toInt: true
  },
  size: {
    in: 'query',
    errorMessage: 'Giá trị size không hợp lệ',
    isInt: {
      options: {
        min: 1
      }
    },
    toInt: true
  }
}

const validateGetUsers = checkSchema({
  ...commonValidateGet
})

module.exports = {
  validateCreateUser,
  validateDeleteUser,
  validateGetUsers
}