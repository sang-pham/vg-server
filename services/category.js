const { Category, ObjectId } = require('../models')

const findByName = async (categoryName) => {
  return await Category.findOne({
    category_name: categoryName
  })
}

const createCategory = async ({category_name, category_type, parent_category_name}) => {
  let existedCategory = await findByName(category_name)
  let parentCategoryId = null
  if (existedCategory) {
    throw new Error(`Category with name '${category_name}' has existed`)
  }
  if (parent_category_name) {
    console.log(parent_category_name)
    let parentCategory = await findByName(parent_category_name)
    console.log(parentCategory)
    if (!parentCategory) {
      throw new Error(`Parent category with name '${parent_category_name}' doesn't exist`)
    } else {
      parentCategoryId = parentCategory._id
    }
  }
  await Category.create({
    category_type,
    category_name,
    parent_category_id: parentCategoryId
  })
}

const getCategories = async () => {

}

const deleteChildCategories = async (categoryId) => {
  try {
    if (!ObjectId.isValid(categoryId)) {
      return
    }
    await Category.deleteMany({
      _id: new ObjectId(categoryId)
    })
    return true
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  createCategory,
  getCategories,
  deleteChildCategories
}