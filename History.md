# Proje Geliştirme Geçmişi

## 2026-06-30 — Scroll Animation & Agent Sistemi

### Yapılanlar

#### 1. Proje GitHub'a Push Edildi
- İlk commit olan Apple Website Clone (React + Vite) remote'a gönderildi.
- Remote: `https://github.com/AbidinZengin/apple_website_clone`

#### 2. Agent Sistemi Kuruldu (`.agents/`)
- `orchestrator.md` — Şef Ajan rolü ve mimarisi tanımlandı
- `roles/` — UI Analyst, Component Developer, Motion Expert, QA Tester, Asset Researcher alt ajan rolleri
- `Skills/` — `FrontendSkills.md`, `ScrollVideoSkills.md`, `MotionGuideline.md` yetenekleri eklendi

#### 3. ScrollAnimation Component (Frame-by-Frame Canvas)
- **Yöntem:** HTML5 `<canvas>` + image frame sequence (video.currentTime yerine)
- **Neden:** `video.currentTime` scrub yaklaşımı performans sorunları (FPS düşüşü, takılma) yarattı
- **Mimari:**
  - `sticky` wrapper içinde `400vh → 220vh` scroll kancası
  - `window.devicePixelRatio` ile canvas piksel normalize
  - `object-fit: cover` mantığında özel drawImage hesabı
  - Tüm frame'ler `new Image()` ile sayfa yüklenmeden önce preload
  - `requestAnimationFrame` + `passive scroll listener` ile render
- **Frame Extraction:**
  - Kaynak: `Start_from_a_static_shot_of_th.mp4` (10 sn, 1280×720, 24fps)
  - Araç: `ffmpeg-static` + `fluent-ffmpeg` (sistem kurulumu gerektirmez)
  - Çıktı: `public/frames/frame_0001.webp` → `frame_0120.webp`
  - 5 sn × 24fps = **120 frame**, toplam **1.9 MB**
- **Dosyalar:**
  - `src/components/ScrollAnimation/ScrollAnimation.jsx`
  - `src/components/ScrollAnimation/ScrollAnimation.module.css`

#### 4. AirPods Component Denemeleri (Sonunda Kaldırıldı)
- `<video>` + `currentTime` → performans sorunu
- Canvas + Seek Gate pattern → event listener race condition
- Framer Motion çift PNG cross-fade → çalıştı ancak yerini ScrollAnimation aldı
- Tüm denemeler temizlenerek `ScrollAnimation` ile birleştirildi

#### 5. Scroll Hızı Ayarı
- `SCROLL_HEIGHT: 400vh → 220vh` — animasyon ~2× daha hızlı hissettiriyor

### Kullanılan Teknolojiler
- React + Vite
- Framer Motion v12
- ffmpeg-static + fluent-ffmpeg (dev dependency, frame extraction için)
- HTML5 Canvas API
- CSS Modules

### Konfigürasyon (ScrollAnimation.jsx)
```js
const FRAME_COUNT   = 120;    // 5sn × 24fps
const SCROLL_HEIGHT = '220vh'; // scroll mesafesi — azalt = daha hızlı animasyon
const getFramePath  = (i) => `/frames/frame_${String(i).padStart(4,'0')}.webp`;
```
