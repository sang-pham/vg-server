const { ObjectId } = require('../models')
const { orderService, userService, baseService, bookingService } = require('../services')
const { constant } = require('../utils')

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
    console.log(req.user)
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
    await orderService.createBookingOrder(data)
    await booking.save()
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

module.exports = {
  createProductOrder,
  createBookingOrder,
  getOwnProductOrder,
  getOwnBookingOrder,
  deleteOrder,
  getProductOrders,
  getBookingOrders,
  createHorseClubOrder
}