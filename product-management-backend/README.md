# Product Management Backend API

.NET 8 ile geliştirilmiş ürün yönetimi API'si. JWT authentication, katmanlı mimari ve Entity Framework Core kullanılarak oluşturulmuştur.

## 🚀 Özellikler

- **JWT Authentication** - Token tabanlı güvenlik
- **Katmanlı Mimari** - Repository, Service, Controller katmanları
- **Entity Framework Core** - Code First yaklaşımı
- **DTO Pattern** - Güvenli veri transferi
- **Swagger UI** - API dokümantasyonu
- **CORS Desteği** - Frontend entegrasyonu

## 🏗️ Proje Yapısı

```
├── Controllers/     # API Controller'ları
├── Services/        # İş mantığı katmanı
├── Repositories/    # Veri erişim katmanı
├── Models/          # Entity ve DTO'lar
├── Data/            # DbContext
├── Migrations/      # EF Core Migration'ları
└── Middleware/      # Global Exception Handling
```

## 🔐 Güvenlik

- **JWT Bearer Token** - Kimlik doğrulama
- **Role-based Authorization** - Admin/User rolleri
- **CORS Policy** - Frontend güvenliği
- **Global Exception Handling** - Merkezi hata yönetimi

## 📊 Veritabanı

**Entity'ler:**
- User (Kullanıcılar)
- Category (Kategoriler)
- Product (Ürünler)
- Color (Renkler)
- ProductColor (Ürün-Renk ilişkisi)

**Migration'lar:** Code First yaklaşımı ile veritabanı yönetimi

## 🛠️ API Endpoint'leri

### Authentication
- `POST /api/auth/login` - Giriş
- `POST /api/auth/register` - Kayıt

### CRUD Operations
- **Categories:** `GET, POST, PUT, DELETE /api/category`
- **Products:** `GET, POST, PUT, DELETE /api/product`
- **Colors:** `GET, POST, PUT, DELETE /api/color`

**Not:** PUT işlemleri için ID, request body'de gönderilir.

## 🔧 Teknolojiler

- .NET 8
- Entity Framework Core
- SQL Server
- JWT Bearer
- Swagger/OpenAPI

## 🚀 Kurulum

1. Connection string'i güncelleyin
2. Migration'ları çalıştırın:
   ```bash
   dotnet ef database update
   ```
3. Projeyi başlatın:
   ```bash
   dotnet run
   ```


## 📝 Katmanlı Mimari

- **Repository Layer:** Veri erişim işlemleri
- **Service Layer:** İş mantığı ve validasyon
- **Controller Layer:** HTTP istekleri ve response'lar
- **DTO Pattern:** Entity-DTO dönüşümleri
