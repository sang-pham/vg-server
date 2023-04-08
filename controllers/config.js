const configService = require("../services/config.service");

const getConfig = async (req, res) => {
  try {
    let data = await configService.getConfig();
    return {
        success:true, data:data
    }
  } catch (error) {
    logger.error(error);
  }
};

const getConfigDetail = async (req, res) => {
  const key = req.params?.key 
  try {
    let data = await configService.getConfigByKey(key);
    return {
        success:true, data:data
    }
  } catch (error) {
    logger.error(error);
  }
};

const updateByKey = async (req, res) => {
  const key = req.params?.key 
  const body = req.body
  try {
    let data = await configService.updateByKey(key, body);
    return {
        success:true, data:data
    }
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
    getConfig:getConfig,
    getConfigDetail:getConfigDetail,
    updateByKey:updateByKey
}