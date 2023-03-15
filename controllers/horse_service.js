const { bookingService, horseService, baseService } = require('../services')
const { logger, constant } = require('../utils')

const updateMap = (myMap, values) => {
  for (const key in myMap) {
    if (typeof(myMap[key]) == 'object') {
      updateMap(myMap[key], values[key] || null)
    } else {
      for (const key in myMap) {
        myMap[key] = values ? values[key] : null
      }
    }
  }
}

const createNewService = async (req, res) => {
  try {
    const { service_type } = req.body
    const price_detail = constant.HORSE_SERVICE_PRICE_MAP[service_type]

    await horseService.createNewService({
      ...req.body,
      price_detail
    })
    return {
      success: true,
      message: "Tạo mới dịch vụ thành công"
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || 'Something was wrong'
    }
  }
}

const getHorseServices = async (req, res) => {
  try {
    return await baseService.baseFind(
      req.query,
      {booking_id: 1, booking_info: 1, service_info: 1, service_type: 1, price_detail: 1, created: 1, updated: 1},
      horseService.aggregateFind
    )
  } catch (error) {
    logger.error(error)
  }
}

module.exports = {
  createNewService,
  getHorseServices
}