const { userService } = require('../services')

const signup = async (userData) => {
  return await userService.upsertUserInfo(userData)
}

const signin = async () => {

}

module.exports = {
  signup,
  signin
}