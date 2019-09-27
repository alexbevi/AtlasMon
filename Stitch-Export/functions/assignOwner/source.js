exports = async function(clusoid, email){
  var users = context.services.get("mongodb-atlas").db("atlasmonitor").collection("users");
  var clus = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
  
  var docs = await users.find({"user.data.email":email}).toArray();
  for(var i = 0; i < docs.length; i++) {
    var owner = {};
    owner.id = docs[i].user.id;
    owner.email = email;
    clus.updateOne({_id:BSON.ObjectId(clusoid)}, {$set:{owner}}, {$set:{updated:new Date()}});
  }
};