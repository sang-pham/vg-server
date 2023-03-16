const { HorseClubSet } = require('../models')

const create = async (data) => {
  const horseClubSet = new HorseClubSet(data)

  await horseClubSet.save()
}

const findByBookingId = async (bookingId) => {
  return HorseClubSet.find({
    booking_id: bookingId
  })
}

module.exports = {
  create,
  findByBookingId
}