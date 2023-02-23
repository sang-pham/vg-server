const { Product } = require('../models')

const createProduct = async (productData) => {
  const product = new Product(productData)
  await product.save()
}

const deleteById = async (productId) => {
  await Product.findByIdAndDelete(productId)
}

const aggregateFind = async (aggregationOperations) => Product.aggregate(aggregationOperations)

module.exports = {
  createProduct,
  deleteById,
  aggregateFind
}