const { User } = require('../models')

const upsertUserInfo = async (email, updateInfo) => {
  try {
    let user = await findByEmail(email)
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

const findByEmail = async (email) => {
  try {
    return await User.findOne({
      email,
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
  findByEmail,
  createUser,
  findById,
  deleteUser,
  aggregateFind
}