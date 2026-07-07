import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import ScrollLottie from '../../../../components/common/ScrollLottie';
import { LOTTIES, TRANSPARENCY } from '../airpodsPro.data';
import styles from './Transparency.module.css';

const spring = { stiffness: 170, damping: 24, mass: 0.9 };

export default function Transparency() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headlineOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.12, 0.28, 0.4], [0, 1, 1, 0]),
    spring
  );
  const headlineY = useSpring(useTransform(scrollYProgress, [0, 0.12], [32, 0]), spring);
  const stageOpacity = useSpring(useTransform(scrollYProgress, [0.34, 0.46], [0, 1]), spring);
  // Scrub 0.88'de tamamlanır; kalan pin videonun son karesinde "hold" yapar —
  // video yarım kalmış hissi bırakmadan bir sonraki bölüme geçilir.
  const stageScale = useSpring(useTransform(scrollYProgress, [0.38, 0.88], [0.94, 1.12]), spring);
  const lottieProgress = useTransform(scrollYProgress, [0.38, 0.88], [0, 1]);

  // Force sensor anlatımı: kadın sahnesi oynarken üzerinden akar.
  const captionOpacity = useSpring(
    useTransform(scrollYProgress, [0.52, 0.6, 0.82, 0.9], [0, 1, 1, 0]),
    spring
  );
  const captionY = useSpring(useTransform(scrollYProgress, [0.52, 0.6], [24, 0]), spring);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <motion.h2 className={styles.headline} style={{ opacity: headlineOpacity, y: headlineY }}>
          {TRANSPARENCY.headline}
        </motion.h2>
        <motion.div className={styles.stage} style={{ opacity: stageOpacity, scale: stageScale }}>
          <ScrollLottie src={LOTTIES.transparency} progress={lottieProgress} />
        </motion.div>
        <motion.p className={styles.caption} style={{ opacity: captionOpacity, y: captionY }}>
          {TRANSPARENCY.caption}
        </motion.p>
      </div>
    </section>
  );
}
