import { motion, useReducedMotion } from 'framer-motion';
import { IPAD_PRO_HERO } from './iPadProHero.data';
import styles from './IPadProHero.module.css';

const spring = { stiffness: 170, damping: 24, mass: 0.9 };
// Karanlıktan çıkış: görsel zemini zaten siyah — brightness(0) ile tamamen
// karanlığa gömülü başlar, uzun Apple ease'iyle yavaşça "develop" olur.
const emergeEase = [0.32, 0.72, 0, 1];
const {
  heroImage,
  eyebrow,
  headlinePlain,
  headlineAccent,
  subheadline,
  price,
  ctaPrimary,
  ctaSecondary,
  imageAlt,
} = IPAD_PRO_HERO;

export default function IPadProHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', ...spring, delay: 0.1 }}
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', ...spring, delay: 0.15 }}
        >
          {headlinePlain}
          <br />
          <span className={styles.accent}>{headlineAccent}</span>
        </motion.h1>
      </div>

      {/* Ana görsel — karanlıktan smooth çıkış (brightness 0 → 1 + hafif scale). */}
      <div className={styles.stage}>
        <motion.img
          className={styles.heroImage}
          src={heroImage}
          alt={imageAlt}
          draggable={false}
          initial={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 0, scale: 1.06, filter: 'brightness(0)' }
          }
          animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.9, ease: emergeEase, delay: 0.25 }}
        />
      </div>

      {/* Satın alma kısmı — görselin altında. */}
      <motion.p
        className={styles.subheadline}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', ...spring, delay: 0.34 }}
      >
        {subheadline}
      </motion.p>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', ...spring, delay: 0.4 }}
      >
        <a className={styles.ctaPrimary} href="#buy">
          {ctaPrimary}
        </a>
        <a className={styles.ctaSecondary} href="#learn">
          {ctaSecondary} <span aria-hidden="true">›</span>
        </a>
      </motion.div>

      <motion.p
        className={styles.price}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {price}
      </motion.p>
    </section>
  );
}
