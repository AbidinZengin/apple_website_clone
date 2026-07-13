import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProductGallery.module.css';

function Arrow({ dir }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d={dir === 'prev' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Ürün görsel karuseli. `images` seçili renge göre filtrelenmiş gelir
 * (buy.service.imagesForColor). Renk değişince liste + index sıfırlanır.
 *
 * Track deseni: o rengin TÜM görselleri tek seferde DOM'a basılır (hepsi
 * eager yüklenir → kaymada takılma yok) ve track `translateX` ile kaydırılır.
 * Bu, tek tek mount/unmount'tan daha smooth ve performanslıdır.
 */
export default function ProductGallery({ images = [], colorKey }) {
  const [index, setIndex] = useState(0);

  // Renk değişince ilk kareye dön
  useEffect(() => {
    setIndex(0);
  }, [colorKey]);

  if (images.length === 0) {
    return <div className={`${styles.frame} ${styles.empty}`} aria-hidden="true" />;
  }

  const count = images.length;
  const safeIndex = Math.min(index, count - 1);
  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className={styles.gallery}>
      <div className={styles.frame}>
        <motion.div
          className={styles.track}
          // Renk değişince track remount → animasyonsuz sıfırlanır
          key={colorKey}
          initial={false}
          animate={{ x: `-${safeIndex * 100}%` }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        >
          {images.map((img) => (
            <div className={styles.slide} key={img.url}>
              <img
                src={img.url}
                alt={img.alt}
                className={`${styles.image} ${img.sortOrder <= 1 ? styles.imageLarge : ''}`}
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {count > 1 && (
          <>
            <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => go(-1)} aria-label="Previous image">
              <Arrow dir="prev" />
            </button>
            <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => go(1)} aria-label="Next image">
              <Arrow dir="next" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Image selector">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={`Image ${i + 1}`}
              className={`${styles.dot} ${i === safeIndex ? styles.dotActive : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
