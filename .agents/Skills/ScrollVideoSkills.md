# Scroll-Triggered Canvas Frame Skills

## 1. Frame-by-Frame Canvas Control (Image Sequence)
- **Logic:** HTML5 `<video>` etiketi yerine, videonun karelerine ayrılmış resim serisini (image sequence) bir `<canvas>` elementi üzerine çizdir.
- **Implementation:** Kullanıcının kaydırma mesafesini (scroll progress) 0 ile 1 arasında bir değere dönüştür. Bu oranı toplam frame sayısıyla çarparak o an ekranda görünmesi gereken aktif `frameIndex` değerini hesapla.

## 2. Media Preloading & Memory Management
- **Preload (Kritik):** Kaydırma sırasında siyah ekran veya takılma (stutter) olmaması için tüm resim karelerini component ilk yüklendiğinde (mount) `new Image()` objeleri olarak arka planda tarayıcı önbelleğine al.
- **Cleanup:** Olası hafıza sızıntılarını (memory leak) engellemek için component ekrandan kaldırıldığında (unmount) event listener'ları ve resim dizilerini (array) temizle.

## 3. Responsive Canvas Scaling
- **Container:** `<canvas>` elementini `sticky` bir div içerisine yerleştirerek ekranda sabit kalmasını sağla.
- **Ratio:** Tarayıcı penceresi yeniden boyutlandırıldığında (`resize` event), resmin en-boy oranını (aspect ratio) bozmadan ekranı kaplaması için `ctx.drawImage()` hesaplamalarını dinamik olarak güncelle.

## 4. Sync Strategy & Render Loop
- **Smoothness:** `scroll` event'i çok hızlı tetiklendiği için çizim işlemini doğrudan bu event'in içinde yapma. Bunun yerine hesaplanan `frameIndex`'i bir state/ref içinde tut ve çizim işlemini (render) sadece `requestAnimationFrame` döngüsü içerisinde gerçekleştir.
- **Optimization:** Sadece aktif frame numarası bir öncekinden farklıysa `ctx.drawImage` fonksiyonunu çağırarak gereksiz GPU/CPU kullanımının önüne geç.