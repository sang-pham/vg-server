const { Router } = require('express')
const router = new Router()
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { horseServiceController } = require('../controllers')
const { horseServiceValidator } = require('../validators')

const horseServiceList = require('../utils/configs')

const {asyncHandle} = ApiResponse

 
router.use(authMiddleware()) 

// API for horse config service_infos and tenant info
router.get('/config',
  asyncHandle(horseServiceController.getHorseServices))

router.post('/config',
  adminMiddleware(),
  horseServiceValidator.validateCreateHorseService,
  asyncHandle(horseServiceController.createNewService))

router.put('/config/:id',
  adminMiddleware(),
  asyncHandle(horseServiceController.updateService))

router.delete('/config/:id',
  horseServiceValidator.validateDeleteHorseService,
  asyncHandle(horseServiceController.deleteService))
 

module.exports = router