from fastapi import APIRouter, Path, Body, Response, status
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId

from db import users_collection
from passwords import pwd_context
from models.user import User
from utils.prepare_user import prepare_user

router = APIRouter(prefix="/users")

@router.get("/{id}")
async def get_user(id: str = Path(..., regex=r"^[0-9a-f]{24}$")):
  user = await users_collection.find_one({"_id": ObjectId(id)})
  return prepare_user(user) if user else Response(status_code=status.HTTP_404_NOT_FOUND)

# registration
@router.post("/")
async def create_user(user: User) -> str:
  user["password"] = pwd_context.hash(user["password"])
  await users_collection.insert_one(user)
  return 'ok'

@router.patch('/{id}')
async def edit_user(id: str = Path(..., regex=r"^[0-9a-f]{24}$"), user: User = Body(...)):
  await users_collection.update_one(
    {"_id": ObjectId(id)},
    {"$set": jsonable_encoder(user)}
  )
  return prepare_user(user)