const { bookingService, categoryService, baseService } = require('../services')
const { logger } = require('../utils')

const getBookings = async (req, res) => {
  try {
    return await baseService.baseFind(
      req.query,
      {booking_type_code: 1, booking_type_name: 1, created: 1, booking_info: 1, updated: 1},
      bookingService.aggregateFind
    )
  } catch (error) {
    logger.error(error)
  }
}

const createBooking = async (req, res) => {
  try {
    const { booking_type_code, booking_info } = req.body
    const category = await categoryService.findOne({
      category_code: booking_type_code
    })
    if (!category) {
      throw new Error(`Invalid booking code ${booking_type_code}`)
    }
    await bookingService.createBooking({
      booking_info,
      booking_type_code,
      booking_type_name: category.category_name
    })
    return {
      success: true,
      message: 'Tạo mới thành công'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const updateBooking = async (req, res) => {
  try {
    const {id} = req.params
    const booking = await bookingService.findById(id)
    if (!booking) {
      return {
        success: false,
        message: `Booking can't be found.`
      }
    }
    for (const key in req.body) {
      booking[key] = req.body[key]
    }
    await booking.save()
    return {
      success: true,
      message: 'Update booking successfully'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || "Something is wrong"
    }
  }
}

const deleteBookingById = async (req, res) => {
  try {
    let { id } = req.params
    await bookingService.deleteById(id)
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || "Something is wrong"
    }
  }
}

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBookingById
}