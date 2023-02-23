const {checkSchema} = require("express-validator")

const validateCreateProduct = checkSchema({
  service_category_code: {
    in: 'body',
    errorMessage: 'Service code must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  },
  service_category_name: {
    in: 'body',
    errorMessage: 'Service name must be filled',
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

module.exports = {
  validateCreateProduct
}