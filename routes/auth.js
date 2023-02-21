const express = require('express')
const { authController } = require('../controllers')
const router = new express.Router()
const {ApiResponse} = require('../libs');
const { authValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.post('/register-info',
  authValidator.validateRegisterInfo,
  asyncHandle(authController.registInfo))

router.post('/signup',
  authValidator.validateRegisterInfo,
  asyncHandle(authController.signup))

router.post('/signin',
  authValidator.validateLoginInfo,
  asyncHandle(authController.login))

router.post('/access-token',
  asyncHandle(authController.getNewAccessToken))

module.exports = router