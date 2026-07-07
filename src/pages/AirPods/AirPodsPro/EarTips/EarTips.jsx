import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import ScrollLottie from '../../../../components/common/ScrollLottie';
import { COMFORT, LOTTIES, NOISE_CANCELLATION } from '../airpodsPro.data';
import styles from './EarTips.module.css';

const spring = { stiffness: 170, damping: 24, mass: 0.9 };

/**
 * Tek pinned sahne, iç içe DÖRT animasyon: adam (head) → dönen AirPod (flip)
 * → uçların patlaması (explode-tips) → ANC dönüşü (flip-nc). Katmanlar aynı
 * sticky viewport içinde crossfade ile devir teslim yapar; geçiş anlarında
 * ilgili metinler ekrana gelir ("Arrival of the fittest.", ANC başlığı).
 */
export default function EarTips() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Katman 1: adam sahnesi — finalinde adam kararır, kulaktaki AirPod parlak kalır.
  const headOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05, 0.22, 0.27], [0, 1, 1, 0]),
    spring
  );
  const headLottieProgress = useTransform(scrollYProgress, [0.02, 0.24], [0, 1]);

  // Katman 2: dönen tek AirPod (köprü) — adam sahnesinin içinden çıkar.
  const flipOpacity = useSpring(
    useTransform(scrollYProgress, [0.22, 0.27, 0.4, 0.45], [0, 1, 1, 0]),
    spring
  );
  const flipLottieProgress = useTransform(scrollYProgress, [0.24, 0.42], [0, 1]);

  // Katman 3: uçların patlaması — flip'in bittiği pozdan devralır.
  const tipsOpacity = useSpring(
    useTransform(scrollYProgress, [0.42, 0.47, 0.66, 0.71], [0, 1, 1, 0]),
    spring
  );
  const tipsLottieProgress = useTransform(scrollYProgress, [0.44, 0.62], [0, 1]);

  // Katman 4: ANC dönüşü (flip-nc) — uç patlamasının sonundan dönüşür;
  // karanlık ilk kareler atlanır (0.2 offset).
  const ancOpacity = useSpring(useTransform(scrollYProgress, [0.68, 0.74], [0, 1]), spring);
  const ancLottieProgress = useTransform(scrollYProgress, [0.7, 0.96], [0.2, 1]);

  // Sahne bütün pin boyunca yumuşakça büyür.
  const stageScale = useSpring(useTransform(scrollYProgress, [0.05, 0.95], [0.92, 1.1]), spring);

  // Sol metin kolonu: Comfort başlığı adam sahnesi OYNARKEN belirir.
  const headerOpacity = useSpring(
    useTransform(scrollYProgress, [0.05, 0.1, 0.18, 0.23], [0, 1, 1, 0]),
    spring
  );
  const caption1Opacity = useSpring(
    useTransform(scrollYProgress, [0.46, 0.51, 0.57, 0.62], [0, 1, 1, 0]),
    spring
  );
  const caption2Opacity = useSpring(
    useTransform(scrollYProgress, [0.58, 0.62, 0.66, 0.7], [0, 1, 1, 0]),
    spring
  );

  // Boyut etiketleri uçlar ayrışınca belirir (tips katmanının içinde).
  const labelsOpacity = useSpring(useTransform(scrollYProgress, [0.52, 0.58], [0, 1]), spring);
  const labelsY = useSpring(useTransform(scrollYProgress, [0.52, 0.58], [16, 0]), spring);

  // ANC başlığı: 3.→4. animasyon dönüşümü SIRASINDA ekrana gelir.
  const ancHeaderOpacity = useSpring(
    useTransform(scrollYProgress, [0.66, 0.72, 0.8, 0.85], [0, 1, 1, 0]),
    spring
  );
  const ancHeaderY = useSpring(useTransform(scrollYProgress, [0.66, 0.72], [32, 0]), spring);

  // ANC anlatım overlay'leri: flip-nc oynarken üzerinden akar.
  const overlay1Opacity = useSpring(
    useTransform(scrollYProgress, [0.8, 0.85, 0.89, 0.93], [0, 1, 1, 0]),
    spring
  );
  const overlay2Opacity = useSpring(useTransform(scrollYProgress, [0.93, 0.97], [0, 1]), spring);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <motion.div className={styles.stage} style={{ scale: stageScale }}>
          <motion.div className={styles.layer} style={{ opacity: headOpacity }}>
            <ScrollLottie src={LOTTIES.head} progress={headLottieProgress} />
          </motion.div>
          <motion.div className={styles.layer} style={{ opacity: flipOpacity }}>
            <ScrollLottie src={LOTTIES.flip} progress={flipLottieProgress} />
          </motion.div>
          <motion.div className={styles.layer} style={{ opacity: tipsOpacity }}>
            <ScrollLottie src={LOTTIES.explodeTips} progress={tipsLottieProgress} />
            <motion.ul className={styles.labels} style={{ opacity: labelsOpacity, y: labelsY }}>
              {COMFORT.sizes.map((size) => (
                <li key={size} className={styles.label}>
                  {size}
                </li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div className={styles.layer} style={{ opacity: ancOpacity }}>
            <ScrollLottie src={LOTTIES.flipNc} progress={ancLottieProgress} />
          </motion.div>
        </motion.div>

        <motion.header className={styles.sideText} style={{ opacity: headerOpacity }}>
          <p className={styles.eyebrow}>{COMFORT.eyebrow}</p>
          <h2 className={styles.headline}>{COMFORT.headline}</h2>
          <p className={styles.intro}>{COMFORT.intro}</p>
        </motion.header>
        <motion.p className={styles.sideText} style={{ opacity: caption1Opacity }}>
          {COMFORT.captions[0]}
        </motion.p>
        <motion.p className={styles.sideText} style={{ opacity: caption2Opacity }}>
          {COMFORT.captions[1]}
        </motion.p>

        <motion.header
          className={styles.ancHeader}
          style={{ opacity: ancHeaderOpacity, y: ancHeaderY }}
        >
          <p className={styles.ancEyebrow}>{NOISE_CANCELLATION.eyebrow}</p>
          <h2 className={styles.ancHeadline}>{NOISE_CANCELLATION.headline}</h2>
        </motion.header>

        <motion.p className={styles.overlay} style={{ opacity: overlay1Opacity }}>
          {NOISE_CANCELLATION.overlays[0].text}
        </motion.p>
        <motion.p className={styles.overlay} style={{ opacity: overlay2Opacity }}>
          {NOISE_CANCELLATION.overlays[1].text}
          <span className={styles.accent}>{NOISE_CANCELLATION.overlays[1].accent}</span>
          {NOISE_CANCELLATION.overlays[1].suffix}
        </motion.p>
      </div>
    </section>
  );
}
