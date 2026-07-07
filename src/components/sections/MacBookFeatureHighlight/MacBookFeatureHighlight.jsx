import { memo } from 'react';
import { motion } from 'framer-motion';
import proImage from '../../../assets/macbook-pro.png';
import { MACBOOK_M5_FEATURE_HIGHLIGHT } from './macBookFeatureHighlight.data';
import styles from './MacBookFeatureHighlight.module.css';

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 16, mass: 0.9, delay: 0.15 },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.8 },
  },
};

function MacBookFeatureHighlight() {
  const { eyebrow, title, subtitle, imageAlt, features, footnote } =
    MACBOOK_M5_FEATURE_HIGHLIGHT;

  return (
    <motion.section
      className={styles.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.p className={styles.eyebrow} variants={textVariants}>
        {eyebrow}
      </motion.p>
      <motion.h2 className={styles.title} variants={textVariants}>
        {title}
      </motion.h2>
      <motion.p className={styles.subtitle} variants={textVariants}>
        {subtitle}
      </motion.p>

      <motion.img
        src={proImage}
        alt={imageAlt}
        className={styles.image}
        draggable={false}
        variants={imageVariants}
      />

      <motion.ul className={styles.grid} variants={gridVariants}>
        {features.map((feature) => (
          <motion.li key={feature.id} className={styles.card} variants={cardVariants}>
            <p className={styles.stat}>
              {feature.stat}
              {feature.unit && <span className={styles.unit}> {feature.unit}</span>}
            </p>
            <p className={styles.label}>{feature.label}</p>
            <p className={styles.description}>{feature.description}</p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p className={styles.footnote} variants={textVariants}>
        {footnote}
      </motion.p>
    </motion.section>
  );
}

export default memo(MacBookFeatureHighlight);
