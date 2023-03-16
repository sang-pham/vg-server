const mongoose =  require('mongoose')
const { Schema } = require('mongoose')
const constant = require('../utils/constant')

const horseClubSetSchema = new Schema({
  description: {
    type: String,
    required: true
  }
})

const HorseClubSet = mongoose.model('horse_club_sets', horseClubSetSchema)

module.exports = HorseClubSet