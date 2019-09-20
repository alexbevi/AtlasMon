// db.clusters.aggregate()
[{$project: {
    sizeName:"$size",
    owner:{$substr:["$owner.email",0,10]},
    magnitude:{$multiply:["$numShards","$replicationFactor"]}
  }}]