const {Booking} = require('../models')

const createBooking = async (data) => {
  const booking = new Booking(data)
  return booking.save()
}

const aggregateFind = async (aggregationOperations) => Booking.aggregate(aggregationOperations)

const findById = async (id) => Booking.findById(id).populate('services._id', 'service_info').lean()

const deleteById = async (productId) => {
  await Booking.findByIdAndDelete(productId)
}

module.exports = {
  createBooking,
  aggregateFind,
  findById,
  deleteById
}