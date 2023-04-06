const mongoose = require("mongoose");
const User = require("./user");
const UserToken = require("./user_token");
const Setting = require("./setting");
const Category = require("./category");
const File = require("./file");
const Product = require("./product");
const Booking = require("./booking");
const Order = require("./order");
const HorseService = require("./horse_service");
const HorseClubSet = require("./horse_club_set");
const Config = require("./config");
const mongoDb = require("./db");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  User,
  UserToken,
  Setting,
  ObjectId,
  Category,
  File,
  Product,
  Booking,
  Order,
  HorseService,
  HorseClubSet,
  mongoDb,
  Config,
};
