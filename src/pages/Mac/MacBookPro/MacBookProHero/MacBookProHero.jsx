import { memo } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../../../assets/macbook/macbook-pro-hero.png';
import { MACBOOK_PRO_HERO } from './macBookProHero.data';
import styles from './MacBookProHero.module.css';

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', bounce: 0, duration: 1.1, delay: 0.2 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
};

function MacBookProHero() {
  const { eyebrow, headlinePlain, headlineAccent, subheadline, imageAlt, price } =
    MACBOOK_PRO_HERO;

  return (
    <section className={styles.hero}>
      <motion.img
        src={heroImage}
        alt={imageAlt}
        className={styles.image}
        draggable={false}
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      />

      <motion.div
        className={styles.footer}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className={styles.copy}>
          <motion.p className={styles.eyebrow} variants={textVariants}>
            {eyebrow}
          </motion.p>
          <motion.h1 className={styles.headline} variants={textVariants}>
            {headlinePlain}
            <span className={styles.accent}>{headlineAccent}</span>
          </motion.h1>
          <motion.p className={styles.subheadline} variants={textVariants}>
            {subheadline}
          </motion.p>
        </div>

        <motion.div className={styles.pricePill} variants={textVariants}>
          <div className={styles.priceText}>
            <p className={styles.priceFrom}>{price.from}</p>
            <p className={styles.priceInstallment}>{price.installment}</p>
          </div>
          <button type="button" className={styles.buyButton}>
            {price.cta}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(MacBookProHero);
