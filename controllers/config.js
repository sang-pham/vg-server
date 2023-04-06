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

module.exports = {
    getConfig:getConfig
}