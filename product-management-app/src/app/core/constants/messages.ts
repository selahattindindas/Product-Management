/**
 * Uygulama genelinde kullanılan temel mesaj sabitleri
 */

export class AppMessages {
  // Temel mesajlar
  static readonly SUCCESS = 'İşlem başarıyla gerçekleşti.';
  static readonly SESSION_EXPIRED = 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
  static readonly SERVER_ERROR = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  static readonly UNEXPECTED_ERROR = 'Beklenmeyen bir hata oluştu.';
  static readonly NETWORK_ERROR = 'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.';
  static readonly CONNECTION_ERROR = 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.';
  static readonly GENERIC_ERROR = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';

  // Validation Messages
  static readonly VALIDATION = {
    REQUIRED: {
      FULL_NAME: 'Ad soyad alanı zorunludur',
      EMAIL: 'E-posta alanı zorunludur',
      PASSWORD: 'Şifre alanı zorunludur',
      PRODUCT_NAME: 'Ürün adı alanı zorunludur',
      PRICE: 'Fiyat alanı zorunludur',
      CATEGORY: 'Kategori seçimi zorunludur',
      COLOR: 'En az bir renk seçiniz'
    },
    MAX_LENGTH: {
      DESCRIPTION: 'Açıklama en fazla 500 karakter olabilir'
    }
  };
}
