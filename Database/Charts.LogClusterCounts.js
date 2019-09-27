[{$project: {
    queryTime:1,
    clusCount:{$sum:"$projects.clustersResponse.totalCount"}
  }}, {$group: {
    _id:{
      $dateToString:{
        date:"$queryTime",
        format:"%Y-%m-%d"
      }
    },
    avgClusCount:{$avg:"$clusCount"}
  }}, {$sort: {
    _id: 1
  }}]