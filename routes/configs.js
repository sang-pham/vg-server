const { Router } = require('express')
const router = new Router()
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { horseServiceController } = require('../controllers')
const { horseServiceValidator } = require('../validators')

const configController = require('../controllers/config')

const horseServiceList = require('../utils/configs')

const {asyncHandle} = ApiResponse

 
router.use(authMiddleware()) 

// API for config service_infos and tenant info 
router.get('/',
  adminMiddleware(),
  asyncHandle(configController.getConfig))

// router.delete('/configs/:id',
//   horseServiceValidator.validateDeleteHorseService,
//   asyncHandle(configService.deleteService))
 

module.exports = router