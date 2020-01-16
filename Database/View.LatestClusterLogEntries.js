[{$sort: {
  queryTime: -1
}}, {$limit: 1}, {$unwind: {
  path: '$projects'
}}, {$project: {
  projectName: '$projects.name',
  'projects.clustersResponse.results.name': 1,
  'projects.clustersResponse.results.paused': 1
}}, {$project: {
  projectName: 1,
  clusters: '$projects.clustersResponse.results'
}}, {$unwind: {
  path: '$clusters'
}}, {$project: {
  _id: 0,
  projectName: 1,
  cluster: '$clusters.name',
  paused: '$clusters.paused',
  combinedName: {
    $concat: [
      '$projectName',
      '/',
      '$clusters.name'
    ]
  },
  wordMap: {
    $split: [
      '$clusters.name',
      '-'
    ]
  }
}}]