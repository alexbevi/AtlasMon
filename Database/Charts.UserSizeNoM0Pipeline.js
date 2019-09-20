// db.clusters.aggregate()
[{$match: {
  size:{$ne:"M0"}
}}, {$project: {
  sizeName:"$size",
  owner:{$arrayElemAt:[{$split:["$owner.email", "."]},0]},
  magnitude:{$multiply:["$numShards","$replicationFactor"]},
  cloud:1
}}]