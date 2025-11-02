import uuid
from datetime import datetime

async def seed_database(db):
    """Seed the database with initial product data"""
    
    # Products data
    products = [
        {
            "id": str(uuid.uuid4()),
            "name": "WolfTerm 24 Varme",
            "category": "gas-boilers",
            "price": 45900,
            "image": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
            "description": "Двухконтурный настенный газовый котел мощностью 24 кВт",
            "power": "24 кВт",
            "efficiency": "95%",
            "warranty": "5 лет",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Модуль управления Wi-Fi",
            "category": "accessories",
            "price": 8900,
            "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
            "description": "Wi-Fi модуль управления котлом через мобильное приложение",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "WolfTerm 30 Varme",
            "category": "gas-boilers",
            "price": 52900,
            "image": "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800",
            "description": "Двухконтурный настенный газовый котел мощностью 30 кВт",
            "power": "30 кВт",
            "efficiency": "95%",
            "warranty": "5 лет",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "INOX 800 Premium",
            "category": "boilers",
            "price": 89900,
            "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
            "description": "Бойлер косвенного нагрева 800 литров с анодом",
            "volume": "800 л",
            "material": "Нержавеющая сталь",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Труба Pe-Xa Evoh",
            "category": "pipes",
            "price": 120,
            "image": "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800",
            "description": "Труба для отопления Pe-Xa с кислородным барьером",
            "size": "16-32 мм",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Радиатор стальной панельный",
            "category": "radiators",
            "price": 3500,
            "image": "https://images.unsplash.com/photo-1545259742-12f8c767e030?w=800",
            "description": "Стальной панельный радиатор отопления",
            "type": "Тип 22",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "WolfTerm 18 Varme",
            "category": "gas-boilers",
            "price": 42900,
            "image": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800",
            "description": "Двухконтурный настенный газовый котел мощностью 18 кВт",
            "power": "18 кВт",
            "efficiency": "94%",
            "warranty": "5 лет",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "INOX 500 Premium",
            "category": "boilers",
            "price": 69900,
            "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
            "description": "Бойлер косвенного нагрева 500 литров",
            "volume": "500 л",
            "material": "Нержавеющая сталь",
            "created_at": datetime.utcnow()
        }
    ]
    
    # Insert products
    if products:
        await db.products.insert_many(products)
    
    # Reviews data
    reviews = [
        {
            "id": str(uuid.uuid4()),
            "name": "Александр Семенов",
            "city": "г. Москва",
            "rating": 5,
            "date": datetime.utcnow(),
            "text": "Достоинства: Отличный котёл, по привлекательной цене, за полтора года пользования ни разу не подвёл, при этом цена довольно таки не плохая, абсолютно бесшумен"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Алена Кузнецова",
            "city": "г. Екатеринбург",
            "rating": 4,
            "date": datetime.utcnow(),
            "text": "Достоинства: Быстро нагревается вода. Недостатки: немного шумный. Комментарий: Мне этот котел поставили недавно, в августе. Что особо понравилось? Скорость, с которой вода нагревается. Открываешь кран, и вода практически сразу идет горячая."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Дмитрий Иванов",
            "city": "г. Санкт-Петербург",
            "rating": 5,
            "date": datetime.utcnow(),
            "text": "Отличное качество сборки, работает бесшумно, экономичный расход газа. Wi-Fi модуль очень удобный - можно управлять отоплением из любой точки."
        }
    ]
    
    # Insert reviews
    if reviews:
        await db.reviews.insert_many(reviews)
    
    # Categories data
    categories = [
        {
            "id": "gas-boilers",
            "name": "Газовые котлы",
            "nameEn": "Gas Boilers",
            "nameIt": "Caldaie a Gas",
            "nameTr": "Gaz Kazanları",
            "icon": "🔥",
            "image": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600"
        },
        {
            "id": "boilers",
            "name": "Бойлеры",
            "nameEn": "Boilers",
            "nameIt": "Bollitori",
            "nameTr": "Sıcak Su Depoları",
            "icon": "💧",
            "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
        },
        {
            "id": "radiators",
            "name": "Радиаторы",
            "nameEn": "Radiators",
            "nameIt": "Radiatori",
            "nameTr": "Radyatörler",
            "icon": "♨️",
            "image": "https://images.unsplash.com/photo-1545259742-12f8c767e030?w=600"
        },
        {
            "id": "pipes",
            "name": "Трубы",
            "nameEn": "Pipes",
            "nameIt": "Tubi",
            "nameTr": "Borular",
            "icon": "🔧",
            "image": "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600"
        },
        {
            "id": "accessories",
            "name": "Аксессуары",
            "nameEn": "Accessories",
            "nameIt": "Accessori",
            "nameTr": "Aksesuarlar",
            "icon": "⚙️",
            "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=600"
        }
    ]
    
    # Insert categories
    if categories:
        await db.categories.insert_many(categories)
    
    # Hero slides data
    hero_slides = [
        {
            "id": str(uuid.uuid4()),
            "title": "Модуль управления котлом Wi-Fi WolfTerm",
            "subtitle": "Круглосуточно из любой точки мира",
            "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=1920",
            "link": "/catalog/accessories",
            "order": 0,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Газовые котлы с гарантией 5 лет",
            "subtitle": "Европейское качество, доступная цена",
            "image": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920",
            "link": "/catalog/gas-boilers",
            "order": 1,
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Бойлеры косвенного нагрева",
            "subtitle": "От 100 до 3000 литров",
            "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920",
            "link": "/catalog/boilers",
            "order": 2,
            "created_at": datetime.utcnow()
        }
    ]
    
    # Insert hero slides
    if hero_slides:
        await db.hero_slides.insert_many(hero_slides)
    
    print("Database seeded successfully!")
    return True
