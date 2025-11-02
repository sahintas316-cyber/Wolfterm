# WolfTerm - Plesk Hosting Kurulum Rehberi

## 🎯 Plesk'te Deployment Stratejisi

Plesk'te 2 yöntem var:

### ✅ YÖNTEM 1: Hibrit Çözüm (Önerilen)
- **Frontend:** Plesk hostingde (statik dosyalar)
- **Backend:** Railway/Render'da (ücretsiz/ucuz)
- **Database:** MongoDB Atlas (ücretsiz)

### YÖNTEM 2: Tam Plesk (Daha Zor)
- Her şey Plesk'te (Python + Node.js extension gerekli)

---

## 🚀 YÖNTEM 1: Hibrit Çözüm (Kolay ve Hızlı)

### ADIM 1: MongoDB Atlas Kurulumu (5 dakika)

1. **MongoDB Atlas'a kaydolun:** https://www.mongodb.com/cloud/atlas/register

2. **Cluster oluşturun:**
   - "Create a Free Cluster" seçin
   - Region: En yakın lokasyon seçin
   - Cluster Name: `wolfterm-db`

3. **Database User oluşturun:**
   - Database Access > Add New Database User
   - Username: `wolfterm_admin`
   - Password: Güçlü bir şifre (kaydedin!)
   - Privileges: `Read and write to any database`

