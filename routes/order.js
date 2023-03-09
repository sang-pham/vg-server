const { Router } = require('express')
const router = new Router()
const {ApiResponse} = require('../libs')
const {asyncHandle} = ApiResponse
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { orderController } = require('../controllers')

router.use(authMiddleware())

router.post('/product',
  asyncHandle(orderController.createProductOrder))

router.post('/booking',
  asyncHandle(orderController.createBookingOrder))

router.get('/my-product',
  asyncHandle(orderController.getOwnProductOrder))

router.get('/my-booking',
  asyncHandle(orderController.getOwnBookingOrder))

router.delete('/:id',
  asyncHandle(orderController.deleteOrder))

router.use(adminMiddleware())

router.get('/product',
  asyncHandle(orderController.getProductOrders))

router.get('/booking',
  asyncHandle(orderController.getBookingOrders))

module.exports = router