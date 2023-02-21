const { userService, userTokenService } = require('../services')
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registInfo = async (req, res) => {
  const {email} = req.body
  let user = await userService.findByEmail(email)
  if (!user) {
    throw new Error('You need to register your email with Google or create new account.')
  }
  if (user.verified) {
    throw new Error(`Email ${email} has been used. Please try another.`)
  }
  user = await userService.upsertUserInfo(email, {
    ...req.body,
    verified: true
  })
  return {
    message: 'Regist info successfully'
  }
}

const signup = async (req, res) => {
  const {email} = req.body
  let user = await userService.findByEmail(email)
  if (user) {
    if (!user.verified) {
      throw new Error(`Email ${email} is pending to verify.`)
    }
    throw new Error(`Email ${email} has been used. Please use another one.`)
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
  const {email, password} = req.body
  try {
    let user = await userService.findByEmail(email)
    if (!user) {
      return {
        success: false,
        status: 401,
        message: `Email ${email} doesn't exist`
      }
    }
    const isPasswordMatch = user.role == 'super_admin' ? 
      password == user.password : await bcrpyt.compare(password, user.password);
    if (!isPasswordMatch) {
      return {
        success: false,
        status: 401,
        message: 'Email and password haven\'t matched'
      }
    }
    const accessToken = jwt.sign({
      role: user.role,
      email: user.email,
      user_id: user.id
    }, process.env.ACCESS_TOKEN_SECRET || 'SECRET', { expiresIn: '1h' })
    const refreshToken = jwt.sign({
      role: user.role,
      email: user.email,
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
    const {role, email, user_id} = result
    const accessToken = jwt.sign({
      role,
      email,
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