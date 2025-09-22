# Product Management System

Modern Angular frontend ve .NET 8 backend ile geliştirilmiş tam kapsamlı ürün yönetim sistemi.

## 🚀 Sistem Genel Bakış

Bu proje, ürün yönetimi için geliştirilmiş modern bir full-stack uygulamadır. Angular 19 frontend ve .NET 8 backend teknolojileri kullanılarak oluşturulmuştur.

## 🏗️ Proje Yapısı

```
Product-Management/
├── product-management-app/          # Angular Frontend
│   ├── src/app/
│   │   ├── admin/                   # Admin modülü (lazy loading)
│   │   ├── public/                  # Public modülü (lazy loading)
│   │   ├── shared/                  # Paylaşılan bileşenler
│   │   └── core/                    # Temel servisler ve modeller
│   └── dist/                        # Production build
└── product-management-backend/       # .NET Backend API
    ├── Controllers/                 # API Controller'ları
    ├── Services/                    # İş mantığı katmanı
    ├── Repositories/                # Veri erişim katmanı
    ├── Models/                      # Entity ve DTO'lar
    ├── Data/                        # DbContext
    └── Migrations/                  # EF Core Migration'ları
```

## 🎯 Özellikler

### Frontend (Angular)
- **Modern UI/UX** - Bootstrap 5 ve DevExtreme ile responsive tasarım
- **Lazy Loading** - Performans optimizasyonu için modüler yükleme
- **JWT Authentication** - Token tabanlı güvenlik
- **Data Grid** - DevExtreme ile gelişmiş tablo yönetimi
- **Form Validation** - Kapsamlı form doğrulama
- **Error Handling** - Merkezi hata yönetimi

### Backend (.NET 8)
- **RESTful API** - Modern API tasarımı
- **JWT Security** - Token tabanlı kimlik doğrulama
- **Layered Architecture** - Repository, Service, Controller katmanları
- **Entity Framework Core** - Code First yaklaşımı
- **Swagger Documentation** - Otomatik API dokümantasyonu
- **CORS Support** - Frontend entegrasyonu

## 🔧 Teknolojiler

### Frontend Stack
- **Angular 18** - Modern framework
- **TypeScript** - Type safety
- **Bootstrap 5** - UI framework
- **DevExtreme** - Data grid ve form bileşenleri
- **RxJS** - Reactive programming
- **SCSS** - Styling
- **Font Awesome** - İkonlar

### Backend Stack
- **.NET 8** - Modern framework
- **Entity Framework Core** - ORM
- **SQL Server** - Veritabanı
- **JWT Bearer** - Authentication
- **Swagger/OpenAPI** - API dokümantasyonu

## 📊 Veritabanı Yapısı

**Entity'ler:**
- **User** - Kullanıcı bilgileri
- **Category** - Ürün kategorileri
- **Product** - Ürün bilgileri
- **Color** - Renk seçenekleri
- **ProductColor** - Ürün-Renk ilişkisi

## 🛠️ API Endpoint'leri

### Authentication
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı

### CRUD Operations
- **Categories:** `GET, POST, PUT, DELETE /api/category`
- **Products:** `GET, POST, PUT, DELETE /api/product`
- **Colors:** `GET, POST, PUT, DELETE /api/color`

## 🚀 Kurulum ve Çalıştırma

### Backend Kurulumu

1. **Connection String Güncelleme**
   ```json
   // appsettings.json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=.;Database=ProductManagementDB;Trusted_Connection=true;TrustServerCertificate=true;"
     }
   }
   ```

2. **Migration'ları Çalıştırma**
   ```bash
   cd product-management-backend
   dotnet ef database update
   ```

3. **Backend'i Başlatma**
   ```bash
   dotnet run
   ```
   Backend: `https://localhost:7000`

### Frontend Kurulumu

1. **Bağımlılıkları Yükleme**
   ```bash
   cd product-management-app
   npm install
   ```

2. **Development Server**
   ```bash
   ng serve
   ```
   Frontend: `http://localhost:4200`

3. **Production Build**
   ```bash
   ng build --configuration production
   ```

## 📱 Kullanım Kılavuzu

### 1. Sistem Girişi
- `/login` sayfasından kullanıcı girişi yapın
- Admin yetkisi ile tam erişim sağlayın

### 2. Ürün Yönetimi
- **Ürün Listesi** - `/admin/products` sayfasında tüm ürünleri görüntüleyin
- **Yeni Ürün** - "Yeni Ürün Ekle" butonu ile ürün ekleyin
- **Ürün Düzenleme** - Tablodaki düzenleme butonu ile güncelleyin
- **Ürün Silme** - Silme butonu ile ürünü kaldırın

### 3. Kategori ve Renk Yönetimi
- Kategorileri ve renkleri yönetin
- Ürünlere kategori ve renk atayın

## ⚡ Performans Optimizasyonları

### Frontend
- **Lazy Loading** - Sayfalar ihtiyaç duyulduğunda yüklenir
- **OnPush Change Detection** - Gereksiz render'ları önler
- **Signal-based State** - Reactive state yönetimi
- **Tree Shaking** - Kullanılmayan kodlar build'den çıkarılır
- **Bundle Splitting** - Kod parçalara ayrılır

### Backend
- **Repository Pattern** - Veri erişim optimizasyonu
- **DTO Pattern** - Güvenli veri transferi
- **Async/Await** - Asenkron işlemler
- **Entity Framework Core** - Optimized queries

## 🔐 Güvenlik

### Authentication & Authorization
- **JWT Bearer Token** - Kimlik doğrulama
- **Role-based Authorization** - Admin/User rolleri
- **Route Guards** - Sayfa erişim kontrolü
- **HTTP Interceptors** - Otomatik token yönetimi

### API Security
- **CORS Policy** - Frontend güvenliği
- **Global Exception Handling** - Merkezi hata yönetimi
- **Input Validation** - Veri doğrulama
- **SQL Injection Protection** - Entity Framework Core

## 🔧 Geliştirme

### Yeni Özellik Ekleme

#### Frontend
1. İlgili modülde component oluşturun
2. Route'u lazy loading ile ekleyin
3. Service'leri core klasöründe tanımlayın
4. Shared bileşenleri kullanın

#### Backend
1. Model ve DTO'ları oluşturun
2. Repository interface ve implementasyonu
3. Service interface ve implementasyonu
4. Controller ve endpoint'leri ekleyin
5. Migration oluşturun

### Stil Güncelleme
- **Global Stiller:** `src/styles.scss`
- **Component Stilleri:** `*.component.scss`
- **Bootstrap ve DevExtreme** tema desteği

## 📦 Build ve Deployment

### Frontend Build
```bash
# Production build
ng build --configuration production

# Build output: dist/product-management-app/
```

### Backend Build
```bash
# Publish
dotnet publish -c Release

# Docker (opsiyonel)
docker build -t product-management-api .
```
