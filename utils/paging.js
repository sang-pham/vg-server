const pagedAggregateQuery = (limit, offset, aggreagationOperations) => {
  const facetOperation = {
    "$facet": {
      "meta": [
        {"$count": "total"}
      ],
      "data": [
        { "$skip": offset },
        { "$limit":  limit}
      ]
    }
  }

  const condOperation = {
    "$cond": [
      {
        "$gt": [
          { "$size": "$meta.total" },
          0
        ]
      },
      { "$arrayElemAt": [
        "$meta.total",
        0
      ] },
      0
    ]
  }

  const projectOperation = {
    "$project": {
      "data": 1,
      "total": condOperation
    }
  }

  return [
    ...aggreagationOperations,
    facetOperation,
    projectOperation
  ]

}

module.exports = {
  pagedAggregateQuery
}