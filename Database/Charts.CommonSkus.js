[{$sort: {
  lastQueryTime:-1
}}, {$limit: 30}, {$project: {
  measurements: {
    $slice: [
      '$measurements',
      -1
    ]
  }
}}, {$project: {
  "measurements.atlasResponse.lineItems.sku":1,
  "measurements.atlasResponse.lineItems.totalPriceCents":1
  }}, {$unwind: {
  path: "$measurements"
}}, {$unwind: {
  path: "$measurements.atlasResponse.lineItems"
}}, {$group: {
  _id: "$measurements.atlasResponse.lineItems.sku",
  amt: {
    $sum:{$multiply:["$measurements.atlasResponse.lineItems.totalPriceCents",0.01]}
  }
}}]