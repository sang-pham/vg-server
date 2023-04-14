const { HorsePlace } = require("../models"); 

const getAll = async () => {
  let data = await HorsePlace.find({ is_deleted:0 }).lean();
  return data;
};

const create = async (model) => {
  let data = await HorsePlace.create(model);
  return data;
};

const update = async (_id, model) => {
  let data = await HorsePlace.findByIdAndUpdate(_id, { ...model });
  return data;
};

const deleteOne = async (_id) => {
  let data = await HorsePlace.findByIdAndUpdate(_id, { is_deleted: 1 });
  return data;
};

module.exports = {
  getAll: getAll,
  create: create,
  update: update,
  delete: deleteOne,
};
