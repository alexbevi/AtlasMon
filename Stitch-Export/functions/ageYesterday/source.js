exports = function() {
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
  var n = new Date();
  conn.updateMany({"noReap":false},{$set:{"updated":n, "changeSrc":"cron"}, $inc: { "warnings":1}});
};
