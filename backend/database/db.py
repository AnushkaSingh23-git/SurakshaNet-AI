from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URL"))

db = client["surakshanet"]

reports_collection = db["reports"]