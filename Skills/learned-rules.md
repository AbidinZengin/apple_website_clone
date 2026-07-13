# Learned Rules — Kullanıcı Tasarım Düzeltmeleri

> Protokol: Kullanıcı bir tasarım kararını düzelttiğinde, düzeltmeyi tek satırlık
> kurala indirgeyip buraya ekle. Bu dosya design-philosophy.md ve genel estetik
> içgüdüyle çeliştiğinde HER ZAMAN bu dosya kazanır.

## Kurallar

1. **Görsel zemin kaynaştırma:** Ürün görselinin "beyaz kutu" gibi ayrışmasını çözmek için blend-mode veya boyut hack'i kullanma; çerçeve arka planını görselin GERÇEK zemin rengiyle (pikselden örnekle, ör. Apple CDN `#f5f4f7`) birebir eşitle.
2. **Yatay kaynaklı ürün görseli kare çerçevede:** Telefon/ürün küçük görünüyorsa `width > 100%` değil `object-fit: cover` kullan (kenar boşluğunu kırpar); taşma sızıntısına karşı slide'a `overflow: hidden` ekle.
3. **Küçük görsel ayar isteklerinde:** Ekran görüntüsüyle doğrulamadan "düzeltildi" deme; ama kullanıcıyı uzun araç zincirleriyle de bekletme — önce değişikliği yap, doğrulamayı kısa tut.
4. **Navbar dropdown konumu:** Tetikleyici ikon en sağdaysa panel sola doğru (`right: 0`) açılır, ekranın içine doğru; genişlik `min(px, calc(100vw - 2*--space-sm))` ile viewport'a göre daralıp taşmaz ve kenardan nefes payı bırakır.
