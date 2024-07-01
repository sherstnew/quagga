from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://localhost:27017")

database = client.quagga

connections_collection = database.get_collection("connections")
files_collection = database.get_collection("files")
panels_collection = database.get_collection("panels")
sessions_collection = database.get_collection("sessions")
users_collection = database.get_collection("users")