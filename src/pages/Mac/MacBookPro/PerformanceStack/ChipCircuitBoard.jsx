import { memo } from 'react';
import { motion, useMotionTemplate } from 'framer-motion';
import circuitSparse from '../../../../assets/circuit-sparse.png';
import circuitMedium from '../../../../assets/circuit-medium.png';
import circuitDense from '../../../../assets/circuit-dense.png';
import styles from './PerformanceStack.module.css';

const ICON_SRC = { M5: circuitSparse, M5Pro: circuitMedium, M5Max: circuitDense };

// İkonlar hazır prototip (tam çizilmiş devre) — burada yeniden "büyütülmüyor",
// sadece rengi değişiyor. invert(1) hue-rotate(...) beyaz zemini siyaha, rengi
// kendi orijinal tonuna döndürür (klasik "dark-mode icon" tekniği); mix-blend-mode:
// screen ile artık siyah olan zemin, sahnenin siyahına görünmez şekilde karışır.
// hueRotate katmanlar arasında PAYLAŞILAN, tek ve sürekli bir motion value (bkz.
// PerformanceStack.jsx) — hangi katman üstte olursa olsun ton aynı anda aynı
// değerde olur, katman değişince renk sıçramaz. Sadece opacity + filter animasyonu
// var; mask-image tabanlı reveal kaldırıldı çünkü her frame'de radial-gradient
// yeniden hesaplanıp rasterize edilmesi gereksiz yere pahalıydı.
function ChipCircuitBoard({ variant, intensity, hueRotate, style }) {
  const filter = useMotionTemplate`invert(1) hue-rotate(${hueRotate}deg) saturate(1.5) brightness(1.15)`;

  return (
    <motion.div className={styles.board} style={{ ...style, willChange: 'opacity' }}>
      <div className={styles.boardTilt}>
        <motion.div
          className={styles.circuitIcon}
          style={{
            backgroundImage: `url(${ICON_SRC[variant]})`,
            filter,
            opacity: intensity,
          }}
        />
        <div className={`${styles.label} ${styles[`label${variant}`]}`} />
      </div>
    </motion.div>
  );
}

export default memo(ChipCircuitBoard);
