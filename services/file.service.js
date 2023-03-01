const { File } = require("../models");
var FormData = require("form-data");

const axios = require("axios");

const fs = require("fs");

const logger = require("../utils/logger");

const uploadFile = async (file) => {
  try {
    logger.info(`FIle: ${file}`);
    const filePath = file.path;
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
        logger.error(`File service_uploadFile(): ${error}`);
      });
    return result;
  } catch (error) {
    logger.error(`File service_uploadFile(): ${error}`);
  }
};

const uploadMultiFiles = async (files) => {
  if (!files) return
  let uploadedFileLength = files.length
  const urlLists = []
  for (const file of files) {
    try {
      logger.info(`FIle: ${file.path}`);
      const filePath = file.path;
      const fileStream = fs.createReadStream(filePath);
      let formData = new FormData();
      formData.append(`file`, fileStream);
      formData.append(`folder`, "vietgangz");
      formData.append(`upload_preset`, `zpjy6ase`);
      let response = await axios.post(`https://api.cloudinary.com/v1_1/linkdoan/upload`, formData)
      let newFile = await File.create(response.data)
      await new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            logger.error(`Error when unlink: ${filePath}`);
            reject(err)
            return
          }
          console.log(`Success unlink ${filePath}`)
          resolve(true)
        })
      })
      uploadedFileLength--
      urlLists.push(newFile.secure_url)
    } catch (error) {
      logger.error(`File service_uploadFile(): ${error}`);
      break
    }
  }
  if (!uploadedFileLength) {
    return {
      message: 'success',
      data: urlLists
    }
  }
}

module.exports = {
  uploadFile,
  uploadMultiFiles
};
