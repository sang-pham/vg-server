const { userService } = require('../services')

const updateInfo = async (req, res) => {
  const {email} = req.body
  let user = await userService.findByEmail(email)
  if (!user) {
    throw new Error('You need to register your email with Google firstly.')
  }
  if (user.verified) {
    throw new Error(`Email ${email} has been registed. Please try another.`)
  }
  user = await userService.upsertUserInfo(email, {
    ...req.body,
    verified: true
  })
  return {
    message: 'Update info successfully'
  }
}

module.exports = {
  updateInfo
}