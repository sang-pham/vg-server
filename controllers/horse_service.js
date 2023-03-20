const { bookingService, horseService, baseService, horseClubSetService } = require('../services')
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
    if (!price_detail) {
      throw new Error('Loại dịch vụ không hợp lệ')
    }
    let sets = await horseClubSetService.findByServiceType(service_type)
    sets = sets.map(item => item._id)
    await horseService.createNewService({
      ...req.body,
      sets,
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

const updateService = async (req, res) => {
  try {
    const {id} = req.params
    const service = await horseService.findById(id)
    if (!service) {
      return {
        success: false,
        message: `Service can't be found.`
      }
    }
    for (const key in req.body) {
      service[key] = req.body[key]
    }
    await service.save()
    return {
      success: true,
      message: 'Update service successfully'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || "Something is wrong"
    }
  }
}

const deleteService = async (req, res) => {
  try {
    const {id} = req.params
    const service = await horseService.findById(id)
    if (!service) {
      return {
        success: false,
        message: `Service can't be found.`
      }
    }
    await service.remove()
    return {
      success: true,
      message: 'Remove service successfully'
    }
  } catch (error) {
    logger.error(error)
    return {
      success: false,
      message: error.message || "Something is wrong"
    }
  }
}

module.exports = {
  createNewService,
  getHorseServices,
  updateService,
  deleteService
}