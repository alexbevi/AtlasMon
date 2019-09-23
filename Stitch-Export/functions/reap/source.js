exports = function(changeEvent) {
  var doc = changeEvent.fullDocument;
  
  //if doc.warnings > 1) {
    // send a notification
  //}
  
  if(doc.warnings > 2) {
    if(!doc.hasOwnProperty("reaped")){
      var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
      var n = new Date();
      //context.functions.execute("pauseCluster", doc.projectId, doc.name);
      //context.functions.execute("sendText", doc.owner.id, "Your cluster " + doc.name + " has been reaped (auto paused).");
      //conn.updateOne({_id:doc._id}, {$set:{reaped:true, updated:n}});
    }
  }
  
};
