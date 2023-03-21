const { Router } = require('express')
const router = new Router()
const {ApiResponse} = require('../libs')
const {asyncHandle} = ApiResponse
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { orderController } = require('../controllers')
const { orderValidator } = require('../validators')

router.use(authMiddleware())

router.post('/product',
  asyncHandle(orderController.createProductOrder))

router.post('/booking/horse-club',
  orderValidator.validateCreateHorseClubOrder,
  asyncHandle(orderController.createHorseClubOrder))

router.get('/my-product',
  asyncHandle(orderController.getOwnProductOrder))

router.get('/my-booking',
  asyncHandle(orderController.getOwnBookingOrder))

router.delete('/:id',
  asyncHandle(orderController.deleteOrder))

router.get('/booking/horse-club/me',
  asyncHandle(orderController.getOwnHorseClubOrders))

router.use(adminMiddleware())

router.get('/product',
  asyncHandle(orderController.getProductOrders))

router.get('/booking',
  asyncHandle(orderController.getBookingOrders))

router.get('/booking/horse-club',
  asyncHandle(orderController.getHorseClubOrders))
  
module.exports = router