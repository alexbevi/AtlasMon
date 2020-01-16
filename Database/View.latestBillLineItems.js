[{$sort: {
    lastQueryTime: -1
  }}, {$limit: 1}, {$project: {
    measurements: {
      $slice: [
        '$measurements',
        -1
      ]
    }
  }}, {$unwind: {
    path: '$measurements'
  }}, {$unwind: {
    path: '$measurements.atlasResponse.lineItems'
  }}]