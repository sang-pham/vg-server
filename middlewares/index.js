const authMiddleware = require('./auth')
const adminMiddleware = require('./admin')
const superAdminMiddleware = require('./super_admin')

module.exports = {
  authMiddleware,
  adminMiddleware,
  superAdminMiddleware
}