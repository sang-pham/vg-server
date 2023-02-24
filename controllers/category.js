const { categoryService, baseService } = require("../services");
const { logger } = require("../utils");

const createCategory = async (req, res) => {
  try {
    await categoryService.createCategory(req.body);
    return {
      success: true,
      message: "Create new category successfully",
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      message: error.message || "Something is wrong",
    };
  }
};

const getParent = async (req, res) => {
  try {
    let data = await categoryService.parentCategoriesFind();
    return {
      data: data,
    };
  } catch (error) {
    logger.error(error);
  }
};

const getCategories = async (req, res) => {
  try {
    return await baseService.baseFind(
      req.query,
      { category_code: 1, category_name: 1, created: 1, parent_category_id: 1, parent_category_code: 1, updated: 1 },
      categoryService.aggregateFind,
    );
  } catch (error) {
    logger.error(error);
  }
};

const getTreeView = async (req, res)=>{
  try{ 
    let { parent_category_code, category_code } = req.query;
    let data =  await categoryService.findCategoryByCode(parent_category_code, category_code);
    return {data:data}
  }catch(error){ 
    logger.error(error);
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    let res = await categoryService.deleteCategoryById(id);
    if (res) {
      return {
        success: true,
        message: "Delete category successfully",
      };
    }
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      message: error.message || "Something is wrong",
    };
  }
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  getParent,
  getTreeView
};
