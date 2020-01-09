exports = async function(){
  // get variables
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("billing");
  var orgID = context.values.get("orgID");
  var apiRoot = context.values.get("apiRoot");
  var apiKey = context.values.get("atlasAPI");
  const httpService = context.services.get("hook");
  
  var n = new Date();
  

  // make api call
  uri = "https://"+apiKey.key+":"+apiKey.secret+"@cloud.mongodb.com/api/atlas/v1.0/orgs/"+orgID+"/invoices/pending"
  var args = {"url":uri, "headers": {"Content-Type":["application/json"]}, "digestAuth": true };
  var result = httpService.get(args, {"encodeBodyAsJSON":true});
  var res = await result;
  
  // build doc to be saved
  var doc = {};
  doc.queryTime = n;
  doc.atlasResponse = JSON.parse(res.body.text());
  
  // get rid of crap
  delete doc.atlasResponse.links;
  delete doc.atlasResponse.payments;
  delete doc.atlasResponse.refunds;
  delete doc.atlasResponse.salesTaxCents;
  delete doc.atlasResponse.amountPaidCents;
  delete doc.atlasResponse.startingBalanceCents;
  delete doc.atlasResponse.statusName;
  
  // write to DB
  const opt = {upsert:true};
  const query = {ymd:{year:n.getFullYear(), mo:(n.getMonth()+1), d:n.getDay() }};
  const up = {$push: {measurements:doc}, $set:{lastQueryTime:n}};
  conn.updateOne(query, up, opt);
  
};