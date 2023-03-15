const { bookingService, categoryService, baseService } = require('../services')
const { logger } = require('../utils')

const getBookings = async (req, res) => {
  try {
    const defaultAggregates = []
    const { booking_type_code } = req.query
    switch(booking_type_code) {
      case 'HORSE_CLUB':
        defaultAggregates.push({
          $lookup: {
            from: "horse_services",
            localField: "services._id",
            foreignField: "_id",
            as: "services"
          }
        })
      break;
    }
    return await baseService.baseFind(
      req.query,
      {booking_type_code: 1, booking_type_name: 1, created: 1, booking_info: 1, updated: 1, services: 1, bookingServices: 1},
      bookingService.aggregateFind,
      defaultAggregates
    )
  } catch (error) {
    logger.error(error)
  }
}

const getBookingById = async (req, res) => {
  try {
    const booking = bookingService.findById(req.params.id)
    return {
      success: true,
      message: 'Success',
      data: booking
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something was'
    }
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
  deleteBookingById,
  getBookingById
}