exports = async function(src){
  // get variables
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("log");
  var orgID = context.values.get("orgID");
  var apiRoot = context.values.get("apiRoot");
  var apiKey = context.values.get("atlasAPI");
  const httpService = context.services.get("hook");
  

  // make api call
  uri = "https://"+apiKey.key+":"+apiKey.secret+"@cloud.mongodb.com/api/atlas/v1.0/orgs/"+orgID+"/groups"
  var args = {"url":uri, "headers": {"Content-Type":["application/json"]}, "digestAuth": true };
  var result = httpService.get(args, {"encodeBodyAsJSON":true});
  var res = await result;
  
  // build doc to be saved
  var doc = {};
  doc.queryTime = new Date();
  doc.atlasOrgResponse = JSON.parse(res.body.text());
  doc.projects = [];
  doc.src = src;
  
    
  for(var orgNum = 0; orgNum < doc.atlasOrgResponse.results.length; orgNum++) {
    uri = "https://"+apiKey.key+":"+apiKey.secret+"@cloud.mongodb.com/api/atlas/v1.0/groups/"+doc.atlasOrgResponse.results[orgNum].id+"/clusters";
    args = {"url":uri, "headers": {"Content-Type":["application/json"]}, "digestAuth": true };
    result = httpService.get(args, {"encodeBodyAsJSON":true});
    res = await result;
    
    var proj = {};
    proj.name = doc.atlasOrgResponse.results[orgNum].name;
    proj.id = doc.atlasOrgResponse.results[orgNum].id;
    proj.clustersResponse = JSON.parse(res.body.text());
    doc.projects.push(proj);
  }
  
  // write to DB
  conn.insertOne(doc);
  
  // delete any stuff from our db that users deleted from atlas
  context.functions.execute("purgeDeletedClusters");
  
};