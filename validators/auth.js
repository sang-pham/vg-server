const {checkSchema} = require("express-validator")

const validateUpdateInfo = checkSchema({
  email: {
    in: 'body',
    errorMessage: 'Email must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  },
  last_name: {
    in: 'body',
    errorMessage: 'Last name must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  },
  first_name: {
    in: 'body',
    errorMessage: 'First name must be filled',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  },
  birth_day: {
    in: 'body',
    isDate: true,
    errorMessage: 'Birth day must be date format'
  },
  phone_number: {
    in: 'body',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    },
    isMobilePhone: true,
    errorMessage: 'Phone number is wrong format'
  },
  sex: {
    in: 'body',
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    },
    errorMessage: 'Sex must be male or female'
  }
})

module.exports = {
  validateUpdateInfo
}

