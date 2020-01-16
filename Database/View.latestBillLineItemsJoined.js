[{$match: {
  'measurements.atlasResponse.lineItems.clusterName': {
    $exists: true
  }
}}, {$group: {
  _id: {
    clusterName: '$measurements.atlasResponse.lineItems.clusterName',
    projectId: '$measurements.atlasResponse.lineItems.groupId'
  },
  spend: {
    $sum: '$measurements.atlasResponse.lineItems.totalPriceCents'
  }
}}, {$lookup: {
  from: 'clusters',
  'let': {
    clusterName: '$_id.clusterName',
    projectId: '$_id.projectId'
  },
  pipeline: [
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: [
                '$name',
                '$$clusterName'
              ]
            },
            {
              $eq: [
                '$projectId',
                '$$projectId'
              ]
            }
          ]
        }
      }
    }
  ],
  as: 'joined'
}}]