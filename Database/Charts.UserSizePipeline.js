// db.clusters.aggregate()
[{$project: {
    sizeName:"$size",
    owner:{$arrayElemAt:[{$split:["$owner.email", "."]},0]},
    magnitude:{$multiply:["$numShards","$replicationFactor"]},
    cloud:1
  }}]