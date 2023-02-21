const { userService, userTokenService } = require('../services')
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registInfo = async (req, res) => {
  const {username} = req.body
  let user = await userService.findByUsername(username)
  if (!user) {
    throw new Error('You need to register your username with Google or create new account.')
  }
  if (user.verified) {
    throw new Error(`Username ${username} has been used. Please try another.`)
  }
  user = await userService.upsertUserInfo(username, {
    ...req.body,
    verified: true
  })
  return {
    message: 'Regist info successfully'
  }
}

const signup = async (req, res) => {
  const {username} = req.body
  let user = await userService.findByUsername(username)
  if (user) {
    if (!user.verified) {
      throw new Error(`Username ${username} is pending to verify.`)
    }
    throw new Error(`Username ${username} has been used. Please use another one.`)
  }
  user = await userService.createUser({
    ...req.body,
    verified: true
  })
  return {
    message: 'Sign up successfully'
  }
}

const login = async (req, res) => {
  const {username, password} = req.body
  try {
    let user = await userService.findByUsername(username)
    if (!user) {
      return {
        success: false,
        status: 401,
        message: `Username ${username} doesn't exist`
      }
    }
    const isPasswordMatch = user.role == 'super_admin' ? 
      password == user.password : await bcrpyt.compare(password, user.password);
    if (!isPasswordMatch) {
      return {
        success: false,
        status: 401,
        message: 'Username and password haven\'t matched'
      }
    }
    const accessToken = jwt.sign({
      role: user.role,
      username: user.username,
      user_id: user.id
    }, process.env.ACCESS_TOKEN_SECRET || 'SECRET', { expiresIn: '1h' })
    const refreshToken = jwt.sign({
      role: user.role,
      username: user.username,
      user_id: user.id
    }, process.env.REFRESH_TOKEN_SECRET || 'SECRET',  { expiresIn: '1w' })
    await userTokenService.removeAndCreate(
      user.id,
      refreshToken
    )
    return {
      status: 200,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something is wrong',
      status: 500
    }
  }
}

const getNewAccessToken = async (req, res) => {
  const { refresh_token } = req.body
  if (!refresh_token) {
    return {
      success: false,
      status: 400,
      message: `Refresh token is required`
    }
  }
  try {
    const result = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
    const {role, username, user_id} = result
    const accessToken = jwt.sign({
      role,
      username,
      user_id
    }, process.env.ACCESS_TOKEN_SECRET || 'SECRET', { expiresIn: '1h' })
    return {
      success: true,
      status: 200,
      data: {
        access_token: accessToken
      }
    }
  } catch (error) {
    if (error) {
      return {
        success: false,
        status: 400,
        message: 'Invalid token. Please try logging in again.'
      }
    }
  }
}

module.exports = {
  registInfo,
  signup,
  login,
  getNewAccessToken
}