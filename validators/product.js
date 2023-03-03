const {checkSchema} = require("express-validator")
const { validateObjectId } = require('./common')
const {ObjectId} = require('../models')

const validateCreateProduct = checkSchema({
  product_type_code: {
    in: 'body',
    errorMessage: 'Product Type Code must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  },
  // product_info: {
  //   in: 'body',
  //   custom: {
  //     options: (value) => {
  //       try {
  //         if (!value || !Object.keys(value).length) {
  //           return "Product info is invalid format "
  //         }
  //       } catch (error) {
  //         console.log(error)
  //         return "Product info is invalid format "
  //       }
  //     }
  //   }
  // }
})

const validateUpdateProduct = checkSchema({
  id: {
    in: 'params',
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

module.exports = {
  validateCreateProduct,
  validateUpdateProduct
}