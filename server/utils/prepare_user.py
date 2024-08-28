def prepare_user(user):
  user["_id"] = str(user["_id"])
  user["password"] = ""

  for i in range(len(user["files"])):
    if "_id" in user["files"][i]:
      user["files"][i]["_id"] = str(user["files"][i]["_id"])

  for i in range(len(user["sessions"])):
    if "_id" in user["sessions"][i]:
      user["sessions"][i]["_id"] = str(user["sessions"][i]["_id"])

  return user