const express = require('express')
const router = new express.Router()
const { customerController } = require('../controllers')
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { userValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.use(authMiddleware(), adminMiddleware())

router.get('', 
  asyncHandle(customerController.getAll))

router.put('/reset-password/:id', 
  asyncHandle(customerController.create))

router.put('/:id', 
  asyncHandle(customerController.update))

router.post('', 
  asyncHandle(customerController.delete)) 

module.exports = router