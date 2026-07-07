## 1. Tip Güvenliği ve Tip Eşleme (Mapping)
- **DTO Ayrımı:** Backend'den gelen ham veri yapısı (Response DTO) ile frontend'in arayüzde tüketeceği veri yapısı aynı olmak zorunda değildir. Gelen veriyi UI dostu modellere dönüştüren saf fonksiyonlar (mappers) yaz.
- **TypeScript Interface/Type:** Her API yanıtı ve isteği için katı TypeScript tipleri tanımlanmalıdır. `any` kullanımı kesinlikle yasaktır.

## 2. Çalışma Zamanı (Runtime) Doğrulaması
- **Şema Kontrolü:** Kritik API yanıtları için Zod (veya benzeri bir şema doğrulayıcı) kullanılarak çalışma zamanında JSON format kontrolü yapılmalıdır.
- **Hata Yakalama:** Eğer API'den gelen veri beklenen şemaya uymuyorsa (malformed JSON veya eksik field), uygulama çökmek yerine bu durumu yakalamalı, loglamalı ve kullanıcıya anlamlı bir arayüz göstermelidir.