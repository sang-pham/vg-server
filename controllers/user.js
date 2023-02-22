const {userService} = require('../services')
const { common, paging, constant } = require('../utils')

const getUsers = async (req, res) => {
  let {
    page,
    size
  } = req.query

  try {
    const pagingData = common.getLimitOffset({ limit: size, offset: page });
    const {match, sort} = common.genericSearchQuery(req.query)
    console.log(match, sort)
    let aggregationOperations = paging.pagedAggregateQuery(
      pagingData.limit,
      pagingData.offset,
      [
        { $match: match },
        { $project: {username: 1, role: 1, created: 1, user_info: 1, is_deleted: 1}},
        { $sort: Object.keys(sort).length ? sort: {created: -1}}
      ]
    )
    
    let aggregationResult = await userService.aggregateFind(aggregationOperations)
    if (!aggregationResult.length) {
      return {
        meta: {
          total: 0
        },
        data: []
      }
    }
    aggregationResult = aggregationResult[0] || { data: [], total: 0 }
    return {
      data: aggregationResult.data,
      meta: {
        total: aggregationResult.total
      }
    }
  } catch (error) {
    console.log(error)
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
    console.log(error)
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

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  resetPassword
}