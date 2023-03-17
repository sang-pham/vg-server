const { checkSchema } = require("express-validator");

const validateRegisterInfo = checkSchema({
  username: {
    in: "body",
    errorMessage: "Username must be filled",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  password: {
    in: "body",
    isLength: {
      errorMessage: "Password must be filled",
      options: { min: 1 },
    },
  },
});

const validateLoginInfo = checkSchema({
  username: {
    in: "body",
    errorMessage: "Username must be filled",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  password: {
    in: "body",
    isLength: {
      errorMessage: "Password must be filled",
      options: { min: 1 },
    },
  },
});

const validateMobileSignIn = checkSchema({
  username: {
    in: "body",
    errorMessage: "Tên tài khoản không được để trống",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  }, 
  password: {
    in: "body",
    errorMessage: "Mật khẩu không được để trống",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
});

const validateMobileSignUp = checkSchema({
  username: {
    in: "body",
    errorMessage: "Tên tài khoản không được để trống",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  email: {
    in: "body",
    errorMessage: "Email không được để trống",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  password: {
    in: "body",
    errorMessage: "Mật khẩu không được để trống",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
});


const validateMobileOTPAuth= checkSchema({
  otp: {
    in: "body",
    errorMessage: "OTP không được để trống",
    trim: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  
});

module.exports = {
  validateRegisterInfo,
  validateLoginInfo, 
  validateMobileOTPAuth,
  validateMobileSignIn,
  validateMobileSignUp
};
