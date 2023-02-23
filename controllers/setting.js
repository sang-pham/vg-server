const { settingService, baseService } = require("../services");
const formidable = require("formidable");
const fs = require("fs");
const { logger } = require("../utils");

const getSettings = async (req, res) => {
  try {
    return await baseService.baseFind(
      req.query,
      { key: 1, path: 1, file_type: 1, description: 1, created: -1, updated: -1, value: 1 },
      settingService.aggregateFind,
    );
  } catch (error) {
    logger.error(error);
  }
};

const upsertSetting = async (req, res) => {
  const form = formidable({ multiples: true });

  try {
    const result = await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) reject(err);
        let { key, description } = fields;
        if (!key) {
          reject(new Error("Key must be specified"));
          return;
        }
        if (!files.file) {
          reject(new Error("Please choose a file"));
          return;
        }
        let oldSetting = await settingService.findByKey(key);
        if (oldSetting) {
          let isExisted = fs.existsSync(oldSetting.path);
          if (isExisted) {
            fs.unlinkSync(oldSetting.path);
          }
        }
        let fileType =
          files.file.originalFilename.split(".")[files.file.originalFilename.split(".").length - 1];
        const filePath = `settings/${key}.${fileType}`;
        let writeStream = fs.createWriteStream("./public/" + filePath);
        fs.createReadStream(files.file.filepath)
          .pipe(writeStream)
          .on("finish", async () => {
            await settingService.upsertSetting({
              key,
              path: filePath,
              fileType,
              description,
            });
            resolve(true);
          })
          .on("error", () => {
            reject("Something is wrong");
          });
      });
    });
    if (result) {
      return {
        success: true,
        message: "Update setting successfully",
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

const deleteByKey = async (req, res) => {
  try {
    let { key } = req.params;
    if (!key) {
      return {
        success: false,
        message: "Key param must be specified",
      };
    }
    settingService.deleteByKey(key);
    return {
      success: true,
      message: `Delete setting ${key} successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something is wrong",
    };
  }
};

const updateByKey = async (req, res) => {
  try {
    let { key } = req.params;
    let form = req.body;
    if (!key) {
      return {
        success: false,
        message: "updateByKey param must be specified",
      };
    }
    settingService.updateByKey(key, form);
    return {
      success: true,
      message: `updateByKey setting ${key} successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something is wrong",
    };
  }
};

module.exports = {
  upsertSetting,
  deleteByKey,
  getSettings,
  updateByKey,
};
