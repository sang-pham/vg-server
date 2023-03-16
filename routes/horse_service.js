const { Router } = require('express')
const router = new Router()
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { horseServiceController } = require('../controllers')
const { horseServiceValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.use(authMiddleware())

router.get('',
  asyncHandle(horseServiceController.getHorseServices))

router.post('',
  adminMiddleware(),
  horseServiceValidator.validateCreateHorseService,
  asyncHandle(horseServiceController.createNewService))

router.put('/:id',
  adminMiddleware(),
  asyncHandle(horseServiceController.updateService))

module.exports = router