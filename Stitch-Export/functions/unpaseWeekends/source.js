exports = async function(){
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
  
  var docs = await conn.find({pauseWeekends:true}).toArray();
    
  for(var i = 0; i < docs.length; i++) {
    context.functions.execute("unpauseCluster", docs[i].projectId, docs[i].name);
  }
};