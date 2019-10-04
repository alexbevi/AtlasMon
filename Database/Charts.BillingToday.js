[{$sort: {
  queryTime: -1
}}, {$limit: 1}, {$unwind: {
  path: '$atlasResponse.lineItems'
}}, {$group: {
  _id: '$_id',
  spendCents: {
    $sum: '$atlasResponse.lineItems.totalPriceCents'
  }
}}, {$project: {
  spend: {
    $multiply: [
      0.01,
      '$spendCents'
    ]
  }
}}]