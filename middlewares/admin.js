const adminMiddleware = () => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(400).json({
        message: 'You must login firstly'
      })
    }
    if (req.user.role != 'super_admin' && req.user.role != 'admin') {
      return res.status(400).json({
        message: 'Invalid role'
      })
    }
    next()
  }
}

module.exports = adminMiddleware