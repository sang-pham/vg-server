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
            as: "_services"
          }
        })
      break;
    }
    //temp fix
    const {data, meta} = await baseService.baseFind(
      req.query,
      {booking_type_code: 1, booking_type_name: 1, created: 1, booking_info: 1, updated: 1, services: 1, bookingServices: 1, tables: 1, _services: 1},
      bookingService.aggregateFind,
      defaultAggregates
    )
    for (const booking of data) {
      if (booking.services && booking.services.length && booking._services && booking._services.length) {
        let services = []
        for (let i = 0; i < booking.services.length; i++) {
          services.push({
            ...booking._services[i],
            price_detail: booking.services[i].price_detail || booking._services[i].price_detail
          })
        }
        delete booking._services
        booking.services = services
      }
    }
    return {data, meta}
  } catch (error) {
    logger.error(error)
  }
}

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.findById(req.params.id)
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
    let numberOfTables = booking_info['number_of_tables']
    let tables = []
    if (numberOfTables) {
      for (let i = 0; i < numberOfTables; i++) {
        tables.push({
          _id: Math.round(Math.random() * new Date().getTime()),
          status: 0
        })
      }
    }
    await bookingService.createBooking({
      booking_info,
      booking_type_code,
      booking_type_name: category.category_name,
      tables
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
    let {booking_info} = req.body
    if (booking_info) {
      let numberOfTables = booking_info['number_of_tables']
      let currentNumOfTables = booking.booking_info['number_of_tables']
      let tables = booking.tables
      if (!tables || !tables.length) {
        booking.tables = []
        for (let i = 0; i < numberOfTables; i++) {
          booking.tables.push({
            _id: Math.round(Math.random() * new Date().getTime()),
            status: 0
          })
        }
      } else {
        if (numberOfTables > currentNumOfTables) {
          let sub = numberOfTables - currentNumOfTables
          for (let i = 0; i < sub; i++) {
            booking.tables.push({
              _id: Math.round(Math.random() * new Date().getTime()),
              status: 0
            })
          }
        } else if (numberOfTables < currentNumOfTables) {
          booking.tables = booking.tables.slice(0, numberOfTables)
        }
      }
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