from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging (moved to top)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
# Use short timeouts to avoid blocking startup if MongoDB is unavailable
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=1000, connectTimeoutMS=1000)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="WolfTerm API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "WolfTerm API", "version": "1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Import and include routes from routes.py
try:
    from routes import router as api_routes
    app.include_router(api_routes)
except ImportError as e:
    logger.warning(f"Could not import routes: {e}")

# Import and include admin routes
try:
    from admin_routes import router as admin_routes
    app.include_router(admin_routes)
except ImportError as e:
    logger.warning(f"Could not import admin routes: {e}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
# Static files for uploaded images
try:
    uploads_dir = ROOT_DIR / 'uploads'
    uploads_dir.mkdir(exist_ok=True)
    app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")
except Exception as e:
    logger.warning(f"Could not mount /uploads static directory: {e}")
# Startup event to seed initial data
@app.on_event("startup")
async def startup_db():
    # Check if products collection is empty and seed initial data
    # Wrap in try/except to avoid startup failure when MongoDB is unavailable
    try:
        count = await db.products.count_documents({})
        logger.info(f"Products in database: {count}")
        # Disabled auto-seeding - use manual seed script instead
        # if count == 0:
        #     from seed_data_new import seed_database
        #     await seed_database(db)
        #     logger.info("Database seeded with initial data")
    except Exception as e:
        logger.warning(f"Skipping DB check at startup: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
