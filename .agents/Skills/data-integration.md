## 1. Veri Çekme (Data Fetching) Standartları
- **İstemci Yapısı:** İsteklerde merkezi bir HTTP istemcisi (örn. Axios instance veya sarmalanmış native fetch) kullanılmalıdır. Base URL, timeout ve interceptor (interseptör) kurallarına sadık kalın.
- **Asenkron Yönetim:** Veri çekme süreçleri bileşen içinde doğrudan `useEffect` ile boğulmamalı; veri yönetim kütüphaneleri (React Query / SWR) veya amaca yönelik Custom Hook'lar (Custom Hooks) içine soyutlanmalıdır.

## 2. UI Besleme ve State Yönetimi
- **Durum Kontrolleri:** Gelen verinin yüklenme (`isLoading`), hata (`isError`) ve boş veri (`isEmpty`) durumları frontend katmanında mutlaka ele alınmalıdır.
- **İyimser Güncellemeler (Optimistic Updates):** Mutasyon işlemlerinde (POST/PUT/DELETE) kullanıcı deneyimini artırmak için gerektiğinde arayüz anında güncellenmeli, hata durumunda geri alınmalıdır (rollback).