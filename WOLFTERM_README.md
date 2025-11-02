# WolfTerm Website - Tam Özellikli E-Ticaret Sitesi

## 📋 Genel Bakış

WolfTerm, modern React frontend, FastAPI backend ve MongoDB veritabanı kullanılarak oluşturulmuş tam özellikli bir e-ticaret web sitesidir.

## 🚀 Özellikler

### Frontend (React)
- ✅ Modern ve responsive tasarım
- ✅ Multi-language desteği (Rusça, İngilizce, İtalyanca, Türkçe)
- ✅ Hero slider (otomatik dönen)
- ✅ Ürün kataloğu ve detay sayfaları
- ✅ Kategori bazlı filtreleme
- ✅ Arama fonksiyonu
- ✅ Müşteri yorumları
- ✅ Shadcn UI bileşenleri

### Backend (FastAPI + MongoDB)
- ✅ RESTful API
- ✅ JWT Authentication
- ✅ CRUD işlemleri (Ürünler, Yorumlar, Kategoriler)
- ✅ Hero slider yönetimi
- ✅ Site ayarları yönetimi
- ✅ Arama endpoint'i

### Admin Paneli
- ✅ Dashboard (istatistikler ve özet bilgiler)
- ✅ Ürün yönetimi (ekleme, düzenleme, silme)
- ✅ Yorum yönetimi
- ✅ Kategori yönetimi
- ✅ Hero slider yönetimi
- ✅ Site ayarları (logo, şirket bilgileri, iletişim)
- ✅ JWT tabanlı güvenli giriş

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ ve Yarn
- Python 3.11+
- MongoDB

### Frontend Kurulumu

```bash
cd frontend
yarn install
```

**.env dosyasını oluşturun:**
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Başlatma:**
```bash
yarn start
```

Frontend http://localhost:3000 adresinde çalışacaktır.

### Backend Kurulumu

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

**.env dosyasını oluşturun:**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=wolfterm
SECRET_KEY=your-secret-key-here
```

**Başlatma:**
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend http://localhost:8001 adresinde çalışacaktır.

### MongoDB Kurulumu

MongoDB'yi başlatın ve veritabanını seed'leyin:

```bash
cd backend
python -c "
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os

async def seed():
    mongo_url = 'mongodb://localhost:27017'
    client = AsyncIOMotorClient(mongo_url)
    db = client['wolfterm']
    
    from seed_data import seed_database
    await seed_database(db)
    client.close()

asyncio.run(seed())
"
```

## 🔐 Admin Paneli Giriş

- **URL:** http://localhost:3000/admin/login
- **Kullanıcı Adı:** admin
- **Şifre:** admin123

## 📁 Proje Yapısı

```
wolfterm/
├── frontend/
│   ├── src/
│   │   ├── components/     # React bileşenleri
│   │   │   ├── admin/     # Admin panel bileşenleri
│   │   │   └── ui/        # Shadcn UI bileşenleri
│   │   ├── pages/         # Sayfalar
│   │   │   └── admin/     # Admin sayfaları
│   │   ├── context/       # React Context (Auth, Language)
│   │   ├── services/      # API servisleri
│   │   └── mock/          # Mock data
│   └── package.json
│
└── backend/
    ├── server.py          # FastAPI ana dosyası
    ├── models.py          # Pydantic modelleri
    ├── routes.py          # Public API routes
    ├── admin_routes.py    # Admin API routes
    ├── auth.py            # JWT authentication
    ├── seed_data.py       # Veritabanı seed scripti
    └── requirements.txt
```

## 🎨 Özelleştirme

### Logo Değiştirme
Admin panelinden "Site Ayarları" > "Logo URL" alanını güncelleyin.

### Renk Teması
`frontend/src/index.css` dosyasındaki CSS değişkenlerini düzenleyin.

### Ürün Ekleme
Admin panelinden "Ürünler" > "Yeni Ürün" butonuna tıklayın.

### Hero Slider Düzenleme
Admin panelinden "Hero Slider" bölümünden slayları ekleyin, düzenleyin veya silin.

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/` - API bilgisi
- `GET /api/products` - Tüm ürünler
- `GET /api/categories` - Kategoriler
- `GET /api/reviews` - Yorumlar
- `GET /api/hero-slides` - Hero slider
- `GET /api/search?q={query}` - Ürün arama

### Admin Endpoints (JWT gerektirir)
- `POST /api/admin/login` - Admin girişi
- `GET /api/admin/dashboard` - Dashboard
- Admin CRUD işlemleri için diğer endpoint'ler

## 🌐 Multi-Language Desteği

Desteklenen diller: Rusça, İngilizce, İtalyanca, Türkçe

## 📝 Lisans

MIT Lisansı

---

WolfTerm - E-Ticaret Çözümü
