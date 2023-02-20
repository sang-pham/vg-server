const express = require('express')
const { authController } = require('../controllers')
const router = new express.Router()
const {ApiResponse} = require('../libs');
const { authValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.post('/update-info',
  authValidator.validateUpdateInfo,
  asyncHandle(authController.updateInfo))

module.exports = router