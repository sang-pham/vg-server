const logger = require("../utils/logger");
const { Config } = require("../models");
const configs = require("../utils/configs");

const createConfigs = async () => {
  logger.info("Creating configs...");
  for (let i = 0; i < configs.length; i++) {
    let count = await Config.countDocuments({ key: configs[i].key });
    logger.info(`Count...${count}`);
    if (count < 1) {
      await Config.create(configs[i]);
    }
  }
};

const getConfig = async (id, withPopulate = true) => {
  let data = await Config.find({}).lean();
  await createConfigs();
  return data;
};

const getConfigByKey = async (key) => {
  let data = await Config.findOne({ key: key }).exec();
  return data;
};

const updateByKey = async (key, config) => {
  let data = await Config.updateOne({ key: key }, { ...config }).exec();
  return data;
};

module.exports = {
  getConfig: getConfig,
  getConfigByKey: getConfigByKey,
  updateByKey: updateByKey,
};
