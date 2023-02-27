const { productService, categoryService, baseService } = require('../services')
const { logger } = require('../utils')

const getProducts = async (req, res) => {
  try {
    return await baseService.baseFind(
      req.query,
      {service_category_code: 1, service_category_name: 1, created: 1, product_info: 1, updated: 1},
      productService.aggregateFind
    )
  } catch (error) {
    logger.error(error)
  }
}

const createProduct = async (req, res) => {
  try {
    const { service_category_code, service_category_name } = req.body
    let category = await categoryService.findOne({
      category_code: service_category_code,
      category_name: service_category_name
    })
    if (!category) {
      return {
        success: false,
        message: `Category ${service_category_name} can't be found.`
      }
    }
    await productService.createProduct(req.body)
    return {
      success: true,
      message: "Create product successfully"
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || "Something is wrong"
    }
  }
}

const updateProduct = async (req, res) => {
  try {
    const {id} = req.params
    const product = await productService.findBydId(id)
    if (!product) {
      return {
        success: false,
        message: `Product can't be found.`
      }
    }
    for (const key in req.body) {
      product[key] = req.body[key]
    }
    await product.save()
    return {
      success: true,
      message: 'Update product successfully'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || "Something is wrong"
    }
  }
}

const deleteProductById = async (req, res) => {
  try {
    let { id } = req.params
    await productService.deleteById(id)
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || "Something is wrong"
    }
  }
}

module.exports = {
  createProduct,
  deleteProductById,
  getProducts,
  updateProduct
}