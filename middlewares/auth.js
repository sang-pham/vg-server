const jwt = require('jsonwebtoken')
require('dotenv').config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const authMiddleware = () => {
  return async (req, res, next) => {
    let headers = req.headers;
    let params = req.query;
    if (!(headers.authorization || params?.token)) {
      return res.status(400).json({
        message: 'Token is required'
      })
    }
    let token = headers.authorization ? headers.authorization.replace('Bearer ', '') : params?.token
    jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
      (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Fail to authentication"
          })
        }
        req.user = result
        next()
      }
    )
  }
}

module.exports = authMiddleware