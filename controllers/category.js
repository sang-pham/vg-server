const { categoryService } = require('../services')

const createCategory = async (req, res) => {
  try {
    await categoryService.createCategory(req.body)
    return {
      success: true,
      message: 'Create new category successfully'
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something is wrong'
    }
  }
}

const getCategories = async (req, res) => {

}

module.exports = {
  createCategory,
  getCategories
}