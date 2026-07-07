## 1. Network Mocking (Ağ Simülasyonu)
- API testlerinde gerçek sunuculara istek atılmamalıdır. Mock Service Worker (MSW) kullanarak endpoint'ler network seviyesinde taklit (mock) edilmelidir.

## 2. Test Senaryoları Matrisi
Her endpoint entegrasyonu için en az şu 4 senaryo test edilmelidir:
1. **Success (200/201):** Doğru veri geldiğinde bileşenin veriyi doğru render etmesi.
2. **Bad Request / Validation Error (400):** Gönderilen veri hatalı olduğunda validation mesajlarının arayüzde gösterilmesi.
3. **Unauthorized / Forbidden (401/403):** Yetki hatalarında kullanıcının login'e yönlendirilmesi veya session yenileme akışının tetiklenmesi.
4. **Server Error (500):** Sunucu çöktüğünde "Hata Sayfası" veya "Toast" bildiriminin tetiklenmesi.

## 3. Araç Seti
- Testler Vitest veya Jest kütüphaneleri ile React Testing Library prensiplerine uygun, kullanıcı davranışlarını simüle edecek şekilde yazılmalıdır.