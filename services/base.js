const { common, paging } = require("../utils");

function isOperator(str) {
  // add more here
  const operators = ["$ne="]; 
  // check if start with
  let isOp = false;
  operators.forEach((operator) => {
    if (str.startsWith(operator)) {   
      isOp = true;
    }
  });
  return isOp;
}

function getOperationFromKey(value) {
  if (typeof value === "string" && isOperator(value)) {
    let [op, argument] = value.split("=");
    if (argument === "null") {
      argument = null;
    }
    let result = {}
    result[op] = argument;
    console.log(`result`,result)
    return result
  }
  return value;
}

const baseFind = async (requestQuery, projectFields, aggregateFunc) => {
  let { page, size } = requestQuery;
  const pagingData = common.getLimitOffset({ limit: size, offset: page });
  const { match, sort } = common.genericSearchQuery(requestQuery);
  let newMatch = {};
  console.log(match, sort);
  Object.keys(match).forEach((key) => {
    newMatch[key] = getOperationFromKey(match[key]);
  });
  let aggregationOperations = paging.pagedAggregateQuery(pagingData.limit, pagingData.offset, [
    { $match: newMatch },
    { $project: projectFields },
    { $sort: Object.keys(sort).length ? sort : { created: -1 } },
  ]);
  let aggregationResult = await aggregateFunc(aggregationOperations);
  if (!aggregationResult.length) {
    return {
      meta: {
        total: 0,
      },
      data: [],
    };
  }
  aggregationResult = aggregationResult[0] || { data: [], total: 0 };
  return {
    data: aggregationResult.data,
    meta: {
      total: aggregationResult.total,
    },
  };
};

module.exports = {
  baseFind,
};
