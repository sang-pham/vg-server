const express = require('express')
const router = new express.Router()
const {ApiResponse} = require('../libs')
const { settingController } = require('../controllers')
const { superAdminMiddleware, authMiddleware } = require('../middlewares')

const {asyncHandle} = ApiResponse
router.use(authMiddleware(), superAdminMiddleware())

router.get('',
asyncHandle(settingController.getSettings))

router.post('',
asyncHandle(settingController.upsertSetting))

router.put('/:key',
asyncHandle(settingController.updateByKey))

router.delete('/:key',
  asyncHandle(settingController.deleteByKey))

module.exports = router