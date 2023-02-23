const epxress = require('express')
const router = new epxress.Router()
const {ApiResponse} = require('../libs')
const { categoryController } = require('../controllers')
const { superAdminMiddleware, authMiddleware } = require('../middlewares')
const { categoryValidator } = require('../validators')

const {asyncHandle} = ApiResponse

router.use(authMiddleware(), superAdminMiddleware())

router.get('/parent',
  asyncHandle(categoryController.getParent))

router.post('',
  categoryValidator.validateCreateCategory,
  asyncHandle(categoryController.createCategory)
)

router.get('',
  asyncHandle(categoryController.getCategories))

router.delete('/:id',
  categoryValidator.validateDeleteCategory,
  asyncHandle(categoryController.deleteCategory))

module.exports = router