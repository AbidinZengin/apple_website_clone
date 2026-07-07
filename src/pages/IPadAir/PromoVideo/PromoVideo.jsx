import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './PromoVideo.module.css';

// Proje standardı spring (bkz. .agents/Skills/MotionGuideline.md §4)
const SPRING = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 };

export default function PromoVideo({ src, caption }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.band}>
      <motion.div
        className={styles.frame}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 48, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={SPRING}
      >
        <video
          className={styles.video}
          src={src}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          controls={prefersReducedMotion}
        />
      </motion.div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </section>
  );
}

PromoVideo.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string,
};
