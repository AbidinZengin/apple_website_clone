import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Highlight.module.css';

// Proje standardı spring (MotionGuideline §4) — AirPods Pro sayfasıyla aynı.
const spring = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 };


// Bölüm elemanları viewport'a girince kademeli (stagger) dahil olur.
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeRise = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: spring },
};

// Caption geçişi: hızlı açılır, yumuşak süzülerek yerleşir (Apple ease).
const captionTransition = { duration: 0.45, ease: [0.32, 0.72, 0, 1] };

// Yazının giriş yönü; çıkışta aynı yönde akmaya devam eder (enter→hold→exit).
const CAPTION_ENTER = {
  left: { x: -56, y: 0 }, // soldan girer, sağa doğru çıkar
  right: { x: 56, y: 0 }, // sağdan girer, sola doğru çıkar
  up: { x: 0, y: 40 }, // alttan yükselir, yukarı doğru çıkar
  down: { x: 0, y: -40 }, // üstten iner, aşağı doğru çıkar
};

// Sabit px caption boyutunu, KONUMU bozmadan ekrana göre küçülen akışkan bir
// değere çevirir: geniş ekranda (≈≥1024px) verilen px'te kalır (desktop birebir
// aynı), daha dar ekranda orantılı küçülür. clamp/rem/em gelirse dokunmaz.
// Böylece her sayfa tek tek clamp yazmadan generic olarak responsive olur.
function fluidCaptionSize(size) {
  if (typeof size !== 'string') return size;
  const match = size.match(/^(\d+(?:\.\d+)?)px$/);
  if (!match) return size;
  const px = parseFloat(match[1]);
  const min = Math.round(px * 0.46); // mobil taban (okunabilir kalır)
  const vw = ((px / 1024) * 100).toFixed(2); // ~1024px'te maks'a ulaşır
  return `clamp(${min}px, ${vw}vw, ${px}px)`;
}

function FilmGlyph() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.filmGlyph}>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill="currentColor" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 4L12.5 8L5.5 12V4Z" fill="currentColor" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="4.5" y="4" width="2.4" height="8" rx="1" fill="currentColor" />
      <rect x="9.1" y="4" width="2.4" height="8" rx="1" fill="currentColor" />
    </svg>
  );
}

