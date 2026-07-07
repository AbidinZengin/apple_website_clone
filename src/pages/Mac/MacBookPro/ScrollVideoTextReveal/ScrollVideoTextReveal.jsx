import { memo, useEffect, useId, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SCROLL_VIDEO_TEXT_REVEAL } from './scrollVideoTextReveal.data';
import styles from './ScrollVideoTextReveal.module.css';

const { videoSrc, word,word2, eyebrow, supportingCopy } = SCROLL_VIDEO_TEXT_REVEAL;

const spring = { stiffness: 120, damping: 22, mass: 0.9 };

// Maske, sticky kapsayıcının gerçek piksel boyutunda kurulur (userSpaceOnUse) —
// yüzde tabanlı SVG mask koordinatlarının taraycılar arası tutarsız
// ölçeklenmesinden kaçınmak için en güvenilir yöntem budur.
function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}

function ScrollVideoTextReveal() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const maskId = useId();
  const [videoReady, setVideoReady] = useState(false);

  const { width, height } = useElementSize(stickyRef);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Maske: geniş dikdörtgen (tam ekran video) -> devasa metin (video sadece harflerin içinde).
  // Referans posterdeki gibi ("OCEAN SURF SEA") harfler kenardan kenara, çerçeveyi
  // dolduracak kadar büyük olmalı — bu yüzden font-size kapsayıcı GENİŞLİĞE göre hesaplanır.
  const finalFontSize = width ? (width * 0.94) / (word.length * 0.72) : 260;
  const rectOpacity = useTransform(scrollYProgress, [0, 0.55, 0.7], [1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const rawFontSize = useTransform(
    scrollYProgress,
    [0.3, 0.78],
    [finalFontSize * 0.22, finalFontSize],
  );
  const fontSize = useSpring(rawFontSize, spring);

  // Video, arka planda çok hafifçe "yerleşerek" küçülür — asıl küçülme hissi maskeden gelir.
  const rawVideoScale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);
  const videoScale = useSpring(rawVideoScale, spring);

  const rawCopyOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const rawCopyY = useTransform(scrollYProgress, [0.82, 0.97], [20, 0]);
  const copyOpacity = useSpring(rawCopyOpacity, spring);
  const copyY = useSpring(rawCopyY, spring);

  const maskReady = width > 0 && height > 0;

  return (
    <section ref={wrapperRef} className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.backdrop} />

        <motion.video
          className={`${styles.video} ${videoReady ? '' : styles.videoPending}`}
          style={{
            scale: videoScale,
            maskImage: maskReady ? `url(#${maskId})` : 'none',
            WebkitMaskImage: maskReady ? `url(#${maskId})` : 'none',
          }}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
        />

        {maskReady && (
          <svg className={styles.maskDefs} aria-hidden="true">
            <defs>
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                maskContentUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={width}
                height={height}
              >
                <motion.rect
                  x="0"
                  y="0"
                  width={width}
                  height={height}
                  fill="#fff"
                  style={{ opacity: rectOpacity }}
                />
                <motion.text
                  x={width / 2}
                  y={height * 0.53}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontWeight="800"
                  style={{ opacity: textOpacity, fontSize }}
                >
                  {word}
                  {word2}

                </motion.text>
              </mask>
            </defs>
          </svg>
        )}

        <motion.div className={styles.copy} style={{ opacity: copyOpacity, y: copyY }}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <p className={styles.supportingCopy}>{supportingCopy}</p>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ScrollVideoTextReveal);
