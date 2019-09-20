exports = function() {
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
  var n = new Date();
  conn.updateMany({noReap:false},{$inc: { warnings:1}}, {$set:{updated:n}});
};
