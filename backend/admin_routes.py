from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Request
from typing import List
from pydantic import BaseModel
from datetime import timedelta
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid
from pathlib import Path

from models import (
    Product, ProductCreate, Review, ReviewCreate, Category,
    HeroSlide, HeroSlideCreate, SiteSettings, Catalog
)
from auth import authenticate_user, create_access_token, require_admin, ACCESS_TOKEN_EXPIRE_MINUTES

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'wolfterm_db')
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=1000, connectTimeoutMS=1000)
db = client[db_name]

router = APIRouter(prefix="/api/admin")


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    username: str


class DashboardStats(BaseModel):
    total_products: int
    total_reviews: int
    total_categories: int
    total_hero_slides: int
    recent_products: List[Product] = []
    recent_reviews: List[Review] = []


class ImageUploadResponse(BaseModel):
    url: str
    filename: str


# Authentication
@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    user = authenticate_user(request.username, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"], "role": user["role"]},
        expires_delta=access_token_expires
    )

    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        username=user["username"]
    )


# Dashboard
@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(current_user: dict = Depends(require_admin)):
    try:
        total_products = await db.products.count_documents({})
        total_reviews = await db.reviews.count_documents({})
        total_categories = await db.categories.count_documents({})
        total_hero_slides = await db.hero_slides.count_documents({})

        recent_products_cursor = db.products.find().sort("created_at", -1).limit(5)
        recent_products = await recent_products_cursor.to_list(length=5)

        recent_reviews_cursor = db.reviews.find().sort("date", -1).limit(5)
        recent_reviews = await recent_reviews_cursor.to_list(length=5)

        return DashboardStats(
            total_products=total_products,
            total_reviews=total_reviews,
            total_categories=total_categories,
            total_hero_slides=total_hero_slides,
            recent_products=[Product(**p) for p in recent_products],
            recent_reviews=[Review(**r) for r in recent_reviews]
        )
    except Exception:
        return DashboardStats(
            total_products=0,
            total_reviews=0,
            total_categories=0,
            total_hero_slides=0,
            recent_products=[],
            recent_reviews=[]
        )


# Products Management
@router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product: ProductCreate,
    current_user: dict = Depends(require_admin)
):
    existing_product = await db.products.find_one({"id": product_id})
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = product.dict(exclude_unset=True)
    await db.products.update_one({"id": product_id}, {"$set": update_data})

    updated_product = await db.products.find_one({"id": product_id})
    return Product(**updated_product)


# Reviews Management
@router.put("/reviews/{review_id}", response_model=Review)
async def update_review(
    review_id: str,
    review: ReviewCreate,
    current_user: dict = Depends(require_admin)
):
    existing_review = await db.reviews.find_one({"id": review_id})
    if not existing_review:
        raise HTTPException(status_code=404, detail="Review not found")

    update_data = review.dict(exclude_unset=True)
    await db.reviews.update_one({"id": review_id}, {"$set": update_data})

    updated_review = await db.reviews.find_one({"id": review_id})
    return Review(**updated_review)


