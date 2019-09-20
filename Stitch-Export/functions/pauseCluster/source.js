exports = async function(projectId, clusterName){
  // get variables
  var log = context.services.get("mongodb-atlas").db("atlasmonitor").collection("changelog");
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("clusters");
  
  var orgID = context.values.get("orgID");
  var apiRoot = context.values.get("apiRoot");
  var apiKey = context.values.get("atlasAPI");
  const httpService = context.services.get("hook");
  

  // make api call
  uri = "https://"+apiKey.key+":"+apiKey.secret+"@cloud.mongodb.com/api/atlas/v1.0/groups/"+projectId+"/clusters/"+clusterName;
  var data = {paused:true};
  var args = {"url":uri, "headers": {"Content-Type":["application/json"]}, "digestAuth": true, "body":data, "encodeBodyAsJSON":true  };
  var result = httpService.patch(args, {"encodeBodyAsJSON":true});
  var res = await result;
  
  // build doc to be saved
  var doc = {};
  var n = new Date();
  doc.queryTime = n;
  doc.atlasResponse = JSON.parse(res.body.text());
  log.insertOne(doc);
  conn.updateOne({"projectId":projectId, name:clusterName}, {$set:{updated:n, reaped:true}})
};