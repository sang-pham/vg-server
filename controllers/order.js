const { orderService, userService, baseService } = require('../services')
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

module.exports = {
  createProductOrder,
  createBookingOrder,
  getOwnProductOrder,
  getOwnBookingOrder,
  deleteOrder
}