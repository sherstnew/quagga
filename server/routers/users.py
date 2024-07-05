from fastapi import APIRouter, Path, Body
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId
from bson.errors import InvalidId

from db import users_collection

from models.user import User

router = APIRouter(prefix="/users")

@router.get("/{id}")
async def get_user(id: str = Path(..., regex=r"^[0-9a-f]{24}$")) -> User:
  user = await users_collection.find_one({"_id": ObjectId(id)})
  return user

# registration
@router.post("/")
async def create_user(user: User) -> User:
  user = await users_collection.insert_one(jsonable_encoder(user))
  return user

@router.patch('/{id}')
async def edit_user(id: str = Path(..., regex=r"^[0-9a-f]{24}$"), user: User = Body(...)) -> User:
  await users_collection.update_one(
    {"_id": ObjectId(id)},
    {"$set": jsonable_encoder(user)}
  )
  return user

@router.delete('/{id}')
async def delete_user(id: str = Path(..., regex=r"^[0-9a-f]{24}$")):
  users_collection.delete_one({"_id": ObjectId(id)})
  return 200