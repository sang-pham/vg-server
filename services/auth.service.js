const nodemailer = require("nodemailer");
const NodeCache = require("node-cache");
const otpGenerator = require("random-otp");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("redis");

const logger = require("../utils/logger");
const { userService, userTokenService } = require("../services");
const { User } = require("../models");
const { constant } = require("../utils");
const getMailTemplate = require("../utils/signup-confirm");

const cache = new NodeCache();

const client = createClient({ url: `redis://:Linh1998@@${process.env.DB_HOST}:6379/0`, expire: 60 });

client.connect();

client.on("error", (err) => console.log("Redis Client Error", err)); 
// client.get("key1").then((value) => {
//   console.log(value);
// });

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

async function getCacheKey(username) {
  let cacheKey = `otp_user_${username}`;
  console.log(`Get cache key:`, cacheKey);
  return cacheKey;
}

function getToken(user) {
  const accessToken = jwt.sign(
    {
      role: user.role,
      username: user.username,
      user_id: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET || "SECRET",
    { expiresIn: "1h" },
  );
  const refreshToken = jwt.sign(
    {
      role: user.role,
      username: user.username,
      user_id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET || "SECRET",
    { expiresIn: "1w" },
  );
  user.password = null;
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    user_info: user,
  };
}

async function sendMail(userData) {
  let cacheKey = await getCacheKey(userData.username);
  let currentOtp = await client.get(cacheKey);
  if (currentOtp) {

    // ignore if already cached 
    await client.del(cacheKey);
  }
  let otp = otpGenerator.generaterandomNumbers(6);
  let timeExpired = 120;
  await client.set(cacheKey, otp);
  await client.expire(cacheKey, timeExpired); 
  let info = await transport.sendMail({
    from: '"Vietgangz 👻" <foo@example.com>',
    to: userData?.email, // list
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

const mobileVerifyAuth = async (username, formData, from) => {
  let userExist;
  console.log("otp:", formData);
  userExist = await User.exists({ username: username });
  if (!userExist) {
    throw new Error(`Tài khoản không tồn tại`);
  }
  let cacheKey = await getCacheKey(username);
  let otp = await client.get(cacheKey);
  console.log(`OTP:`, otp);
  if (!otp || formData.otp !== otp + "") {
    throw new Error(`Mã xác minh không đúng hoặc hết hạn`);
  }
  let model = await User.updateOne({ username: username }, { verified: true });
  let user = await User.findOne({ username: username });
  await client.del(cacheKey);
  return getToken(user);
};

const signupResendOTP = async (username) => {
  let userExist;
  userExist = await User.exists({ username: username });
  if (!userExist) {
    throw new Error(`Tài khoản không tồn tại`);
  }
  sendMail({ username: username });
  return;
};

const mobileSignIn = async (formData) => {
  let userExist;
  userExist = await User.exists({ username: formData.username });
  if (!userExist) {
    throw new Error(`Tài khoản không tồn tại`);
  }
  let user = await User.findOne({ username: formData.username });
  if (user.verified === false) {
    throw new Error(`Tài khoản chưa xác minh`);
  }
  const isPasswordMatch = await bcrpyt.compare(formData.password, user.password);
  if (!isPasswordMatch) {
    throw new Error(`Mật khẩu không chính xác`);
  }

  return getToken(user);
};

module.exports = {
  signup,
  mobileSignup,
  mobileVerifyAuth,
  signupResendOTP,
  mobileSignIn,
};
