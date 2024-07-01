import os
from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from typing import Annotated

app = FastAPI()

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.mount('/static', StaticFiles(directory="static"), name="static")

@app.get('/')
async def index():
  return 'QuaggaAPI'

@app.post('/uploadFile')
async def uploadFile(file: Annotated[bytes, File()], extension: Annotated[str, Form]):
  file_path = f"static/{os.urandom(15).hex()}.{extension}"
  with open(file_path, "wb") as uploaded_file:
    uploaded_file.write(file)
  return "ok"