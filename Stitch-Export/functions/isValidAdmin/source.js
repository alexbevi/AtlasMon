exports = function(user){
  const validOwners = context.values.get("validAdmins");
  if (validOwners.indexOf(user.id) > -1) {
    return true;
  } else {
    return false;
  }
};