const nodemailer = require("nodemailer");
const NodeCache = require("node-cache");
const otpGenerator = require("random-otp");
const logger = require("../utils/logger");

const { userService } = require("../services");
const { User } = require("../models");
const { constant } = require("../utils");
const getMailTemplate = require("../utils/signup-confirm");

const cache = new NodeCache();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PW,
  },
});

transport.verify(function (error, success) {
  if (error) {
    logger.error(error);
  } else {
    logger.info("Server is ready to take our messages");
  }
});

function getCacheKey(username) {
  return `otp_user_${username}`;
}

async function sendMail(userData) {
  let cacheKey = getCacheKey(userData.username);
  if (cache.get(cacheKey)) {
    // ignore if already cached
    return;
  }
  let otp = otpGenerator.generaterandomNumbers(6);
  let timeExpired = 120;
  cache.set(cacheKey, otp, timeExpired);
  let info = await transport.sendMail({
    from: '"Vietgangz 👻" <foo@example.com>',
    to: "linhdeptrai1029i@gmail.com", // list
    subject: "[Vietgangz] Mã xác minh ✔",
    text: "Hello world?",
    html: getMailTemplate({ otp: otp }),
  });
  logger.info("Message sent: %s", info.messageId);
}

const signup = async (userData) => {
  return await userService.upsertUserInfo(userData);
};

const mobileSignup = async (formData) => {
  let userExist;
  userExist = await User.exists({ email: formData.email });
  if (userExist) {
    throw new Error(`Email đã tồn tại`);
  }
  userExist = await User.exists({ username: formData.username });
  if (userExist) {
    throw new Error(`Tên đăng nhập đã tồn tại`);
  }
  let model = { ...formData };
  model.role = constant.ROLES.USER;
  model = await User.create(model);
  sendMail(formData);
  return { ...model };
};

const mobileVerifyAuth = async (username, formData) => {
  let userExist;
  userExist = await User.exists({ username: username });
  if (!userExist) {
    throw new Error(`Tài khoản không tồn tại`);
  }
  let cacheKey = getCacheKey(username);
  let otp = cache.get(cacheKey);
  if (!otp || formData.otp !== otp) {
    throw new Error(`Mã xác minh không đúng hoặc hết hạn`);
  }
  let model = await User.updateOne({ username: username }, { verified: true });
  return { ...model };
};

const signupResendOTP = async (username) => {
  let userExist;
  userExist = await User.exists({ username: username });
  if (!userExist) {
    throw new Error(`Tài khoản không tồn tại`);
  }
  let cacheKey = getCacheKey(username);
  let otp = cache.get(cacheKey);
  if (otp) {
    return;
  }
  sendMail(username)
  return;
  
};


module.exports = {
  signup,
  mobileSignup,
  mobileVerifyAuth,
  signupResendOTP
};
