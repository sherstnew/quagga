import secrets
from fastapi import APIRouter, Response, status
from fastapi.encoders import jsonable_encoder
from datetime import datetime, timedelta
from pydantic import BaseModel

from models.session import Session
from db import users_collection, sessions_collection
from passwords import pwd_context

router = APIRouter(prefix="/sessions")

class LoginData(BaseModel):
  email: str
  password: str

@router.post('/')
async def create_session(login_data: LoginData, response: Response) -> Session:

  login_data = jsonable_encoder(login_data)

  user = await users_collection.find_one({"email": login_data["email"]})

  if pwd_context.verify(login_data["password"], user["password"]):

    existing_session = await sessions_collection.find_one({"userId": str(user["_id"])})

    if existing_session is not None:
      await sessions_collection.delete_one({"_id": existing_session["_id"]})

    token = secrets.token_hex(32)

    response.set_cookie("QUAGGA_TOKEN", token)

    new_session = {
      "userId": str(user["_id"]),
      "token": token,
      "expires": datetime.now() + timedelta(days=15),
    }

    await sessions_collection.insert_one(new_session)

    return new_session

  else:
    return Response(content="Login failed", status_code=status.HTTP_403_FORBIDDEN)

@router.get('/{token}')
async def get_session(token: str) -> Session:
  session = await sessions_collection.find_one({"token": token})
  return session if session else Response(content="Session not found", status_code=status.HTTP_403_FORBIDDEN)