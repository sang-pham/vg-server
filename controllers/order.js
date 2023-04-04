const { ObjectId } = require('../models')
const { orderService, userService, baseService, bookingService } = require('../services')
const { constant, logger } = require('../utils')

const createProductOrder = async (req, res) => {
  try {
    let data = req.body
    data.order_type = constant.ORDER_TYPE.PRODUCT
    data.status = "ORDER_SUCCESS"
    let user = await userService.findById(req.user.user_id)
    if (!user) {
      throw new Error(`Invalid user ${req.user.user_id}`)
    }
    data.user_info = {
      ...user.user_info,
      user_id: user.id,
      username: user.username
    }
    await orderService.createProductOrder(data)
    return {
      success: true,
      message: 'Tạo đơn hàng thành công'
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const createBookingOrder = async (req, res) => {
  try {
    let data = req.body
    data.order_type = constant.ORDER_TYPE.BOOKING
    data.status = "ORDER_SUCCESS"
    let user = await userService.findById(req.user.user_id)
    if (!user) {
      throw new Error(`Invalid user ${req.user.user_id}`)
    }
    data.user_info = {
      ...user.user_info,
      user_id: user.id,
      username: user.username
    }
    await orderService.createBookingOrder(data)
    return {
      success: true,
      message: 'Tạo đơn hàng thành công'
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const getOwnProductOrder = async (req, res) => {
  try {
    let userId = req.user.user_id
    return await baseService.baseFind(
      {
        ...req.query,
        'user_info.user_id': userId,
        is_deleted: false,
        order_type: 0
      },
      {user_info: 1, order_info: 1, created: 1, status: 1, updated: 1, product: 1},
      orderService.aggregateFind
    )
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const getOwnBookingOrder = async (req, res) => {
  try {
    let userId = req.user.user_id
    return await baseService.baseFind(
      {
        ...req.query,
        'user_info.user_id': userId,
        is_deleted: false,
        order_type: 1
      },
      {user_info: 1, order_info: 1, created: 1, status: 1, updated: 1, booking: 1},
      orderService.aggregateFind
    )
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }}

const deleteOrder = async (req, res) => {
  try {
    let { id } = req.params
    let userId = req.user.user_id
    let order = await orderService.findById(id)
    if (!order) {
      throw new Error(`Order with id ${id} does't exist`)
    }
    if (!order.user_info.user_id != userId) {
      throw new Error('Invalid action')
    }
    await order.remove()
    return {
      success: true,
      message: 'Delete order succesfully'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const getProductOrders = async (req, res) => {
  try {
    return await baseService.baseFind(
      {
        ...req.query,
        order_type: 0
      },
      {user_info: 1, order_info: 1, created: 1, status: 1, updated: 1, product: 1},
      orderService.aggregateFind
    )
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const getBookingOrders = async (req, res) => {
  try {
    return await baseService.baseFind(
      {
        ...req.query,
        order_type: 1
      },
      {user_info: 1, order_info: 1, created: 1, status: 1, updated: 1, booking: 1},
      orderService.aggregateFind
    )
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const createHorseClubOrder = async (req, res) => {
  try {
    let data = req.body
    data.order_type = constant.ORDER_TYPE.BOOKING
    data.status = "ORDER_SUCCESS"
    let user = await userService.findById(new ObjectId(req.user.user_id))
    if (!user) {
      throw new Error(`Invalid user ${req.user.user_id}`)
    }
    data.user_info = {
      ...user.user_info,
      user_id: user._id,
      username: user.username
    }
    let booking = await bookingService.findById(data.booking_id, false)
    if (!booking) {
      throw new Error('Chi nhánh không tồn tại')
    }
    if (!booking.services || !booking.services.length) {
      throw new Error('Chi nhánh chưa có dịch vụ nào')
    }
    let isExisted = booking.services.find(item => item._id.toString() == data.service_id)
    if (!isExisted) {
      throw new Error('Chi nhánh không tồn tại dịch vụ tương ứng')
    }
    let {order_info} = data
    if (!order_info || !order_info.table_indexes || !order_info.table_indexes.length) {
      throw new Error('Không đủ thông tin order')
    }
    for (const tableIndex of order_info.table_indexes) {
      if (!booking.tables[tableIndex] || booking.tables[tableIndex].status) {
        throw new Error(`Bàn số ${tableIndex + 1} đã được đặt`)
      } else {
        booking.tables[tableIndex].status = 1
      }
    }
    if (order_info) {
      let paymentType = order_info.payment_type
      if (paymentType && (paymentType == 'MOMO' || paymentType == 'BANK')) {
        order_info.payment_code = Math.round(((Math.random() * 0.9) + 0.1) * Math.pow(10, 8)) + ''
        data.status = "WAIT_FOR_PAY"
      }
    }
    data.booking = {
      booking_type_code: booking.booking_type_code,
      service_id: data.service_id,
      booking_id:  data.booking_id
    }
    await orderService.createBookingOrder(data)
    await booking.save()
    return {
      success: true,
      message: 'Tạo đơn hàng thành công'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const getHorseClubOrders = async (req, res) => {
  try {
    const defaultAggregates = []
    defaultAggregates.push(...[{
      $lookup: {
        from: "bookings",
        localField: "booking.booking_id",
        foreignField: "_id",
        as: "bookings"
      }},
      {
        $unwind: {
          path: '$bookings',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "horse_services",
          localField: "booking.service_id",
          foreignField: "_id",
          as: "services"
        }
      },
      {
        $unwind: {
          path: '$services',
          preserveNullAndEmptyArrays: true
        }
      }
    ])
    if (req.query['booking.booking_id']) {
      req.query['booking.booking_id'] = new ObjectId(req.query['booking.booking_id'])
    }
    if (req.query['booking.service_id']) {
      req.query['booking.service_id'] = new ObjectId(req.query['booking.service_id'])
    }

    return await baseService.baseFind(
      {
        ...req.query,
        order_type: 1,
        is_deleted: false
      },
      {user_info: 1, order_info: 1, created: 1, status: 1, updated: 1, booking: 1, bookings: 1, services: 1},
      orderService.aggregateFind,
      defaultAggregates
    )
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const getOwnHorseClubOrders = async (req, res) => {
  try {
    let userId = req.user.user_id
    const defaultAggregates = []
    defaultAggregates.push(...[{
      $lookup: {
        from: "bookings",
        localField: "booking.booking_id",
        foreignField: "_id",
        as: "bookings"
      }},
      {
        $unwind: {
          path: '$bookings',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "horse_services",
          localField: "booking.service_id",
          foreignField: "_id",
          as: "services"
        }
      },
      {
        $unwind: {
          path: '$services',
          preserveNullAndEmptyArrays: true
        }
      }
    ])

    console.log(userId)
    return await baseService.baseFind(
      {
        ...req.query,
        order_type: 1,
        'user_info.user_id': ObjectId(userId),
        is_deleted: false
      },
      {user_info: 1, order_info: 1, created: 1, status: 1, updated: 1, booking: 1, bookings: 1, services: 1},
      orderService.aggregateFind,
      defaultAggregates
    )
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

module.exports = {
  createProductOrder,
  createBookingOrder,
  getOwnProductOrder,
  getOwnBookingOrder,
  deleteOrder,
  getProductOrders,
  getBookingOrders,
  createHorseClubOrder,
  getHorseClubOrders,
  getOwnHorseClubOrders
}