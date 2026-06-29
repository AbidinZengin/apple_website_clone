# Scroll-Triggered Video Component Skills

## 1. Frame-by-Frame Control
- **Logic:** Video süresini (duration) kullanıcının kaydırma (scroll) mesafesine eşle.
- **Implementation:** `IntersectionObserver` ile videonun ekranda olduğu alanı hesapla, `window.scrollY` değerini kullanarak videonun `currentTime` değerini güncelle.

## 2. Media Handling
- **Frames:** Başlangıç ve bitiş frame'lerini (görsel olarak) `poster` ve `final-frame` olarak tanımla.
- **Performance:** Video yüklendiğinde "flash" etkisi olmaması için ilk frame'i (poster) mutlaka preload et.

## 3. Responsive Scaling
- **Container:** Videoyu bir `sticky` div içine al.
- **Ratio:** Ekran boyutuna göre `object-fit: cover` kullanarak videonun her zaman ekranı tam doldurmasını sağla.

## 4. Sync Strategy
- **Smoothness:** Kaydırma ile video kareleri arasındaki gecikmeyi önlemek için `requestAnimationFrame` kullan.