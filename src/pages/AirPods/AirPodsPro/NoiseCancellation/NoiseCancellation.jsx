import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollLottie from '../../../../components/common/ScrollLottie';
import { LOTTIES, NOISE_CANCELLATION } from '../airpodsPro.data';
import styles from './NoiseCancellation.module.css';

const spring = { stiffness: 170, damping: 24, mass: 0.9 };
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { type: 'spring', ...spring },
};

/**
 * ANC'nin pinned animasyonu artık EarTips'teki birleşik sahnenin 4. katmanı;
 * burada yalnızca tanıtım paragrafı + özellik kolonları kalır.
 */
export default function NoiseCancellation() {
  const splitRef = useRef(null);
  const { scrollYProgress: splitProgress } = useScroll({
    target: splitRef,
    offset: ['start end', 'end start'],
  });
  // Özellik kolonu geçerken AirPod hafifçe döner (referansta statik; kural: scrub tercih edilir).
  // explode-tips'in ilk kareleri = parlak, birleşik tek AirPod.
  const flipProgress = useTransform(splitProgress, [0.15, 0.85], [0.02, 0.2]);

  return (
    <section className={styles.section}>
      <motion.p className={styles.intro} {...reveal}>
        {NOISE_CANCELLATION.intro}
      </motion.p>

      <div ref={splitRef} className={styles.split}>
        <div className={styles.sideStage}>
          <ScrollLottie src={LOTTIES.explodeTips} progress={flipProgress} />
        </div>
        <div className={styles.features}>
          {NOISE_CANCELLATION.features.map((feature) => (
            <motion.p key={feature.text} className={styles.feature} {...reveal}>
              {feature.text}
              {feature.accent && <span className={styles.accent}>{feature.accent}</span>}
              {feature.suffix}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
