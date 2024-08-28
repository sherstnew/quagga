import os
import secrets
from bson import ObjectId
from fastapi import APIRouter, File, Response, Form, Header, status
from typing import Annotated
from utils.find_user_by_token import find_user_by_token
from models.response import ResponseWithData
from db import users_collection

router = APIRouter(prefix="/files")

@router.post('/')
async def upload_file(file: Annotated[bytes, File()], authorization: Annotated[str, Header()], name: Annotated[str, Form()], extension: Annotated[str, Form()]) -> ResponseWithData[str]:
  user = await find_user_by_token(authorization)
  if user:
    filename = secrets.token_hex(32)
    with open(f'static/{filename}.{extension}', 'wb') as f:
        f.write(file)
    new_file = {
      "filename": filename,
      "path": f'/static/{filename}.{extension}',
      "originalName": name,
      "extension": extension,
      "size": len(file)
    }
    user["files"].append(new_file)
    await users_collection.update_one({"_id": user["_id"]}, {"$set": user})
    return {
      "status": "ok",
      "data": f'/static/{filename}.{extension}'
    }
  else:
    return Response(status_code=status.HTTP_403_FORBIDDEN)

@router.delete('/{filename}')
async def delete_file(filename: str, authorization: Annotated[str, Header()]) -> ResponseWithData[str]:
  user = await find_user_by_token(authorization)
  if user:
    target_file = None
    for user_file in user["files"]:
      if user_file["filename"] == filename:
        target_file = user_file
        break
    if target_file:
      path = os.path.abspath(target_file["path"])
      user["files"] = list(filter(lambda x: str(x["filename"]) != filename, user["files"]))
      await users_collection.update_one({"_id": user["_id"]}, {"$set": user})
      if os.path.isfile(path):
        os.remove(path)
      return {
        "status": "ok",
        "data": "File deleted"
      }
    else:
      return Response(status_code=status.HTTP_404_NOT_FOUND)
  else:
    return Response(status_code=status.HTTP_403_FORBIDDEN)