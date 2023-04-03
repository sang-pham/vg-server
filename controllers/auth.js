const { userService, userTokenService, authService } = require("../services");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const logger = require("../utils/logger");

const registInfo = async (req, res) => {
  const { username } = req.body;
  let user = await userService.findByUsername(username);
  if (!user) {
    throw new Error("You need to register your username with Google or create new account.");
  }
  if (user.verified) {
    throw new Error(`Username ${username} has been used. Please try another.`);
  }
  user = await userService.upsertUserInfo(username, {
    ...req.body,
    verified: true,
  });
  return {
    message: "Regist info successfully",
  };
};

const signup = async (req, res) => {
  const { username } = req.body;
  let user = await userService.findByUsername(username);
  if (user) {
    if (!user.verified) {
      throw new Error(`Tài khoản ${username} đang chờ xác thực.`);
    }
    throw new Error(`Tài khoản ${username} đã tồn tại. Vui lòng sử dụng tài khoản khác.`);
  }
  user = await userService.createUser({
    ...req.body,
    verified: true,
  });
  return {
    message: "Sign up successfully",
  };
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await userService.findByUsername(username);
    if (!user) {
      return {
        success: false,
        status: 401,
        message: `Tài khoản ${username} không tồn tại`,
      };
    }
    const isPasswordMatch =
      user.role == "super_admin" ? password == user.password : await bcrpyt.compare(password, user.password);
    if (!isPasswordMatch) {
      return {
        success: false,
        status: 401,
        message: "Tài khoản và mật khẩu không hợp lệ",
      };
    }
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
    await userTokenService.removeAndCreate(user.id, refreshToken);
    user.password = null;
    return {
      status: 200,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        user_info: user,
      },
    };
  } catch (error) {
    return {
      message: "Something is wrong",
      status: 500,
    };
  }
};

const mobileSignup = async (req, res) => {
  try {
    let formData = req.body;
    await authService.mobileSignup(formData);
    return {
      message: "Vui lòng nhập mã xác thực được gửi đến mail",
      status: 200,
    };
  } catch (err) {
    logger.error(err);
    return {
      message: `${err.message}`,
      status: 500,
    };
  }
};

const mobileSignIn = async (req, res) => {
  try {
    let formData = req.body;
    let data = await authService.mobileSignIn(formData);
    return {
      message: "Đăng nhập thành công",
      status: 200,
      data: data,
    };
  } catch (err) {
    logger.error(err);
    return {
      message: `${err.message}`,
      status: 500,
    };
  }
};

const mobileVerifyAuth = async (req, res) => {
  try {
    let username = req.params?.username;
    let from = req.query.from;
    let formData = req.body;
    let data = await authService.mobileVerifyAuth(username, formData, from);
    return {
      message: "Đăng ký thành công",
      status: 200,
      data: data,
    };
  } catch (err) {
    logger.error(err);
    return {
      message: `${err.message}`,
      status: 500,
    };
  }
};

const signupResendOTP = async (req, res) => {
  try {
    let username = req.params?.username;
    await authService.signupResendOTP(username);
    return {
      message: "Gửi lại mã thành công",
      status: 200,
    };
  } catch (err) {
    logger.error(err);
    return {
      message: `${err.message}`,
      status: 500,
    };
  }
};

const getNewAccessToken = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return {
      success: false,
      status: 400,
      message: `Refresh token is required`,
    };
  }
  try {
    const result = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const { role, username, user_id } = result;
    const accessToken = jwt.sign(
      {
        role,
        username,
        user_id,
      },
      process.env.ACCESS_TOKEN_SECRET || "SECRET",
      { expiresIn: "1h" },
    );
    return {
      success: true,
      status: 200,
      data: {
        access_token: accessToken,
      },
    };
  } catch (error) {
    if (error) {
      return {
        success: false,
        status: 400,
        message: "Invalid token. Please try logging in again.",
      };
    }
  }
};

module.exports = {
  registInfo,
  signup,
  login,
  getNewAccessToken,
  mobileSignup,
  mobileVerifyAuth,
  signupResendOTP,
  mobileSignIn,
};
