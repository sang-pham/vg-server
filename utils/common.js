const constant = require('./constant')

const getLimitOffset = (
  query,
  limitDefault = constant.API_PAGE_LIMIT_DEFAULT,
  offsetDefault = constant.API_PAGE_OFFSET_DEFAULT,
) => {
  let { offset, limit } = query;
  if (limit) {
    limit = parseInt(limit);
  } else {
    limit = limitDefault;
  }
  if (offset) {
    offset = (parseInt(offset) - 1) * limit;
  } else {
    offset = offsetDefault;
  }
  return { offset, limit };
};

const genericSearchQuery = (requestQuery = {}) => {
  let sort = requestQuery.sort
  let page = requestQuery.page
  let size = requestQuery.size
  delete requestQuery.sort
  delete requestQuery.page
  delete requestQuery.size
  let queryFields = {...requestQuery}
  let matchObj = {}, sortObj = {}
  
  for (const key in queryFields) {
    matchObj[key] = queryFields[key]
  }
  if (sort) {
    let tempArr = sort.split(',')
    console.log(tempArr)
    for (const item of tempArr) {
      if (item.toString().startsWith('-')) {
        sortObj[
          item.toString().replace('-', '')
        ] = -1
      } else {
        sortObj[
          item.toString()
        ] = 1
      }
    }
  }

  return {
    match: matchObj,
    sort: sortObj,
    page,
    size
  }
}

module.exports = {
  getLimitOffset,
  genericSearchQuery
}