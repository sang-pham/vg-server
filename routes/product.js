const { Router } = require('express')
const router = new Router()
const {ApiResponse} = require('../libs')
const { adminMiddleware, authMiddleware } = require('../middlewares')
const { productController } = require('../controllers')
const { productValidator } = require('../validators')
const {asyncHandle} = ApiResponse

router.use(authMiddleware())

router.get('',
  asyncHandle(productController.getProducts))

router.post('',
  adminMiddleware(),
  productValidator.validateCreateProduct,
  asyncHandle(productController.createProduct))

router.delete('/:id',
  adminMiddleware(),
  asyncHandle(productController.deleteProductById))

module.exports = router