const { horsePlaceService } = require("../services");

const getAll = async (req, res) => {
  try {
    let data = await horsePlaceService.getAll() 
    return {
      data: data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

const create = async (req, res) => {
  try {
    let model = req.body;
    let data = await horsePlaceService.create(model);
    return {
      data: data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

const update = async (req, res) => {
  try {
    let _id = req.params.id;
    let model = req.body;
    let data = await horsePlaceService.update(_id, model);
    return {
      data: data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

const deleteOne = async (req, res) => {
  try {
    let _id = req.params.id;
    let data = await horsePlaceService.delete(_id);
    return {
      data: data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

module.exports = {
  getAll: getAll,
  create: create,
  update: update,
  delete: deleteOne,
};
