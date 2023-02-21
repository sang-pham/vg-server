const { User } = require('../models')
const userTokenService = require('./userToken')

const upsertUserInfo = async (username, updateInfo) => {
  try {
    let user = await findByUsername(username)
    if (!user) {
      user = new User()
    }
    for (const key in updateInfo) {
      user[key] = updateInfo[key]
    }
    return await user.save();
  } catch (error) {
    console.log(error)
    return null
  }
}

const findByUsername = async (username) => {
  try {
    return await User.findOne({
      username,
      is_deleted: false
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

const findById = async (userId) => {
  try {
    return await User.findById(userId)
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteUser = async (userId, isHardDelete) => {
  try {
    await userTokenService.removeByUserId(userId)
    if (isHardDelete) {
      await User.findByIdAndRemove(userId)
    } else {
      await User.findByIdAndUpdate(userId, {
        is_deleted: true
      })
    }
    return true
  } catch (error) {
    console.log(error)
    return null
  }
}

const createUser = async (userInfo) => {
  return await User.create({
    ...userInfo
  })
}

const aggregateFind = async (aggregationOperations) => User.aggregate(aggregationOperations)

module.exports = {
  upsertUserInfo,
  findByUsername,
  createUser,
  findById,
  deleteUser,
  aggregateFind
}