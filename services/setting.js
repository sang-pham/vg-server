const { Setting } = require('../models')
const fs = require('fs')

const logger = require('../utils/logger')

const findByKey = async (key) => {
  return Setting.findOne({
    key: key
  })
}

const upsertSetting = async ({key, path, fileType, description}) => {
  try {
    let setting = await findByKey(key)
    if (!setting) {
      setting = new Setting()
    }
    setting.key = key
    setting.path = path
    setting.file_type = fileType
    setting.description = description
    return await setting.save()
  } catch (error) {
    console.log(error)
    return null
  }
}

const deleteByKey = async (key) => {
  let setting = await findByKey(key)
  if (!setting) {
    throw new Error(`Setting ${key} doesn't exist`)
  }
  let path = './public/' + setting.path
  await setting.remove()
  let isExisted = fs.existsSync(path)
  if (isExisted) {
    fs.unlinkSync(path)
  }
  return true
}

const updateByKey = async (key, form) => {
  let setting = await findByKey(key) 
  if (!setting) {
    logger.error(`Setting with key ${key} not found`)
    throw new Error(`Setting ${key} doesn't exist`)
  }
  setting.value = form.value;
  setting.file_type = form.file_type;
  setting.updated = new Date(); 
  await setting.save() 
  return true
}

const aggregateFind = async (aggregationOperations) => Setting.aggregate(aggregationOperations)

module.exports = {
  findByKey,
  upsertSetting,
  deleteByKey,
  aggregateFind,
  updateByKey
}