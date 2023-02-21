const {checkSchema} = require("express-validator")

const validateRegisterInfo = checkSchema({
  username: {
    in: 'body',
    errorMessage: 'Username must be filled',
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
      errorMessage: 'Password must be filled',
      options: { min: 1 },
    }
  }
})

const validateLoginInfo = checkSchema({
  username: {
    in: 'body',
    errorMessage: 'Username must be filled',
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
      errorMessage: 'Password must be filled',
      options: { min: 1 },
    }
  }
})

module.exports = {
  validateRegisterInfo,
  validateLoginInfo
}

