exports = async function(){
  // get variables
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clustersNoLongerInLog");
  var log = context.services.get("mongodb-atlas").db("atlasmonitor").collection("changelog");
  
  var docs = await conn.find().toArray();
    
  for(var i = 0; i < docs.length; i++) {
    var n = new Date();
    log.insertOne({clustersId:docs[i]._id,eventType:"deleteClusterFromList",fromAutomation:true,updated:n});
    conn.deleteOne({_id:docs[i]._id});
  }

  
};