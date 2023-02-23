const { File } = require("../models");
var FormData = require("form-data");

const axios = require("axios");

const fs = require("fs");

const logger = require("../utils/logger");

const uploadFile = async (file) => {
  try {
    const filePath = "/home/linkdv/uploads/" + file.path;
    const fileStream = fs.createReadStream(filePath);
    let formData = new FormData();
    formData.append(`file`, fileStream);
    formData.append(`folder`, "vietgangz");
    formData.append(`upload_preset`, `zpjy6ase`);
    let result = await axios
      .post(`https://api.cloudinary.com/v1_1/linkdoan/upload`, formData)
      .then(async (response) => {
        let newFile = await File.create(response.data);
        fs.unlink(filePath, (err) => {
          if (err) {
            logger.error(`Error when unlink: ${filePath}`);
            return;
          }

          //file removed
        });
        return newFile._doc;
      })
      .catch((error) => {
        logger.error(error);
      });
    return result;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  uploadFile,
};
