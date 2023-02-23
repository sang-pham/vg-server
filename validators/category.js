const {checkSchema} = require("express-validator")

const validateCreateCategory = checkSchema({ 
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

const validateDeleteCategory = checkSchema({
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
  validateCreateCategory,
  validateDeleteCategory
}