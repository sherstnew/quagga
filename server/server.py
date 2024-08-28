from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers import users, connections, sessions, files

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

app.include_router(router=users.router, tags=["Users"])
app.include_router(router=connections.router, tags=["Connections"])
app.include_router(router=sessions.router, tags=["Sessions"])
app.include_router(router=files.router, tags=["Files"])