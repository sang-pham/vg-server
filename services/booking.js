const {Booking} = require('../models')

const createBooking = async (data) => {
  const booking = new Booking(data)
  return booking.save()
}

const aggregateFind = async (aggregationOperations) => Booking.aggregate(aggregationOperations)

module.exports = {
  createBooking,
  aggregateFind
}