exports = function(authEvent) {
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("users");
  var n = new Date();
  const user = authEvent.user;
  conn.insertOne({user:user, created:n});
};
