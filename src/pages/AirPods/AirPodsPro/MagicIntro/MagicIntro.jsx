import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import ScrollLottie from '../../../../components/common/ScrollLottie';
import { INTRO, LOTTIES } from '../airpodsPro.data';
import styles from './MagicIntro.module.css';

const spring = { stiffness: 170, damping: 24, mass: 0.9 };

// Her başlık kendi enter→hold→exit trapezini scroll progress'inden alır.
function IntroHeadline({ text, progress, range }) {
  const [enterStart, enterEnd, exitStart, exitEnd] = range;
  const opacity = useSpring(
    useTransform(progress, [enterStart, enterEnd, exitStart, exitEnd], [0, 1, 1, 0]),
    spring
  );
  const y = useSpring(useTransform(progress, [enterStart, enterEnd], [32, 0]), spring);

  return (
    <motion.h2 className={styles.headline} style={{ opacity, y }}>
      {text}
    </motion.h2>
  );
}

IntroHeadline.propTypes = {
  text: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
};

// Dört başlık için kaydırılmış trapezler (staggering, MotionGuideline §1).
// Trapezler arasında boşluk var: spring gecikmesi yüzünden ardışık yazılar
// üst üste binmesin diye bir başlık tamamen çıkmadan diğeri girmez.
const HEADLINE_RANGES = [
  [0.02, 0.07, 0.12, 0.16],
  [0.2, 0.25, 0.3, 0.34],
  [0.38, 0.43, 0.48, 0.52],
  [0.56, 0.61, 0.66, 0.7],
];

export default function MagicIntro() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // AirPod sahnesi pin'in başından itibaren ekranda: önce sabit karede bekler
  // (yazılar üstünden akar), pin'in ortasından itibaren animasyon oynar.
  const stageOpacity = useSpring(useTransform(scrollYProgress, [0, 0.08], [0, 1]), spring);
  const stageScale = useSpring(useTransform(scrollYProgress, [0.08, 0.99], [0.94, 1.12]), spring);
  const lottieProgress = useTransform(scrollYProgress, [0.5, 0.99], [0.3, 1]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        {INTRO.headlines.map((text, i) => (
          <IntroHeadline
            key={text}
            text={text}
            progress={scrollYProgress}
            range={HEADLINE_RANGES[i]}
          />
        ))}
        <motion.div className={styles.stage} style={{ opacity: stageOpacity, scale: stageScale }}>
          <ScrollLottie src={LOTTIES.hero} progress={lottieProgress} />
        </motion.div>
      </div>
    </section>
  );
}
