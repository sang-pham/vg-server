const {checkSchema} = require("express-validator")

const validateRegisterInfo = checkSchema({
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
  password: {
    in: 'body',
    isLength: {
      errorMessage: 'Password should be at least 6 chars long',
      options: { min: 6 },
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

const validateLoginInfo = checkSchema({
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
  password: {
    in: 'body',
    isLength: {
      errorMessage: 'Password should be at least 6 chars long',
      options: { min: 6 },
    }
  }
})

module.exports = {
  validateRegisterInfo,
  validateLoginInfo
}

