const { fileService } = require("../services");

const logger = require("../utils/logger");

const uploadFile = async (req, res) => {
  try {
    logger.info(`File Controller upload file start`);
    return fileService.uploadFile(req.file);
  } catch (error) {
    logger.error(`File Controller upload file error ${error}`);
  }
};

module.exports = {
  uploadFile,
};
