const { common, paging } = require('../utils')

const baseFind = async (requestQuery, projectFields, aggregateFunc) => {
  let {
    page,
    size
  } = requestQuery
  const pagingData = common.getLimitOffset({ limit: size, offset: page });
  const {match, sort} = common.genericSearchQuery(requestQuery)
  console.log(match, sort)
  let aggregationOperations = paging.pagedAggregateQuery(
    pagingData.limit,
    pagingData.offset,
    [
      { $match: match },
      { $project: projectFields},
      { $sort: Object.keys(sort).length ? sort: {created: -1}}
    ]
  )
  let aggregationResult = await aggregateFunc(aggregationOperations)
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
}

module.exports = {
  baseFind
}