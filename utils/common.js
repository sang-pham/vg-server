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

module.exports = {
  getLimitOffset
}