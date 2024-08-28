import secrets
from fastapi import APIRouter, Response, status
from datetime import datetime, timedelta
from pydantic import BaseModel
from models.response import ResponseWithData
from models.session import Session
from models.user import User
from db import users_collection, sessions_collection
from passwords import pwd_context
from utils.find_user_by_token import find_user_by_token
from utils.prepare_user import prepare_user

router = APIRouter(prefix="/sessions")

class LoginData(BaseModel):
  email: str
  password: str

@router.post('/')
async def create_session(login_data: LoginData, response: Response) -> ResponseWithData[Session]:

  user = await users_collection.find_one({"email": login_data["email"]})

  if pwd_context.verify(login_data["password"], user["password"]):

    token = secrets.token_hex(32)

    response.set_cookie("QUAGGA_TOKEN", token)

    new_session = {
      "userId": str(user["_id"]),
      "token": token,
      "expires": datetime.now() + timedelta(days=15),
    }

    await sessions_collection.insert_one(new_session)
    user["sessions"].append(new_session)
    await users_collection.update_one({"_id": user["_id"]}, {"$set": user})

    return {
      "status": "ok",
      "data": new_session
    }

  else:
    return Response(content="Login failed", status_code=status.HTTP_403_FORBIDDEN)

@router.get('/user/{token}')
async def get_user_by_token(token: str) -> ResponseWithData[User]:
  user = await find_user_by_token(token)
  if user:
    user = {
      "status": "ok",
      "data": prepare_user(user)
    }
    return user
  else:
    return Response(content="User not found", status_code=status.HTTP_404_NOT_FOUND)