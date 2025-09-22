namespace product_management_backend.Constants
{
    public static class Messages
    {
        // Authentication Messages
        public const string INVALID_CREDENTIALS = "Geçersiz kullanıcı adı veya şifre";
        public const string LOGIN_SUCCESS = "Giriş başarılı";
        public const string LOGOUT_SUCCESS = "Çıkış başarılı";
        public const string TOKEN_EXPIRED = "Token süresi dolmuş";
        public const string UNAUTHORIZED_ACCESS = "Bu işlem için yetkiniz bulunmuyor";
        public const string INVALID_TOKEN = "Geçersiz token";

        // User Messages
        public const string USER_NOT_FOUND = "Kullanıcı bulunamadı";
        public const string USER_ALREADY_EXISTS = "Bu kullanıcı adı zaten kullanılıyor";
        public const string USER_CREATED_SUCCESS = "Kullanıcı başarıyla oluşturuldu";
        public const string USER_UPDATED_SUCCESS = "Kullanıcı başarıyla güncellendi";
        public const string USER_DELETED_SUCCESS = "Kullanıcı başarıyla silindi";

        // Category Messages
        public const string CATEGORY_NOT_FOUND = "Kategori bulunamadı";
        public const string CATEGORY_ALREADY_EXISTS = "Bu kategori zaten mevcut";
        public const string CATEGORY_CREATED_SUCCESS = "Kategori başarıyla oluşturuldu";
        public const string CATEGORY_UPDATED_SUCCESS = "Kategori başarıyla güncellendi";
        public const string CATEGORY_DELETED_SUCCESS = "Kategori başarıyla silindi";
        public const string CATEGORY_HAS_PRODUCTS = "Bu kategoriye ait ürünler olduğu için silinemez";

        // Color Messages
        public const string COLOR_NOT_FOUND = "Renk bulunamadı";
        public const string COLOR_ALREADY_EXISTS = "Bu renk zaten mevcut";
        public const string COLOR_CREATED_SUCCESS = "Renk başarıyla oluşturuldu";
        public const string COLOR_UPDATED_SUCCESS = "Renk başarıyla güncellendi";
        public const string COLOR_DELETED_SUCCESS = "Renk başarıyla silindi";
        public const string COLOR_HAS_VARIANTS = "Bu renge ait varyantlar olduğu için silinemez";

        // Product Messages
        public const string PRODUCT_NOT_FOUND = "Ürün bulunamadı";
        public const string PRODUCT_CREATED_SUCCESS = "Ürün başarıyla oluşturuldu";
        public const string PRODUCT_UPDATED_SUCCESS = "Ürün başarıyla güncellendi";
        public const string PRODUCT_DELETED_SUCCESS = "Ürün başarıyla silindi";
        public const string PRODUCT_HAS_VARIANTS = "Bu ürüne ait varyantlar olduğu için silinemez";

        // Product Variant Messages
        public const string PRODUCT_VARIANT_NOT_FOUND = "Ürün varyantı bulunamadı";
        public const string PRODUCT_VARIANT_ALREADY_EXISTS = "Bu ürün için bu renk zaten mevcut";
        public const string PRODUCT_VARIANT_CREATED_SUCCESS = "Ürün varyantı başarıyla oluşturuldu";
        public const string PRODUCT_VARIANT_UPDATED_SUCCESS = "Ürün varyantı başarıyla güncellendi";
        public const string PRODUCT_VARIANT_DELETED_SUCCESS = "Ürün varyantı başarıyla silindi";
        public const string INSUFFICIENT_STOCK = "Yetersiz stok";

        // Validation Messages
        public const string REQUIRED_FIELD = "Bu alan zorunludur";
        public const string INVALID_EMAIL = "Geçerli bir e-posta adresi giriniz";
        public const string INVALID_PHONE = "Geçerli bir telefon numarası giriniz";
        public const string PASSWORD_TOO_SHORT = "Şifre en az 6 karakter olmalıdır";
        public const string INVALID_PRICE = "Fiyat 0'dan büyük olmalıdır";
        public const string INVALID_STOCK = "Stok 0'dan küçük olamaz";
        public const string STRING_TOO_LONG = "Metin çok uzun";
        public const string STRING_TOO_SHORT = "Metin çok kısa";

        // General Messages
        public const string OPERATION_SUCCESS = "İşlem başarılı";
        public const string OPERATION_FAILED = "İşlem başarısız";
        public const string INTERNAL_SERVER_ERROR = "Sunucu hatası oluştu";
        public const string BAD_REQUEST = "Geçersiz istek";
        public const string NOT_FOUND = "Kayıt bulunamadı";
        public const string CONFLICT = "Çakışma oluştu";
        public const string FORBIDDEN = "Bu işlem için yetkiniz yok";
        public const string VALIDATION_ERROR = "Doğrulama hatası";
        public const string DUPLICATE_ENTRY = "Bu kayıt zaten mevcut";
        public const string FOREIGN_KEY_CONSTRAINT = "İlişkili kayıtlar olduğu için silinemez";

        // Database Messages
        public const string DATABASE_CONNECTION_ERROR = "Veritabanı bağlantı hatası";
        public const string DATABASE_OPERATION_ERROR = "Veritabanı işlem hatası";
        public const string CONSTRAINT_VIOLATION = "Kısıtlama ihlali";

        // File Upload Messages
        public const string FILE_TOO_LARGE = "Dosya çok büyük";
        public const string INVALID_FILE_TYPE = "Geçersiz dosya türü";
        public const string FILE_UPLOAD_SUCCESS = "Dosya başarıyla yüklendi";
        public const string FILE_UPLOAD_FAILED = "Dosya yükleme başarısız";
        public const string FILE_DELETE_SUCCESS = "Dosya başarıyla silindi";
        public const string FILE_DELETE_FAILED = "Dosya silme başarısız";
    }
}






