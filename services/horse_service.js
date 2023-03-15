const { HorseService } = require('../models')

const createNewService = async (data) => {
  try {
    const horseService = new HorseService(data)
    await horseService.save()
    return horseService
  } catch (error) {
    
  }
}

const aggregateFind = async (aggregationOperations) => HorseService.aggregate(aggregationOperations)

const findById = async (id) => HorseService.findById(id)

const deleteById = async (productId) => {
  await HorseService.findByIdAndDelete(productId)
}

module.exports = {
  createNewService,
  aggregateFind,
  findById,
  deleteById
}