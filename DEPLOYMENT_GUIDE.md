# WolfTerm Website - Deployment Rehberi

## 🚀 Hosting Seçenekleri

### Seçenek 1: VPS/Cloud Server (DigitalOcean, Linode, AWS EC2)
**Tavsiye Edilen** - Tam kontrol, MongoDB dahil her şey tek sunucuda

### Seçenek 2: Platform as a Service (Heroku, Railway, Render)
Kolay kurulum ama MongoDB ayrı olmalı

### Seçenek 3: Vercel (Frontend) + Railway/Render (Backend)
Frontend ve Backend ayrı host edilir

---

## 📦 SEÇENEK 1: VPS/Cloud Server (En Popüler)

### Gereksinimler
- Ubuntu 22.04 LTS sunucu
- En az 2GB RAM
- 20GB disk alanı
- Root/sudo erişimi

### Adım 1: Sunucuya Bağlanın

```bash
ssh root@SUNUCU_IP_ADRESI
```

### Adım 2: Sistem Güncellemesi

```bash
sudo apt update
sudo apt upgrade -y
```

### Adım 3: Gerekli Yazılımları Kurun

```bash
# Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Yarn
npm install -g yarn

# Python 3.11
sudo apt install -y python3.11 python3.11-venv python3-pip

# MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# MongoDB'yi başlat
sudo systemctl start mongod
sudo systemctl enable mongod

# Nginx (Web server)
sudo apt install -y nginx

# PM2 (Process manager)
npm install -g pm2
```

### Adım 4: Projeyi Klonlayın

```bash
cd /var/www
git clone https://github.com/KULLANICI_ADINIZ/wolfterm-website.git
cd wolfterm-website
```

### Adım 5: Backend Kurulumu

```bash
cd /var/www/wolfterm-website/backend

# Virtual environment oluştur
python3.11 -m venv venv
source venv/bin/activate

# Paketleri yükle
pip install -r requirements.txt

# .env dosyası oluştur
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=wolfterm
SECRET_KEY=$(openssl rand -hex 32)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
EOF

# Veritabanını seed'le
python -c "
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from seed_data import seed_database

async def main():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['wolfterm']
    await seed_database(db)
    client.close()

asyncio.run(main())
"
```

### Adım 6: Backend PM2 ile Çalıştır

```bash
# PM2 ecosystem dosyası oluştur
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'wolfterm-backend',
    script: 'venv/bin/uvicorn',
    args: 'server:app --host 0.0.0.0 --port 8001',
    cwd: '/var/www/wolfterm-website/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOF

# PM2 ile başlat
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Adım 7: Frontend Kurulumu

```bash
cd /var/www/wolfterm-website/frontend

# Paketleri yükle
yarn install

# .env dosyası oluştur
cat > .env << EOF
REACT_APP_BACKEND_URL=https://yourdomain.com
EOF

# Production build
yarn build
```

### Adım 8: Nginx Konfigürasyonu

```bash
sudo nano /etc/nginx/sites-available/wolfterm
```

Aşağıdaki içeriği yapıştırın:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (React build)
    location / {
        root /var/www/wolfterm-website/frontend/build;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Nginx'i etkinleştir:

```bash
sudo ln -s /etc/nginx/sites-available/wolfterm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Adım 9: SSL (HTTPS) Kurulumu

```bash
# Certbot kur
sudo apt install -y certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Otomatik yenileme
sudo certbot renew --dry-run
```

### Adım 10: Güvenlik Duvarı

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 📦 SEÇENEK 2: Vercel (Frontend) + Railway (Backend)

### Frontend (Vercel)

1. **Vercel'e kaydolun:** https://vercel.com

2. **GitHub repo'nuzu bağlayın**

3. **Build ayarları:**
   - Framework: Create React App
   - Build Command: `cd frontend && yarn build`
   - Output Directory: `frontend/build`

4. **Environment Variables:**
   ```
   REACT_APP_BACKEND_URL=https://your-backend.railway.app
   ```

5. **Deploy edin**

### Backend (Railway)

1. **Railway'e kaydolun:** https://railway.app

2. **New Project > Deploy from GitHub**

3. **MongoDB ekleyin:**
   - Add Service > Database > MongoDB

4. **Environment Variables:**
   ```
   MONGO_URL=${{MongoDB.MONGO_URL}}
   DB_NAME=wolfterm
   SECRET_KEY=your-secret-key-here
   ```

5. **Start Command:** `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`

---

## 📦 SEÇENEK 3: Shared Hosting (cPanel)

### Sınırlamalar
- MongoDB desteği olmayabilir (MongoDB Atlas kullanın)
- Backend için Python desteği gerekli
- Frontend statik dosyalar olarak yüklenebilir

### Adımlar

1. **MongoDB Atlas** (Ücretsiz): https://www.mongodb.com/cloud/atlas

2. **Frontend Build:**
   ```bash
   cd frontend
   yarn build
   ```
   
3. **Build klasörünü cPanel'e yükle** (public_html/)

4. **Backend için** Python desteği olan hosting seçin veya backend'i Railway'e deploy edin

---

## 🔧 Güncelleme Nasıl Yapılır?

### VPS'de Güncelleme

```bash
cd /var/www/wolfterm-website
git pull origin main

# Backend güncelleme
cd backend
source venv/bin/activate
pip install -r requirements.txt
pm2 restart wolfterm-backend

# Frontend güncelleme
cd ../frontend
yarn install
yarn build
```

### Vercel/Railway'de Güncelleme

Git push yaptığınızda otomatik deploy olur:
```bash
git add .
git commit -m "Update"
git push origin main
```

---

## 📊 Performans Optimizasyonu

### 1. Nginx Caching
```nginx
# Nginx config'e ekle
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;

location /api {
    proxy_cache my_cache;
    proxy_cache_valid 200 10m;
    # ... diğer ayarlar
}
```

### 2. Gzip Compression
```nginx
# /etc/nginx/nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### 3. MongoDB İndeksler
```python
# Backend'de
await db.products.create_index([("name", "text"), ("description", "text")])
await db.products.create_index("category")
```

---

## 🐛 Sorun Giderme

### Backend çalışmıyor
```bash
# Logları kontrol et
pm2 logs wolfterm-backend

# Manuel başlat
cd /var/www/wolfterm-website/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
```

### MongoDB bağlanamıyor
```bash
# MongoDB durumunu kontrol et
sudo systemctl status mongod

# MongoDB loglarını gör
sudo tail -f /var/log/mongodb/mongod.log
```

### Nginx hataları
```bash
# Nginx test
sudo nginx -t

# Nginx logları
sudo tail -f /var/log/nginx/error.log
```

---

## 💰 Maliyet Tahmini

### VPS (DigitalOcean/Linode)
- Basic Droplet: $6-12/ay
- Domain: $10-15/yıl
- **Toplam: ~$7-15/ay**

### Vercel + Railway
- Vercel (Frontend): Ücretsiz
- Railway (Backend): $5/ay
- MongoDB Atlas: Ücretsiz
- **Toplam: ~$5/ay**

### Shared Hosting
- Hosting: $3-10/ay
- MongoDB Atlas: Ücretsiz
- **Toplam: ~$3-10/ay**

---

## 🎯 Önerilen Seçim

**Başlangıç:** Vercel + Railway (Kolay, ucuz)
**Orta:** DigitalOcean Droplet (Daha fazla kontrol)
**Profesyonel:** AWS/Google Cloud (Ölçeklenebilir)

---

## 📞 Yardım İçin

- DigitalOcean Docs: https://docs.digitalocean.com
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

İyi şanslar! 🚀
