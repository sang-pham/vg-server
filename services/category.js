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
    let parentCategory = await findByName(parent_category_name)
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

const getChildrenIds = async (id) => {
  if (!ObjectId.isValid(id)) {
    return
  }
  let arr = await Category.find({
    parent_category_id: id
  }).select({_id: 1})
  return arr.map(item => item._id)
} 

const deleteCategoryById = async (categoryId) => {
  try {
    if (!ObjectId.isValid(categoryId)) {
      return
    }
    const childrenIds = await getChildrenIds(categoryId)
    //delete root
    await Category.findOneAndDelete({
      _id: new ObjectId(categoryId)
    })
    while (childrenIds && childrenIds.length) {
      let tempArr = [...childrenIds]
      childrenIds.length = 0
      for (const childId of tempArr) {
        childrenIds.push(...await getChildrenIds(childId))
      }
      await Category.deleteMany({
        _id: {
          $in: tempArr
        }
      })
    }
    return true
  } catch (error) {
    console.log(error)
    return null
  }
}

const aggregateFind = async (aggregationOperations) => Category.aggregate(aggregationOperations)

module.exports = {
  createCategory,
  getCategories,
  deleteCategoryById,
  aggregateFind
}