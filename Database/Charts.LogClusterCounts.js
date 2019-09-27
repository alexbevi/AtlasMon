[{$unwind: {
  path: "$projects"
}}, {$project: {
  totalCount:"$projects.clustersResponse.totalCount",
  queryTime:1,
  paused:{
    $filter: {
      input: "$projects.clustersResponse.results",
      as:"c",
      cond:{ $eq:["$$c.paused",true]}
    }
  }
}}, {$project: {
  queryTime: 1,
  totalCount:1,
  pausedCount: {$size:"$paused"}
}}, {$group: {
  _id:"$queryTime",
  totalCount:{$sum:"$totalCount"},
  pausedCount:{$sum:"$pausedCount"}
}}, {$group: {
  _id: {
    $dateToString: {
      date: '$_id',
      format: '%Y-%m-%d'
    }
  },
  avgClusCount: {
    $avg: '$totalCount'
  },
  pausedCout: {
    $avg: "$pausedCount"
  }
}}]