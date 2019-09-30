[{$project: { projectName:"$project",
    clusterName:"$name",
    combinedName:{$concat:["$project","/","$name"]}}}, {$lookup: {
  from: 'latestClusterLogEntries',
  localField: 'combinedName',
  foreignField: 'combinedName',
  as: 'joinResult'
}}, {$match: {
  joinResult:{$size:0}
}}]