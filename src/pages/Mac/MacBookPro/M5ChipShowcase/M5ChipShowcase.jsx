import { memo, useCallback, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import chipLineupSrc from '../../../../assets/m5-chip-lineup.jpg';
import { M5_CHIP_SHOWCASE } from './m5ChipShowcase.data';
import styles from './M5ChipShowcase.module.css';

const { frameCount: FRAME_COUNT, stages: STAGES, tagline: TAGLINE } = M5_CHIP_SHOWCASE;

// Kaynak görsel: M5 / M5 Pro / M5 Max çip render'ları yan yana, tek karede (2520x1360).
// Her çip kutusunun merkezi ve kare kırpma penceresi, kaynaktaki gerçek yerleşime göre ölçüldü.
const CROP_SIZE = 560;
const TILE_CENTERS = [
  { x: 630, y: 662 }, // M5
  { x: 1260, y: 662 }, // M5 Pro
  { x: 1890, y: 662 }, // M5 Max
];

// Metin aşamalarıyla birebir aynı eşik değerlerinde (0.30-0.36, 0.62-0.70) durur ve kayar,
// böylece görsel her zaman o an gösterilen çiple senkron kalır.
function stageProgressFromScroll(progress) {
  if (progress <= 0.3) return 0;
  if (progress <= 0.36) return (progress - 0.3) / 0.06;
  if (progress <= 0.62) return 1;
  if (progress <= 0.7) return 1 + (progress - 0.62) / 0.08;
  return 2;
}

function drawChip(ctx, width, height, progress, image) {
  ctx.clearRect(0, 0, width, height);
  if (!image || !image.complete || image.naturalWidth === 0) return;

  const stage = stageProgressFromScroll(progress);
  const i0 = Math.min(Math.floor(stage), 1);
  const i1 = i0 + 1;
  const t = stage - i0;

  const cx = TILE_CENTERS[i0].x + (TILE_CENTERS[i1].x - TILE_CENTERS[i0].x) * t;
  const cy = TILE_CENTERS[i0].y + (TILE_CENTERS[i1].y - TILE_CENTERS[i0].y) * t;
  const half = CROP_SIZE / 2;

  ctx.drawImage(
    image,
    cx - half,
    cy - half,
    CROP_SIZE,
    CROP_SIZE,
    0,
    0,
    width,
    height,
  );
}

function useCanvasSize(canvasRef, sizeRef, onResize) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { width, height };
      onResize();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef, sizeRef, onResize]);
}

function M5ChipShowcase() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const frameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const drawCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = sizeRef.current;
    if (!width || !height) return;
    drawChip(
      canvas.getContext('2d'),
      width,
      height,
      frameRef.current / (FRAME_COUNT - 1),
      imageRef.current,
    );
  }, []);

  useCanvasSize(canvasRef, sizeRef, drawCurrentFrame);

  // Tek görseli mount'ta önceden yükle; yüklenince mevcut kareyi çiz.
  useEffect(() => {
    const image = new Image();
    image.src = chipLineupSrc;
    image.onload = () => {
      imageRef.current = image;
      drawCurrentFrame();
    };
    imageRef.current = image;
    return () => {
      image.onload = null;
    };
  }, [drawCurrentFrame]);

  // Scroll pozisyonunu frame index'e eşle (sadece ref'e yaz — doğrudan burada çizim yapma).
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      frameRef.current = Math.round(value * (FRAME_COUNT - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Gerçek çizim işlemi sadece requestAnimationFrame döngüsünde, frame değiştiyse yapılır.
  useEffect(() => {
    let rafId;
    const loop = () => {
      if (frameRef.current !== lastDrawnFrameRef.current) {
        drawCurrentFrame();
        lastDrawnFrameRef.current = frameRef.current;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Tipografi: M5. ---
  const m5Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33], [1, 1, 0]);
  const m5Blur = useTransform(scrollYProgress, [0.28, 0.33], [0, 8]);
  const m5Filter = useTransform(m5Blur, (v) => `blur(${v}px)`);

  // --- Tipografi: M5 Pro. ---
  const m5ProOpacity = useTransform(scrollYProgress, [0.3, 0.36, 0.62, 0.66], [0, 1, 1, 0]);
  const m5ProBlur = useTransform(scrollYProgress, [0.62, 0.66], [0, 8]);
  const m5ProFilter = useTransform(m5ProBlur, (v) => `blur(${v}px)`);

  // --- Tipografi: M5 Max. (spring fiziğiyle sahneye giriş) ---
  const m5MaxRawOpacity = useTransform(scrollYProgress, [0.64, 0.72], [0, 1]);
  const m5MaxRawY = useTransform(scrollYProgress, [0.64, 0.74], [28, 0]);
  const m5MaxRawScale = useTransform(scrollYProgress, [0.64, 0.74], [0.9, 1]);
  const m5MaxOpacity = useSpring(m5MaxRawOpacity, { stiffness: 220, damping: 24, mass: 0.8 });
  const m5MaxY = useSpring(m5MaxRawY, { stiffness: 220, damping: 20, mass: 0.8 });
  const m5MaxScale = useSpring(m5MaxRawScale, { stiffness: 220, damping: 20, mass: 0.8 });

  return (
    <section ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <div className={styles.canvasStage}>
          <div className={styles.canvasBox}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>
        </div>

        <div className={styles.textStage}>
          <motion.h2
            className={styles.title}
            style={{ opacity: m5Opacity, filter: m5Filter }}
          >
            {STAGES[0].label}
          </motion.h2>
          <motion.h2
            className={styles.title}
            style={{ opacity: m5ProOpacity, filter: m5ProFilter }}
          >
            {STAGES[1].label}
          </motion.h2>
          <motion.h2
            className={styles.title}
            style={{ opacity: m5MaxOpacity, y: m5MaxY, scale: m5MaxScale }}
          >
            {STAGES[2].label}
          </motion.h2>
        </div>

        <p className={styles.tagline}>{TAGLINE}</p>
      </div>
    </section>
  );
}

export default memo(M5ChipShowcase);
