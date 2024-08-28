from db import sessions_collection, users_collection
from bson import ObjectId

async def find_user_by_token(token: str):
  session = await sessions_collection.find_one({"token": token})
  if session:
    return await users_collection.find_one({"_id": ObjectId(session["userId"])})
  else:
    return