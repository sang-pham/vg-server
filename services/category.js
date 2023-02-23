const { Category, ObjectId } = require("../models");

const findByName = async (categoryName) => {
  return await Category.findOne({
    category_name: categoryName,
  });
};

const findByCode = async (categoryCode) => {
  return await Category.findOne({
    category_code: categoryCode,
  });
};

const findOne = async (findObj) => {
  return Category.findOne(findObj)
}

const createCategory = async ({ category_name, category_code, parent_category_code }) => {
  let existedCategory = await findByName(category_name);
  let parentCategoryId = null;
  if (existedCategory) {
    throw new Error(`Tên danh mục '${category_name}' đã tồn tại`);
  }
  existedCategory = await findByCode(category_code);
  if (existedCategory) {
    throw new Error(`Mã danh mục: '${category_code}' đã tồn tại`);
  }
  if (parent_category_code) {
    let parentCategory = await findByCode(parent_category_code);
    if (parentCategory) {
      parentCategoryId = parentCategory._id;
    }
  }
  await Category.create({
    category_code,
    category_name,
    parent_category_id: parentCategoryId,
    parent_category_code: parent_category_code,
  });
};

const getCategories = async () => {};

const getChildrenIds = async (id) => {
  if (!ObjectId.isValid(id)) {
    return;
  }
  let arr = await Category.find({
    parent_category_id: id,
  }).select({ _id: 1 });
  return arr.map((item) => item._id);
};

const deleteCategoryById = async (categoryId) => {
  try {
    if (!ObjectId.isValid(categoryId)) {
      return;
    }
    const childrenIds = await getChildrenIds(categoryId);
    //delete root
    await Category.findOneAndDelete({
      _id: new ObjectId(categoryId),
    });
    while (childrenIds && childrenIds.length) {
      let tempArr = [...childrenIds];
      childrenIds.length = 0;
      for (const childId of tempArr) {
        childrenIds.push(...(await getChildrenIds(childId)));
      }
      await Category.deleteMany({
        _id: {
          $in: tempArr,
        },
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const aggregateFind = async (aggregationOperations) => Category.aggregate(aggregationOperations);

const parentCategoriesFind = async () => Category.find({ parent_category_id: null }).lean();

module.exports = {
  createCategory,
  getCategories,
  deleteCategoryById,
  aggregateFind,
  parentCategoriesFind,
  findOne
};
