const authController = require("./auth");
const userController = require("./user");
const settingController = require("./setting");
const categoryController = require("./category");
const fileController = require("./file");
const productController = require("./product");
const bookingController = require("./booking");
const orderController = require("./order");
const horseServiceController = require("./horse_service");
const customerController = require("./customers.js");
const horsePlaceController = require("./horse_place");

module.exports = {
  authController,
  userController,
  settingController,
  categoryController,
  fileController,
  productController,
  bookingController,
  orderController,
  horseServiceController,
  customerController,
  horsePlaceController,
};
