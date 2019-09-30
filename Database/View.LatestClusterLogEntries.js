[{$sort: {
    queryTime: -1
  }}, {$limit: 1}, {$unwind: {
    path: '$projects'
  }}, {$project: {
    projectName: '$projects.name',
    clusters: '$projects.clustersResponse.results.name'
  }}, {$unwind: {
    path: '$clusters'
  }}, {$project: {
    _id:0,
    projectName:1,
    cluster:"$clusters",
    combinedName:{$concat:["$projectName","/","$clusters"]}
  }}]