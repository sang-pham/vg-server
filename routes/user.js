const express = require('express')
const router = new express.Router()
const { userController } = require('../controllers')
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { userValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.use(authMiddleware(), adminMiddleware())

router.get('',
  userValidator.validateGetUsers,
  asyncHandle(userController.getUsers))

router.post('',
  userValidator.validateCreateUser,
  asyncHandle(userController.createUser))

router.delete('',
  userValidator.validateDeleteUser,
  asyncHandle(userController.deleteUser))

module.exports = router