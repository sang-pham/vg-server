const {checkSchema} = require("express-validator")

const validateCreateCategory = checkSchema({
  category_type: {
    in: 'body',
    errorMessage: 'Category type must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  },
  category_name: {
    in: 'body',
    errorMessage: 'Category name must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  }
})

module.exports = {
  validateCreateCategory
}