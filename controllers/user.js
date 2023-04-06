const {userService, baseService} = require('../services')
const { constant, logger } = require('../utils')

const getUsers = async (req, res) => {
  try {
    let data =  await userService.findAll()
    data.forEach((item, index)=>{
      data[index]['password'] = null
    })
    return {
      success: true,
      message: 200,
      data:data
    }
  } catch (error) {
    logger.error(error)
  }
}

const createUser = async (req, res) => {
  const {username} = req.body
  let user = await userService.findByUsername(username)
  if (user) {
    throw new Error(`Username ${username} has been used`)
  }
  let { role } = req.body
  let requestRole = req.user.role
  if (role == 'admin' && requestRole != 'super_admin') {
    return {
      success: false,
      message: 'You don\'t have permission to create this user type.'
    }
  }
  try {
    await userService.createUser({
      ...req.body,
      created_by: {
        username: req.user.username,
        user_id: req.user.user_id
      }
    })
    return {
      success: true,
      message: 'Create new user succesfully'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something is wrong'
    }
  }
}

const deleteUser = async (req, res) => {
  const {user_id, hard_delete} = req.query
  const user = await userService.findById(user_id)
  if (user) {
    if (user.role == 'admin' && req.user.role != 'super_admin') {
      return {
        success: false,
        message: 'You don\'t have permission to delete this user type.'
      }
    }
  }
  const result = await userService.deleteUser(user_id, hard_delete)
  if (result) {
    return {
      success: true,
      message: "Delete user successfully"
    }
  } else {
    return {
      success: false,
      message: "Fail to delete user"
    }
  }
}

const resetPassword = async (req, res) => {
  let {id} = req.params
  let user = await userService.findById(id)
  if (!user) {
    return {
      success: false,
      message: "User doesn't exist"
    }
  }
  let userRole = user.role
  let reqUser = req.user
  if (userRole == 'admin' && reqUser.role != 'super_admin') {
    return {
      success: false,
      message: "You don't have permission"
    }
  }
  user.password = constant.DEFAULT_USER_PASSWORD
  await user.save()
  return {
    success: true,
    message: "Reset password successfully"
  }
}

const updateUser = async (req, res) => {
  try {
    let {id} = req.params
    let user = await userService.findById(id)
    if (!user) {
      return {
        success: false,
        message: "User doesn't exist"
      }
    }
    let userRole = user.role
    let reqUser = req.user
    if (userRole == 'admin' && reqUser.role != 'super_admin') {
      return {
        success: false,
        message: "You don't have permission"
      }
    }
    for (const key in req.body) {
      user[key] = req.body[key]
    }
    await user.save()
    return {
      success: true,
      message: 'Cập nhật user thành công'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  resetPassword,
  updateUser
}