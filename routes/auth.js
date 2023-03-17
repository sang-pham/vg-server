const express = require("express");
const { authController } = require("../controllers");
const router = new express.Router();
const { ApiResponse } = require("../libs");
const { authValidator } = require("../validators");

const { asyncHandle } = ApiResponse;

router.post("/register-info", authValidator.validateRegisterInfo, asyncHandle(authController.registInfo));

router.post("/signup", authValidator.validateRegisterInfo, asyncHandle(authController.signup));

router.post("/signin", authValidator.validateLoginInfo, asyncHandle(authController.login));

router.post("/mobile-signup", authValidator.validateMobileSignUp, asyncHandle(authController.mobileSignup));

router.post("/mobile-signin", authValidator.validateMobileSignIn, asyncHandle(authController.mobileSignIn));

router.post(
  "/mobile-verify-auth/:username",
  authValidator.validateMobileOTPAuth,
  asyncHandle(authController.mobileVerifyAuth),
); 

router.get(
  "/mobile-signup-resend-otp/:username",
  asyncHandle(authController.signupResendOTP),
);

router.post("/access-token", asyncHandle(authController.getNewAccessToken));

module.exports = router;
