from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017")

database = client.quagga

users_collection = database.get_collection("users")
sessions_collection = database.get_collection("sessions")
files_collection = database.get_collection("files")
panels_collection = database.get_collection("panels")