const { UserToken } = require('../models')

const removeAndCreate = async (userId, token) => {
  try {
    let userToken = await UserToken.findOne({user_id: userId})
    if (userToken) await userToken.remove()

    userToken = new UserToken({
      user_id: userId,
      refresh_token: token,
      expire_time: 7 * 24 * 60 //time in minutes
    })
    await userToken.save()
    return true
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  removeAndCreate
}