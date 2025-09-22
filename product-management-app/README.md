# Product Management App

Modern Angular uygulaması ile geliştirilmiş ürün yönetim sistemi.

## 🚀 Teknolojiler

- **Angular 18** - Modern framework
- **TypeScript** - Type safety
- **Bootstrap 5** - UI framework
- **DevExtreme** - Data grid ve form bileşenleri
- **RxJS** - Reactive programming
- **SCSS** - Styling
- **Font Awesome** - İkonlar

## 🏗️ Mimari

### Lazy Loading
- **Admin Module** - Ürün yönetimi sayfaları
- **Public Module** - Login/Register sayfaları
- **Shared Module** - Ortak bileşenler (Navbar, Footer, Layout)

### Generic Yapı
- **Base Service** - HTTP işlemleri için generic servis
- **Base Response** - API yanıtları için generic model
- **Generic Interceptors** - Hata yönetimi ve auth

### Modüler Yapı
```
src/
├── app/
│   ├── admin/           # Admin modülü (lazy)
│   ├── public/          # Public modülü (lazy)
│   ├── shared/          # Paylaşılan bileşenler
│   └── core/            # Temel servisler ve modeller
```

## ⚡ Performans Optimizasyonları

- **Lazy Loading** - Sayfalar ihtiyaç duyulduğunda yüklenir
- **OnPush Change Detection** - Gereksiz render'ları önler
- **Signal-based State** - Reactive state yönetimi
- **Tree Shaking** - Kullanılmayan kodlar build'den çıkarılır
- **Bundle Splitting** - Kod parçalara ayrılır

## 🔧 Özellikler

### Ürün Yönetimi
- Ürün listesi (DevExtreme DataGrid)
- Ürün ekleme/düzenleme/silme
- Kategori ve renk yönetimi
- Dinamik breadcrumb navigasyon

### Kullanıcı Deneyimi
- Responsive tasarım
- Loading states
- Error handling
- Form validasyonları
- SweetAlert2 bildirimleri

### Güvenlik
- JWT token tabanlı auth
- Route guards
- HTTP interceptors
- CORS desteği

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server
ng serve

# Production build
ng build --configuration production
```

## 📱 Kullanım

1. **Login** - `/login` sayfasından giriş yapın
2. **Ürün Listesi** - `/admin/products` sayfasında ürünleri görüntüleyin
3. **Ürün Ekleme** - "Yeni Ürün Ekle" butonu ile ürün ekleyin
4. **Ürün Düzenleme** - Tablodaki düzenleme butonu ile ürünü güncelleyin

## 🔧 Geliştirme

### Yeni Özellik Ekleme
1. İlgili modülde component oluşturun
2. Route'u lazy loading ile ekleyin
3. Service'leri core klasöründe tanımlayın
4. Shared bileşenleri kullanın

### Stil Güncelleme
- Global stiller: `src/styles.scss`
- Component stilleri: `*.component.scss`
- Bootstrap ve DevExtreme tema desteği

## 📦 Build

```bash
# Production build
ng build --configuration production

