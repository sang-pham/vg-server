const { Router } = require('express')
const router = new Router()
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { bookingController } = require('../controllers')
const { bookingValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.use(authMiddleware())

router.get('',
  asyncHandle(bookingController.getBookings))

router.get('/:id',
  bookingValidator.validateBookingById,
  asyncHandle(bookingController.getBookingById)
)

router.post('',
  adminMiddleware(),
  asyncHandle(bookingController.createBooking))

router.put('/:id',
  adminMiddleware(),
  asyncHandle(bookingController.updateBooking))

  router.delete('/:id',
  adminMiddleware(),
  asyncHandle(bookingController.deleteBookingById))

module.exports = router