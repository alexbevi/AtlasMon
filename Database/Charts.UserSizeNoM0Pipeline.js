// db.clusters.aggregate()
[{$match: {
  size:{$ne:"M0"}
}}, {$project: {
  sizeName:"$size",
  owner:{$substr:["$owner.email",0,15]},
  magnitude:{$multiply:["$numShards","$replicationFactor"]},
  cloud:1
}}]