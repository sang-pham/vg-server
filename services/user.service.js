const { User } = require('../models')

const upsertUserInfo = async (email, updateInfo) => {
  try {
    return await User.findOneAndUpdate({
      email
    }, {
      $set: updateInfo
    }, { upsert: true, new: true })
  } catch (error) {
    console.log(error)
    return null
  }
}

const findByEmail = async (email) => {
  try {
    return await User.findOne({
      email
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  upsertUserInfo,
  findByEmail
}