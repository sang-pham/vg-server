const nodemailer = require("nodemailer");
const NodeCache = require("node-cache");
const otpGenerator = require("random-otp");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("redis");

const logger = require("../utils/logger");
const { userService, userTokenService } = require("../services");
const { Config } = require("../models");
const { constant } = require("../utils");
const getMailTemplate = require("../utils/signup-confirm");
const configs = require("../utils/configs");

const getConfig = async (id, withPopulate = true) => {
   let data = await Config.find({}).lean();
   return configs;
};

const updateConfig = async (key, config) => {
  if (!withPopulate) {
    return await Booking.findById(id);
  }
  const booking = await Booking.findById(id).populate({
    path: "services._id",
    select: "service_info",
    populate: {
      path: "sets",
    },
  });
  return;
};

module.exports = {
    getConfig:getConfig,
    
}