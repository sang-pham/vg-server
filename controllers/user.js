const {userService} = require('../services')
const { common, paging } = require('../utils')

const getUsers = async (req, res) => {
  let {
    page,
    size,
    name,
    first_name,
    last_name,
    email
  } = req.query

  const pagingData = common.getLimitOffset({ limit: size, offset: page });
  let match = {}
  if (first_name) {
    match['first_name'] = { "$regex": first_name, "$options": i }
  }
  if (last_name) {
    match['last_name'] = { "$regex": last_name, "$options": i }
  }
  if (email) {
    match['email'] = { "$regex": email, "$options": i }
  }

  let aggregationOperations = paging.pagedAggregateQuery(
    pagingData.limit,
    pagingData.offset,
    [
      { $match: match },
      { $project: {email: 1, first_name: 1, last_name: 1, role: 1, created: 1, sex: 1, birth_day: 1, phone_number: 1}},
      { $sort: {created: -1}}
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
}

const createUser = async (req, res) => {
  const {email} = req.body
  let user = await userService.findByEmail(email)
  if (user) {
    throw new Error(`User with email ${email} has been used`)
  }
  try {
    await userService.createUser(req.body)
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

module.exports = {
  createUser,
  deleteUser,
  getUsers
}