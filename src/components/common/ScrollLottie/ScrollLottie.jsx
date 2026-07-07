import { memo, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';
import styles from './ScrollLottie.module.css';

const clamp01 = (value) => Math.min(1, Math.max(0, value));

/**
 * Lottie tuvali. `progress` (framer-motion MotionValue, 0..1) verilirse animasyon
 * scroll-scrub modunda o değere kilitlenir; verilmezse `stillProgress` karesinde durur.
 * Çizim yalnızca kare değiştiğinde yapılır (bkz. ScrollVideoSkills §4).
 */
function ScrollLottie({ src, progress = null, stillProgress = 0.5, className = '' }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const lastFrameRef = useRef(-1);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: src,
    });
    animRef.current = anim;

    const handleLoaded = () => {
      const initial = progress ? progress.get() : stillProgress;
      const frame = Math.round((anim.totalFrames - 1) * clamp01(initial));
      lastFrameRef.current = frame;
      anim.goToAndStop(frame, true);
    };
    anim.addEventListener('DOMLoaded', handleLoaded);

    return () => {
      anim.removeEventListener('DOMLoaded', handleLoaded);
      anim.destroy();
      animRef.current = null;
      lastFrameRef.current = -1;
    };
    // progress MotionValue referansı değişmez; abonelik ayrı effect'te.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (!progress) return undefined;

    const unsubscribe = progress.on('change', (value) => {
      const anim = animRef.current;
      if (!anim || !anim.isLoaded) return;
      const frame = Math.round((anim.totalFrames - 1) * clamp01(value));
      if (frame === lastFrameRef.current) return;
      lastFrameRef.current = frame;
      anim.goToAndStop(frame, true);
    });

    return unsubscribe;
  }, [progress]);

  return <div ref={containerRef} className={`${styles.canvas} ${className}`} aria-hidden="true" />;
}

ScrollLottie.propTypes = {
  src: PropTypes.string.isRequired,
  progress: PropTypes.object,
  stillProgress: PropTypes.number,
  className: PropTypes.string,
};

export default memo(ScrollLottie);
