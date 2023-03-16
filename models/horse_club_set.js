const mongoose =  require('mongoose')
const { Schema } = require('mongoose')

const horseClubSetSchema = new Schema({
  service_id: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'horse_services'
  },
  description: {
    type: String,
    required: true
  }
})

const HorseClubSet = mongoose.model('horse_club_sets', horseClubSetSchema)

module.exports = HorseClubSet