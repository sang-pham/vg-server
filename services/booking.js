const { Booking } = require('../models')

const createBooking = async (data) => {
  const booking = new Booking(data)
  return booking.save()
}

const aggregateFind = async (aggregationOperations) => Booking.aggregate(aggregationOperations)

const findById = async (id, withPopulate = true) => {
  if (!withPopulate) {
    return await Booking.findById(id)
  }
  const booking = await Booking.findById(id).populate({
    path: 'services._id',
    select: 'service_info',
    populate: {
      path: 'sets'
    }
  })
  return booking
}

const deleteById = async (productId) => {
  await Booking.findByIdAndDelete(productId)
}

module.exports = {
  createBooking,
  aggregateFind,
  findById,
  deleteById
}