const { User } = require("../models");

const getAll = async () => {
  let data = await User.find({ role: "user" }).lean();
  return data;
};

module.exports = {
  getAll: getAll,
};