export default function Highlight({
  title,
  filmLabel,
  filmHref,
  onWatchFilm,
  slides = [],
  autoPlayInterval = 7000,
  tone = 'dark',
  captionPosition = 'top',
  captionColor,
  captionSize,
  captionAlign,
  captionFrom = 'left',
  background,
  cardColor,
}) {
  const trackRef = useRef(null);
  const scrollRafRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const goTo = useCallback(
    (index) => {
      if (slides.length === 0) return;
      const clamped = ((index % slides.length) + slides.length) % slides.length;
      setActiveIndex(clamped);
      const card = trackRef.current?.children[clamped];
      card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    },
    [slides.length]
  );

  // Autoplay: re-armed every time the active slide changes, so a manual jump
  // (dot click or drag) naturally resets the countdown instead of drifting.
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return undefined;
    const id = window.setTimeout(() => goTo(activeIndex + 1), autoPlayInterval);
    return () => window.clearTimeout(id);
  }, [activeIndex, isPlaying, slides.length, autoPlayInterval, goTo]);

  // Canlı takip: aktif kart, scroll SÜRERKEN her frame'de güncellenir —
  // yazı animasyonu kaydırmanın bitmesini beklemez, kart kaymaya başladığı
  // anda tetiklenir. rAF ile frame başına tek hesap yapılır.
  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const track = trackRef.current;
      if (!track) return;
      let closest = 0;
      let minDistance = Infinity;
      // Merkez snap: viewport ortasına en yakın kart aktif sayılır.
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      Array.from(track.children).forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - trackCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = i;
        }
      });
      setActiveIndex(closest);
    });
  }, []);

  useEffect(() => () => {
    if (scrollRafRef.current) window.cancelAnimationFrame(scrollRafRef.current);
  }, []);

  if (slides.length === 0) return null;

  const sectionStyle = {
    ...(background != null && { background }),
    ...(cardColor != null && { '--highlight-surface': cardColor }),
  };

  return (
    <motion.section
      className={styles.highlight}
      data-tone={tone}
      aria-label={title}
      style={Object.keys(sectionStyle).length ? sectionStyle : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionVariants}
    >
      <motion.div className={styles.header} variants={fadeRise}>
        <h2 className={styles.heading}>{title}</h2>
        {(filmHref || onWatchFilm) && (
          <a className={styles.filmLink} href={filmHref ?? '#'} onClick={onWatchFilm}>
            {filmLabel}
            <FilmGlyph />
          </a>
        )}
      </motion.div>

      <div
        className={styles.track}
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={() => setIsPlaying(false)}
      >
        {slides.map((slide, i) => (
          <motion.article
            key={slide.id}
            className={styles.card}
            data-caption-position={slide.captionPosition ?? captionPosition}
            style={slide.background ? { background: slide.background } : undefined}
            variants={fadeRise}
          >
            {slide.caption && (() => {
              // Kart-özel ayarlar; verilmezse component prop'una düşer.
              const enter = CAPTION_ENTER[slide.captionFrom ?? captionFrom] ?? CAPTION_ENTER.left;
              const color = slide.captionColor ?? captionColor;
              const size = slide.captionSize ?? captionSize;
              const align = slide.captionAlign ?? captionAlign;
              // Gelen yazı geçişle aynı anda kendi yönünden girer; çıkan yazı
              // aynı yönde akarak söner (enter→hold→exit).
              return (
                <motion.p
                  className={styles.caption}
                  style={{
                    ...(color != null && { color }),
                    ...(size != null && { fontSize: fluidCaptionSize(size) }),
                    // 'left'/'right' hizada blok kenara yaslanır, ortalama kalkar.
                    ...(align === 'left' && { textAlign: 'left', margin: 0 }),
                    ...(align === 'right' && { textAlign: 'right', margin: '0 0 0 auto' }),
                    // Serbest konumlandırma: slide.captionStyle en son uygulanır,
                    // üstteki her ayarı ve CSS'teki top/bottom konumunu ezebilir.
                    ...slide.captionStyle,
                  }}
                  initial={{ opacity: 0, x: enter.x, y: enter.y }}
                  animate={
                    i === activeIndex
                      ? { opacity: 1, x: 0, y: 0, transition: captionTransition }
                      : { opacity: 0, x: -enter.x, y: -enter.y, transition: captionTransition }
                  }
                >
                  {slide.caption}
                </motion.p>
              );
            })()}
            {slide.video ? (
              <div className={styles.media}>
                {/* Dekoratif arka plan videosu; varsa slide.image poster olur. */}
                <video
                  src={slide.video}
                  poster={slide.image}
                  className={styles.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  aria-hidden="true"
                />
              </div>
            ) : (
              slide.image && (
                <div className={styles.media}>
                  {/* fit: 'contain' → görsel kırpılmaz; kart rengi zeminle kaynaşır. */}
                  <img
                    src={slide.image}
                    alt={slide.imageAlt ?? ''}
                    className={styles.image}
                    style={slide.fit ? { objectFit: slide.fit } : undefined}
                    draggable={false}
                  />
                </div>
              )
            )}
          </motion.article>
        ))}
      </div>

      <motion.div className={styles.controls} variants={fadeRise}>
        <div className={styles.dots} role="tablist" aria-label={title}>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={slide.ariaLabel ?? (typeof slide.caption === 'string' ? slide.caption : `${i + 1}`)}
              className={styles.dot}
              data-active={i === activeIndex}
              onClick={() => goTo(i)}
            >
              {i === activeIndex && (
                <span
                  className={styles.dotFill}
                  style={{
                    animationDuration: `${autoPlayInterval}ms`,
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.playToggle}
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseGlyph /> : <PlayGlyph />}
        </button>
      </motion.div>
    </motion.section>
  );
}
