exports = function(changeEvent) {
  var doc = changeEvent.fullDocument;
  var shouldNotReap = (doc.hasOwnProperty("noReap") || false);
  var alreadyReaped = (doc.hasOwnProperty("reaped") || false);
  
  //if doc.warnings > 1) {
    // send a notification
    // context.functions.execute("sendText", doc.owner.id, "Your cluster " + doc.name + " will be reaped soon.");
  //}
  
  if(doc.warnings > 2) {
    if(!alreadyReaped && !shouldNotReap){
      var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
      var n = new Date();
      context.functions.execute("pauseCluster", doc.projectId, doc.name);
      context.functions.execute("sendText", doc.owner.id, "Your cluster " + doc.name + " has been reaped (auto paused).");
      conn.updateOne({_id:doc._id}, {$set:{reaped:true, updated:n}});
      if(doc.name.toLowerCase().indexOf("poc") !== -1) {
        const validAdmins = context.values.get("validAdmins");
        for(var i = 0; i < validAdmins.length; i++) {
          context.functions.execute("sendText", validAdmins[i], "A cluster with the name 'POC' has been reaped: " + doc.name + " (auto paused).");
        }
      }
    }
  }
  
};
