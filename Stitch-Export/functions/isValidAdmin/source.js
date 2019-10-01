exports = function(user){
  const validOwners = context.values.get("validAdmins");
  var id = "";
  
  if(typeof(user)=="object") {id = user.id;  }
  else {  id=user; }
  
  if (validOwners.indexOf(id) > -1) {
    return true;
  } else {
    return false;
  }
};