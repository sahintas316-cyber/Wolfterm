# WolfTerm Solutions - E-Commerce Platform

Avrupa kalitesinde ısıtma sistemleri için modern e-ticaret web sitesi.

## 🚀 Özellikler

### Frontend
- ✅ React 18 ile modern kullanıcı arayüzü
- ✅ Çoklu dil desteği (Türkçe, English, Русский, Italiano)
- ✅ Hero slider ile dinamik ana sayfa
- ✅ Ürün katalog sistemi (model bazlı)
- ✅ Detaylı teknik özellikler tabloları
- ✅ Responsive tasarım
- ✅ Shadcn UI component library

### Backend
- ✅ FastAPI ile RESTful API
- ✅ MongoDB veritabanı
- ✅ JWT ile admin authentication
- ✅ CRUD işlemleri (Products, Categories, Reviews, Hero Slides)
- ✅ Multi-language model support

### Admin Panel
- ✅ Secure login (admin/admin123)
- ✅ Dashboard ile istatistikler
- ✅ Ürün yönetimi (CRUD)
  - Çoklu dil (4 dil)
  - Model bazlı teknik özellikler
  - Komponent listesi
  - Görsel yönetimi (dosya yükleme + URL)
- ✅ Hero slider yönetimi (CRUD)
  - Çoklu dil başlık/alt başlık
  - Görsel yükleme
  - Sıralama
- ✅ Yorumlar ve kategoriler yönetimi

## 📦 Ürün Serileri

1. **WOLFPREMIUM Serisi** - Yoğuşmasız Kombiler (18kW, 24kW, 32kW)
2. **WOLFECO Serisi** - Ekonomik Yoğuşmasız Kombiler (20kW, 24kW, 28kW)
3. **WOLFCOND Serisi** - Yoğuşmalı Kombiler (25kW, 35kW, 42kW)
4. **WOLFMAX Serisi** - Yüksek Kapasite Kazanlar (50kW, 70kW, 100kW)

## 🛠️ Teknoloji Stack

### Frontend
- React 18
- React Router v6
- TailwindCSS
- Shadcn UI
- Axios
- Context API (Language & Auth)

### Backend
- FastAPI
- Motor (async MongoDB driver)
- Pydantic
- JWT Authentication
- Python 3.11+

### Database
- MongoDB
- Collections: products, categories, reviews, hero_slides, users, site_settings

## 📂 Proje Yapısı

```
/app
├── backend/
│   ├── server.py           # Main FastAPI app
│   ├── models.py           # Pydantic models
│   ├── routes.py           # Public API routes
│   ├── admin_routes.py     # Admin API routes
│   ├── auth.py             # JWT authentication
│   ├── seed_data_new.py    # Database seeding
│   └── requirements.txt
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ui/           # Shadcn UI components
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   └── Layout.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Catalog.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Reviews.jsx
    │   │   ├── About.jsx
    │   │   └── admin/        # Admin pages
    │   ├── context/
    │   │   ├── LanguageContext.js
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── adminApi.js
    │   └── App.js
    └── package.json
```

## 🔧 Kurulum

### Gereksinimler
- Node.js 16+
- Python 3.11+
- MongoDB

### Backend Kurulum
```bash
cd /app/backend
pip install -r requirements.txt

# Database seed
python seed_data_new.py
```

### Frontend Kurulum
```bash
cd /app/frontend
yarn install
```

## 🚀 Çalıştırma

### Development
```bash
# Backend
cd /app/backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend
cd /app/frontend
yarn start
```

### Production
```bash
# Supervisor ile otomatik başlatma
sudo supervisorctl restart all
```

## 🔐 Admin Girişi

URL: `http://localhost:3000/admin/login`
- Kullanıcı: `admin`
- Şifre: `admin123`

## 🌍 Diller

- 🇹🇷 Türkçe (TR)
- 🇬🇧 English (EN)
- 🇷🇺 Русский (RU)
- 🇮🇹 Italiano (IT)

## 📝 API Endpoints

### Public API
- `GET /api/products` - Tüm ürünler
- `GET /api/products/{id}` - Ürün detayı
- `GET /api/categories` - Kategoriler
- `GET /api/reviews` - Yorumlar
- `GET /api/hero-slides` - Hero slider
- `GET /api/search?query=` - Ürün arama

### Admin API (JWT Required)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- Products CRUD: `GET/POST/PUT/DELETE /api/admin/products`
- Hero Slides CRUD: `GET/POST/PUT/DELETE /api/admin/hero-slides`
- Reviews CRUD: `GET/POST/PUT/DELETE /api/admin/reviews`
- Categories CRUD: `GET/POST/PUT/DELETE /api/admin/categories`

## 🎨 Özellikler

### Ürün Modeli
```json
{
  "name": { "tr": "...", "en": "...", "ru": "...", "it": "..." },
  "description": { "tr": "...", "en": "...", "ru": "...", "it": "..." },
  "category": "condensing",
  "images": ["url1", "url2"],
  "models": [
    {
      "model_name": "25kW",
      "technical_specs": {
        "efficiency": "102%",
        "energy_class": "A",
        ...
      },
      "components": {
        "pump": "GRUNDFOS",
        "gas_valve": "SIT/Honeywell",
        ...
      }
    }
  ]
}
```

## 📄 Lisans

© 2024 WolfTerm Solutions. Tüm hakları saklıdır.

## 🤝 İletişim

- Email: info@wolfterm.com
- Location: Turkey, Istanbul
