const express = require('express')
const router = new express.Router()
const { userController } = require('../controllers')
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { userValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.use(authMiddleware(), adminMiddleware())

router.get('', 
  asyncHandle(userController.getUsers))

router.put('/reset-password/:id',
  userValidator.validateResetPassword,
  asyncHandle(userController.resetPassword))

router.put('/:id',
  userValidator.validateUserId,
  asyncHandle(userController.updateUser))

router.post('',
  userValidator.validateCreateUser,
  asyncHandle(userController.createUser))

router.delete('',
  userValidator.validateDeleteUser,
  asyncHandle(userController.deleteUser))

module.exports = router