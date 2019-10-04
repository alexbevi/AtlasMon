[{$project: {
  measurements:{$slice:["$measurements",-1]}
}}, {$unwind: {
  path: "$measurements"
}}, {$unwind: {
  path: "$measurements.atlasResponse.lineItems"
}}, {$group: {
  _id: {
    $dateToString: {
      date: '$measurements.queryTime',
      format: '%Y-%m-%d'
    }
  },
  spendCents: {
    $sum: '$measurements.atlasResponse.lineItems.totalPriceCents'
  }
}}, {$project: {
  spend: {
    $multiply: [
      0.01,
      '$spendCents'
    ]
  }
}}]