@router.delete("/reviews/{review_id}")
async def delete_review(
    review_id: str,
    current_user: dict = Depends(require_admin)
):
    result = await db.reviews.delete_one({"id": review_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Review deleted successfully"}


# Categories Management
@router.post("/categories", response_model=Category)
async def create_category(
    category: Category,
    current_user: dict = Depends(require_admin)
):
    await db.categories.insert_one(category.dict())
    return category


@router.put("/categories/{category_id}", response_model=Category)
async def update_category(
    category_id: str,
    category: Category,
    current_user: dict = Depends(require_admin)
):
    existing_category = await db.categories.find_one({"id": category_id})
    if not existing_category:
        raise HTTPException(status_code=404, detail="Category not found")

    await db.categories.update_one({"id": category_id}, {"$set": category.dict()})
    return category


# Hero Slides Management
@router.get("/hero-slides", response_model=List[HeroSlide])
async def get_hero_slides(current_user: dict = Depends(require_admin)):
    try:
        slides = await db.hero_slides.find().sort("order", 1).to_list(length=100)
        return [HeroSlide(**slide) for slide in slides]
    except Exception:
        return []


@router.post("/hero-slides", response_model=HeroSlide)
async def create_hero_slide(
    slide: HeroSlideCreate,
    current_user: dict = Depends(require_admin)
):
    slide_dict = slide.dict()
    slide_obj = HeroSlide(**slide_dict)
    await db.hero_slides.insert_one(slide_obj.dict())
    return slide_obj


@router.put("/hero-slides/{slide_id}", response_model=HeroSlide)
async def update_hero_slide(
    slide_id: str,
    slide: HeroSlideCreate,
    current_user: dict = Depends(require_admin)
):
    existing_slide = await db.hero_slides.find_one({"id": slide_id})
    if not existing_slide:
        raise HTTPException(status_code=404, detail="Hero slide not found")

    await db.hero_slides.update_one({"id": slide_id}, {"$set": slide.dict()})
    updated_slide = await db.hero_slides.find_one({"id": slide_id})
    return HeroSlide(**updated_slide)


@router.delete("/hero-slides/{slide_id}")
async def delete_hero_slide(
    slide_id: str,
    current_user: dict = Depends(require_admin)
):
    result = await db.hero_slides.delete_one({"id": slide_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Hero slide not found")
    return {"message": "Hero slide deleted successfully"}


# Site Settings (admin)
@router.get("/settings", response_model=SiteSettings)
async def get_settings(current_user: dict = Depends(require_admin)):
    try:
        settings = await db.site_settings.find_one({"id": "site_settings"})
        if not settings:
            # Try seeded file fallback before inserting defaults
            try:
                from pathlib import Path
                import json
                seeds_path = Path(__file__).parent / "uploads" / "seeds" / "site_settings.json"
                if seeds_path.exists():
                    data = json.loads(seeds_path.read_text(encoding="utf-8"))
                    return SiteSettings(**data)
            except Exception:
                pass
            default_settings = SiteSettings()
            # Ensure a stable id so future GET/PUT find the same record
            default_settings.id = "site_settings"
            await db.site_settings.insert_one(default_settings.dict())
            return default_settings
        return SiteSettings(**settings)
    except Exception:
        # DB unavailable: try seeds file then defaults
        try:
            from pathlib import Path
            import json
            seeds_path = Path(__file__).parent / "uploads" / "seeds" / "site_settings.json"
            if seeds_path.exists():
                data = json.loads(seeds_path.read_text(encoding="utf-8"))
                return SiteSettings(**data)
        except Exception:
            pass
        return SiteSettings()


@router.put("/settings", response_model=SiteSettings)
async def update_settings(
    settings: SiteSettings,
    current_user: dict = Depends(require_admin)
):
    # Ensure a stable id
    try:
        settings.id
    except Exception:
        pass
    # Force id to be a known key
    settings.id = "site_settings"
    # First try to persist to DB
    try:
        await db.site_settings.update_one(
            {"id": "site_settings"},
            {"$set": settings.dict()},
            upsert=True
        )
        return settings
    except Exception:
        # DB unavailable: persist to seeds file as fallback so admin UI keeps working
        try:
            from pathlib import Path
            import json
            seeds_dir = Path(__file__).parent / "uploads" / "seeds"
            seeds_dir.mkdir(parents=True, exist_ok=True)
            from pydantic.json import pydantic_encoder
            seeds_path = seeds_dir / "site_settings.json"
            payload = json.dumps(settings.dict(), default=pydantic_encoder, ensure_ascii=False, indent=2)
            seeds_path.write_text(payload, encoding="utf-8")
            return settings
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to persist settings: {e}")


# Image Upload: save to backend/uploads and return served URL
@router.post("/upload-image", response_model=ImageUploadResponse)
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    current_user: dict = Depends(require_admin)
):
    try:
        uploads_dir = Path(__file__).parent / "uploads"
        uploads_dir.mkdir(exist_ok=True)
        ext = os.path.splitext(file.filename)[1].lower()
        safe_name = f"{uuid.uuid4().hex}{ext}"
        dest = uploads_dir / safe_name
        content = await file.read()
        with open(dest, "wb") as f:
            f.write(content)
        base = str(request.base_url).rstrip("/")
        url = f"{base}/uploads/{safe_name}"
        return ImageUploadResponse(url=url, filename=safe_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")


# Catalogs CRUD
@router.get("/catalogs", dependencies=[Depends(require_admin)])
async def get_all_catalogs():
    try:
        catalogs = await db.catalogs.find().sort("order", 1).to_list(length=100)
        return catalogs
    except Exception:
        return []


@router.get("/catalogs/{catalog_id}", dependencies=[Depends(require_admin)])
async def get_catalog(catalog_id: str):
    try:
        catalog = await db.catalogs.find_one({"id": catalog_id})
    except Exception:
        catalog = None
    if not catalog:
        raise HTTPException(status_code=404, detail="Catalog not found")
    return catalog


@router.post("/catalogs", dependencies=[Depends(require_admin)])
async def create_catalog(catalog: Catalog):
    catalog_dict = catalog.dict()
    await db.catalogs.insert_one(catalog_dict)
    return catalog


@router.put("/catalogs/{catalog_id}", dependencies=[Depends(require_admin)])
async def update_catalog(catalog_id: str, catalog: Catalog):
    catalog_dict = catalog.dict()
    catalog_dict["id"] = catalog_id
    result = await db.catalogs.replace_one({"id": catalog_id}, catalog_dict)
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Catalog not found")
    return catalog


@router.delete("/catalogs/{catalog_id}", dependencies=[Depends(require_admin)])
async def delete_catalog(catalog_id: str):
    result = await db.catalogs.delete_one({"id": catalog_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Catalog not found")
    return {"message": "Catalog deleted"}
