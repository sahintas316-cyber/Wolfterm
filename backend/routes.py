from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import Product, ProductCreate, Review, ReviewCreate, Category, ContactForm, HeroSlide
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/api")

# Get MongoDB client from main server
from server import db

# Products endpoints
@router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    limit: int = Query(default=50, le=100)
):
    query = {}
    if category:
        query['category'] = category
    try:
        products = await db.products.find(query).limit(limit).to_list(length=limit)
        return [Product(**product) for product in products]
    except Exception:
        # Graceful fallback with sample data when DB is unavailable
        sample_products = [
            Product(
                name={"tr": "Kombi Cihazı X", "en": "Combi Unit X", "ru": "Комби X", "it": "Caldaia X"},
                category="combi",
                images=[
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop"
                ],
                description={"tr": "Yüksek verimli kombi cihazı.", "en": "High-efficiency combi unit.", "ru": "Высокоэффективный комбинированный агрегат.", "it": "Caldaia ad alta efficienza."},
                models=[],
            ),
            Product(
                name={"tr": "Yoğuşmalı Cihaz Y", "en": "Condensing Unit Y", "ru": "Конденсационный блок Y", "it": "Caldaia a condensazione Y"},
                category="condensing",
                images=[
                    "https://images.unsplash.com/photo-1544996901-842263cf165b?w=800&auto=format&fit=crop"
                ],
                description={"tr": "Sessiz ve tasarruflu.", "en": "Quiet and economical.", "ru": "Тихий и экономичный.", "it": "Silenziosa ed economica."},
                models=[],
            ),
        ]
        return sample_products[:limit]

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    try:
        product = await db.products.find_one({"id": product_id})
    except Exception:
        product = None
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    product_dict = product.dict()
    product_obj = Product(**product_dict)
    try:
        await db.products.insert_one(product_obj.dict())
    except Exception:
        # If DB is unavailable, indicate service issue
        raise HTTPException(status_code=503, detail="Database unavailable")
    return product_obj

# Reviews endpoints
@router.get("/reviews", response_model=List[Review])
async def get_reviews(limit: int = Query(default=20, le=100)):
    try:
        reviews = await db.reviews.find().sort("date", -1).limit(limit).to_list(length=limit)
        return [Review(**review) for review in reviews]
    except Exception:
        return []

@router.post("/reviews", response_model=Review)
async def create_review(review: ReviewCreate):
    review_dict = review.dict()
    review_obj = Review(**review_dict)
    try:
        await db.reviews.insert_one(review_obj.dict())
    except Exception:
        raise HTTPException(status_code=503, detail="Database unavailable")
    return review_obj

# Categories endpoint
@router.get("/categories", response_model=List[Category])
async def get_categories():
    try:
        categories = await db.categories.find().to_list(length=20)
        return [Category(**category) for category in categories]
    except Exception:
        # Seeded categories from uploads/seeds if available
        try:
            from pathlib import Path
            import json
            seeds_path = Path(__file__).parent / "uploads" / "seeds" / "categories.json"
            if not seeds_path.exists():
                # Fallback sample categories
                return [
                    Category(
                        id="combi",
                        name="Combi",
                        nameEn="Combi",
                        nameIt="Combi",
                        nameTr="Kombi",
                        icon="radiator",
                        image="https://images.unsplash.com/photo-1604014239322-9b974e6a5c63?w=800&auto=format&fit=crop"
                    ),
                    Category(
                        id="condensing",
                        name="Condensing",
                        nameEn="Condensing",
                        nameIt="Condensing",
                        nameTr="Yoğuşmalı",
                        icon="flame",
                        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop"
                    ),
                ]
            data = json.loads(seeds_path.read_text(encoding="utf-8"))
            return [Category(**c) for c in data]
        except Exception:
            return []

# Catalogs
@router.get("/catalogs")
async def get_catalogs():
    try:
        catalogs = await db.catalogs.find().sort("order", 1).to_list(length=100)
        return catalogs
    except Exception:
        # Sample catalogs fallback
        return [
            {
                "id": "sample-catalog-1",
                "name": {"tr": "Ürün Kataloğu", "en": "Product Catalog", "ru": "Каталог продукции", "it": "Catalogo Prodotti"},
                "description": {"tr": "PDF kataloğu indirin.", "en": "Download the PDF catalog.", "ru": "Скачать PDF каталог.", "it": "Scarica il catalogo PDF."},
                "file_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                "thumbnail": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
                "file_size": "1.2 MB",
                "order": 1,
            }
        ]

@router.get("/catalogs/{catalog_id}")
async def get_catalog(catalog_id: str):
    try:
        catalog = await db.catalogs.find_one({"id": catalog_id})
    except Exception:
        catalog = None
    if not catalog:
        raise HTTPException(status_code=404, detail="Catalog not found")
    return catalog

# Hero Slides endpoint
@router.get("/hero-slides", response_model=List[HeroSlide])
async def get_hero_slides():
    try:
        slides = await db.hero_slides.find().sort("order", 1).to_list(length=20)
        return [HeroSlide(**slide) for slide in slides]
    except Exception:
        # Seeded hero slides from uploads/seeds if available
        try:
            from pathlib import Path
            import json
            seeds_path = Path(__file__).parent / "uploads" / "seeds" / "hero_slides.json"
            if not seeds_path.exists():
                return []
            data = json.loads(seeds_path.read_text(encoding="utf-8"))
            return [HeroSlide(**s) for s in data]
        except Exception:
            return []

# Contact form endpoint
@router.post("/contact")
async def submit_contact_form(form: ContactForm):
    try:
        await db.contact_forms.insert_one(form.dict())
        return {"message": "Contact form submitted successfully", "id": form.id}
    except Exception:
        # Accept submission but report degraded state
        return {"message": "Contact form received (DB offline)", "id": form.id}

# Search endpoint
@router.get("/search")
async def search_products(q: str, limit: int = Query(default=20, le=50)):
    if not q or len(q) < 2:
        return []
    
    # Simple text search in name and description
    try:
        products = await db.products.find({
            "$or": [
                {"name": {"$regex": q, "$options": "i"}},
                {"description": {"$regex": q, "$options": "i"}}
            ]
        }).limit(limit).to_list(length=limit)
        return [Product(**product) for product in products]
    except Exception:
        return []
# Site Settings
@router.get("/settings")
async def get_public_settings():
    # Try DB first
    try:
        settings = await db.site_settings.find_one({"id": "site_settings"})
    except Exception:
        settings = None

    if not settings:
        # Try seeded file fallback
        try:
            from pathlib import Path
            import json
            seeds_path = Path(__file__).parent / "uploads" / "seeds" / "site_settings.json"
            if seeds_path.exists():
                data = json.loads(seeds_path.read_text(encoding="utf-8"))
                return data
        except Exception:
            pass
        # Finally defaults
        return {
            "site_name": {"tr": "WolfTerm Solutions", "en": "WolfTerm Solutions", "ru": "WolfTerm Solutions", "it": "WolfTerm Solutions"},
            "logo_url": "https://customer-assets.emergentagent.com/job_17a22ec5-8e56-4b05-8432-58bb6f63aed4/artifacts/xojo9jlu_wolfterm%20logo.png",
            "contact_email": "info@wolfterm.com",
            "contact_phone": "",
            "primary_color": "#dc2626"
        }
    return settings

