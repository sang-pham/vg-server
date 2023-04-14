const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const constant = require("../utils/constant");

const horsePlaceSchema = new Schema({
  place_name: {
    type: String,
    default: null,
  },
  place_address: {
    type: String, 
    required: true,
  },
  camping_number: {
    type: Number,
    default: new Date(),
  },
  table_number: {
    type: Number,
    default: new Date(),
  },
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
    default: new Date(),
  },
  is_deleted: {
    type: Number,
    default: 0,
  },
});

const HorsePlace = mongoose.model("horse_place", horsePlaceSchema);

module.exports = HorsePlace;
