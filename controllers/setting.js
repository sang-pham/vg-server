const {settingService} = require('../services')
const formidable = require('formidable')
const fs = require('fs')

const getSettings = async (req, res) => {
  let {
    page,
    size
  } = req.query

  try {
    const pagingData = common.getLimitOffset({ limit: size, offset: page });
    const {match, sort} = common.genericSearchQuery(req.query)
    console.log(match, sort)
    let aggregationOperations = paging.pagedAggregateQuery(
      pagingData.limit,
      pagingData.offset,
      [
        { $match: match },
        { $project: {key: 1, path: 1, file_type: 1, description: 1}},
        { $sort: Object.keys(sort).length ? sort: {created: -1}}
      ]
    )
    
    let aggregationResult = await userService.aggregateFind(aggregationOperations)
    if (!aggregationResult.length) {
      return {
        meta: {
          total: 0
        },
        data: []
      }
    }
    aggregationResult = aggregationResult[0] || { data: [], total: 0 }
    return {
      data: aggregationResult.data,
      meta: {
        total: aggregationResult.total
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const upsertSetting = async (req, res) => {
  const form = formidable({ multiples: true });

  try {
    const result = await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) reject(err)
        let {key, description} =fields
        if (!key) {
          reject(new Error('Key must be specified'))
          return
        }
        if (!files.file) {
          reject(new Error('Please choose a file'))
          return

        }
        let oldSetting = await settingService.findByKey(key)
        if (oldSetting) {
          let isExisted = fs.existsSync(oldSetting.path)
          if (isExisted) {
            fs.unlinkSync(oldSetting.path)
          }
        }
        let fileType = files.file.originalFilename.split('.')[files.file.originalFilename.split('.').length - 1]
        const filePath = `./public/settings/${key}.${fileType}`
        let writeStream = fs.createWriteStream(filePath)
        fs.createReadStream(files.file.filepath)
          .pipe(writeStream)
          .on('finish', async () => {
            await settingService.upsertSetting({
              key,
              path: filePath,
              fileType,
              description
            })
            resolve(true)
          })
          .on('error', () => {
            reject('Something is wrong')
          })
      })
    })
    if (result) {
      return {
        success: true,
        message: 'Update setting successfully'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: error.message || 'Something is wrong'
    }
  }
}

const deleteByKey = async (req, res) => {
  try {
    let {key} = req.params
    if (!key) {
      return {
        success: false,
        message: 'Key param must be specified'
      }
    }
    settingService.deleteByKey(key)
    return {
      success: true,
      message: `Delete setting ${key} successfully`
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Something is wrong'
    }
  }
}

module.exports = {
  upsertSetting,
  deleteByKey,
  getSettings
}