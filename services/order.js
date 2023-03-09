const { Order } = require('../models')

const createProductOrder = async (data) => {
  const order = new Order(data)
  return order.save()
}

const createBookingOrder = async (data) => {
  const order = new Order(data)
  return order.save()
}

const findById = async (orderId) => {
  return Order.findById(orderId)
}

const aggregateFind = async (aggregationOperations) => Order.aggregate(aggregationOperations)

module.exports = {
  createProductOrder,
  createBookingOrder,
  aggregateFind,
  findById
}