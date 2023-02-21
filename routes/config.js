const express = require('express')
const router = new express.Router()
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')

const {asyncHandle} = ApiResponse
router.use(authMiddleware(), adminMiddleware())

// router.put('',
//   asyncHandle)

module.exports = router