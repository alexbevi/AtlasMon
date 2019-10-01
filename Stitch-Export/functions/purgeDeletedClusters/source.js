exports = async function(){
  // get variables
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clustersNoLongerInLog");
  var log = context.services.get("mongodb-atlas").db("atlasmonitor").collection("changelog");
  var clus = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
  
  var docs = await conn.find().toArray();
    
  for(var i = 0; i < docs.length; i++) {
    var n = new Date();
    log.insertOne({clustersId:docs[i]._id,eventType:"deleteClusterFromList",fromAutomation:true,updated:n});
    clus.deleteOne({_id:docs[i]._id});
  }

  
};