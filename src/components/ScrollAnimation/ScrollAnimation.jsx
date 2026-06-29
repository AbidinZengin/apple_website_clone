import { useEffect, useRef } from 'react';
import styles from './ScrollAnimation.module.css';

// ─── Konfigürasyon ──────────────────────────────────────────────────────────
const FRAME_COUNT   = 120;    // 5sn × 24fps
const SCROLL_HEIGHT = '220vh'; // Scroll mesafesi (container yüksekliği)

// Frame dosyalarının yolu: /frames/frame_0001.webp ... frame_0150.webp
// public/frames/ klasörüne webp olarak at, isim formatı: frame_XXXX.webp
const getFramePath = (index) =>
  `/frames/frame_${String(index).padStart(4, '0')}.webp`;
// ────────────────────────────────────────────────────────────────────────────

export default function ScrollAnimation() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const imagesRef    = useRef([]);  // preload edilmiş Image nesneleri
  const rafRef       = useRef(null);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    /* ── Canvas boyutunu cihaz piksel oranına göre ayarla ── */
    const setupCanvas = () => {
      const dpr     = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    /*
      object-fit:cover mantığında frame çizimi
      ─────────────────────────────────────────
      Görsel, canvas'ı taşmadan tam kaplayacak şekilde merkeze hizalanır.
      Yatay veya dikey fazlalık kırpılır (cover davranışı).
    */
    const drawFrameToCover = (img) => {
      if (!img?.complete || !img.naturalWidth) return;

      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext('2d');
      const cw  = canvas.width  / dpr;
      const ch  = canvas.height / dpr;
      const ir  = img.naturalWidth / img.naturalHeight;
      const cr  = cw / ch;

      let dw, dh;
      if (ir > cr) { dh = ch; dw = dh * ir; }
      else         { dw = cw; dh = dw / ir; }

      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const renderFrame = (index) => {
      drawFrameToCover(imagesRef.current[index]);
    };

    /* ── Tüm frame'leri önceden hafızaya yükle ── */
    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = getFramePath(i + 1); // frame_0001'den başlar
      img.onload = () => {
        if (i === 0) renderFrame(0); // ilk frame hazır olur olmaz çiz
      };
      return img;
    });
    imagesRef.current = images;

    /* ── Scroll → frame index hesabı ── */
    const handleScroll = () => {
      const rect        = container.getBoundingClientRect();
      const scrolled    = -rect.top;
      const totalScroll = container.offsetHeight - window.innerHeight;
      const fraction    = Math.max(0, Math.min(1, scrolled / totalScroll));
      const frameIndex  = Math.min(
        Math.floor(fraction * FRAME_COUNT),
        FRAME_COUNT - 1
      );

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    };

    /* ── Resize: canvas yeniden ölçeklendir, mevcut frame'i yeniden çiz ── */
    const handleResize = () => {
      setupCanvas();
      handleScroll();
    };

    setupCanvas();
    handleScroll(); // mount'ta mevcut scroll pozisyonunu hesapla

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    /*
      DOM Yapısı:
        .container → SCROLL_HEIGHT yükseklikte dış kapsayıcı (scroll kancası)
        .sticky    → viewport'a sabitlenmiş 100vh katman
        <canvas>   → tüm frame'ler burada çizilir
    */
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
