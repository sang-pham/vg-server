const { ObjectId } = require('../models')

const validateObjectId = (id, desc) => {
  if (!ObjectId.isValid(id)) throw new Error(`Giá trị id của ${desc} không hợp lệ`)
  return id
}

module.exports = {
  validateObjectId
}