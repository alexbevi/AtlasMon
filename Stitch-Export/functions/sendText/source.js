exports = async function(toUserId, message){
  var conn = context.services.get("mongodb-atlas").db("atlasmonitor").collection("users");
  const twilio = context.services.get("twil");
  const ourNumber = context.values.get("twilphone");
  
  var docs = await conn.find({"user.id":toUserId},{pn:1}).toArray();
  for(var i = 0; i < docs.length; i++) {
    twilio.send({
      from: ourNumber,
      to: docs[i].pn,
      //to: '+16097925029',
      body: message
    });
  }
};