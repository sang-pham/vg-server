const {Booking} = require('../models')

const createBooking = async (data) => {
  const booking = new Booking(data)
  return booking.save()
}

const aggregateFind = async (aggregationOperations) => Booking.aggregate(aggregationOperations)

const findById = async (id) => Booking.findById(id)

const deleteById = async (productId) => {
  await Booking.findByIdAndDelete(productId)
}

module.exports = {
  createBooking,
  aggregateFind,
  findById,
  deleteById
}