4. **Network Access:**
   - Network Access > Add IP Address
   - `0.0.0.0/0` (Tüm IP'ler) - Production'da daha güvenli yapın
   - Veya sadece Railway/Render IP'lerini ekleyin

5. **Connection String'i kopyalayın:**
   ```
   mongodb+srv://wolfterm_admin:SIFRENIZ@cluster0.xxxxx.mongodb.net/wolfterm?retryWrites=true&w=majority
   ```

### ADIM 2: Backend'i Railway'e Deploy (10 dakika)

1. **Railway'e gidin:** https://railway.app

2. **GitHub ile giriş yapın**

3. **New Project:**
   - "Deploy from GitHub repo"
   - WolfTerm repository'yi seçin
   - Root Directory: `/backend` seçin

4. **Environment Variables ekleyin:**
   ```
   MONGO_URL=mongodb+srv://wolfterm_admin:SIFRENIZ@cluster0.xxxxx.mongodb.net/wolfterm
   DB_NAME=wolfterm
   SECRET_KEY=BURAYA_RANDOM_KEY_GIRIN
   CORS_ORIGINS=https://yourdomain.com
   PORT=8001
   ```

5. **Start Command ayarlayın:**
   - Settings > Deploy
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

6. **Generate Domain:**
   - Settings > Networking
   - "Generate Domain" butonuna tıklayın
   - Örnek: `wolfterm-backend-production.up.railway.app`
   - **BU URL'İ KAYDEDIN!**

7. **Deploy:**
   - Otomatik deploy olacak
   - Logs'dan kontrol edin

### ADIM 3: Frontend'i Plesk'e Deploy (15 dakika)

#### 3.1. Frontend Build'i Hazırlama (Bilgisayarınızda)

```bash
cd wolfterm-website/frontend

# .env dosyasını düzenle
nano .env
```

`.env` içeriği:
```
REACT_APP_BACKEND_URL=https://wolfterm-backend-production.up.railway.app
```

```bash
# Build al
yarn install
yarn build
```

`build/` klasörü oluşacak.

#### 3.2. Plesk'e Yükleme

1. **Plesk'e giriş yapın**

2. **Domain'i seçin** (örn: yourdomain.com)

3. **File Manager'a gidin**

4. **httpdocs veya public_html klasörüne gidin**

5. **Build klasörünün içindekileri yükleyin:**
   - `build/` klasöründeki TÜM dosyaları seçin
   - Upload edin (FTP veya Plesk File Manager)
   - Klasör yapısı şöyle olmalı:
   ```
   httpdocs/
   ├── index.html
   ├── asset-manifest.json
   ├── favicon.ico
   ├── manifest.json
   ├── robots.txt
   └── static/
       ├── css/
       ├── js/
       └── media/
   ```

#### 3.3. .htaccess Oluştur (React Router için)

Plesk File Manager'da `httpdocs/.htaccess` dosyası oluşturun:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### ADIM 4: SSL Sertifikası (Plesk)

1. **Plesk'te domain'e gidin**
2. **SSL/TLS Certificates**
3. **Let's Encrypt** seçin
4. **Install** butonuna tıklayın
5. HTTPS'i zorunlu kılmak için:
   - Hosting Settings
   - "Permanent SEO-safe 301 redirect from HTTP to HTTPS" seçin

### ADIM 5: Test Edin!

1. **Frontend:** https://yourdomain.com
2. **Admin:** https://yourdomain.com/admin/login (admin/admin123)

---

## 🔧 YÖNTEM 2: Tam Plesk Kurulumu (İleri Seviye)

Eğer Plesk'te Python desteği varsa:

### Gereksinimler Kontrolü

1. **Plesk Extensions'a gidin**
2. **Python** extension'ı yükleyin
3. **Node.js** extension'ı yükleyin (frontend build için)

### Backend Kurulumu

1. **Python Application oluştur:**
   - Domains > yourdomain.com > Python
   - Python version: 3.11+
   - Application root: `/backend`
   - Application URL: `/api`
   - Application startup file: `server:app`

2. **Environment Variables:**
   ```
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=wolfterm
   SECRET_KEY=your-secret-key
   ```

3. **MongoDB Kurulumu:**
   - Plesk Extensions > MongoDB (varsa)
   - Yoksa: SSH ile manuel kurulum gerekli

### Frontend Kurulumu

Yukarıdaki YÖNTEM 1'in ADIM 3'ü ile aynı.

---

## 📝 Güncelleme Nasıl Yapılır?

### Frontend Güncellemesi

1. Bilgisayarınızda:
   ```bash
   cd frontend
   git pull
   yarn build
   ```

2. `build/` klasörünü Plesk'e yeniden yükleyin

### Backend Güncellemesi (Railway)

```bash
git add .
git commit -m "Update"
git push origin main
```

Railway otomatik deploy eder.

---

## 🎯 Önerilen Yapılandırma

```
┌─────────────────────────────────────┐
│  yourdomain.com (Plesk)             │
│  ├── Frontend (React Build)         │
│  └── .htaccess (Router yapılandırma)│
└─────────────────────────────────────┘
              ↓ API Çağrıları
┌─────────────────────────────────────┐
│  Railway Backend                    │
│  https://wolfterm.railway.app/api   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  MongoDB Atlas (Cloud Database)     │
└─────────────────────────────────────┘
```

---

## 💰 Maliyet

- **Plesk Hosting:** Zaten var ✅
- **Railway Backend:** $5/ay (veya 500 saat/ay ücretsiz)
- **MongoDB Atlas:** Ücretsiz (512MB'a kadar)

**Toplam Ekstra Maliyet:** ~$0-5/ay

---

## 🐛 Sorun Giderme

### "API bağlanamıyor" Hatası

**Çözüm 1:** Railway URL'ini kontrol edin
```bash
# frontend/.env
REACT_APP_BACKEND_URL=https://DOGRU-RAILWAY-URL.railway.app
```

**Çözüm 2:** CORS ayarları
Railway'de environment variable:
```
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### "Cannot GET /admin" Hatası

`.htaccess` dosyasının doğru olduğundan emin olun.

### "500 Internal Server Error"

Plesk Error Logs kontrol edin:
- Logs > Error Log

---

## 📞 Yardım Gerekirse

1. Railway Logs: `railway logs`
2. MongoDB Atlas Metrics kontrol edin
3. Plesk Error Logs kontrol edin

---

## ✅ Checklist

- [ ] MongoDB Atlas cluster oluşturuldu
- [ ] Railway'de backend deploy edildi
- [ ] Frontend build alındı
- [ ] Plesk'e frontend yüklendi
- [ ] .htaccess oluşturuldu
- [ ] SSL sertifikası yüklendi
- [ ] Site test edildi
- [ ] Admin paneli çalışıyor

Başarılar! 🚀
