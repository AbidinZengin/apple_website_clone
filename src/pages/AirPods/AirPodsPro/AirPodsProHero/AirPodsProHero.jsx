import { motion } from 'framer-motion';
import { HERO } from '../airpodsPro.data';
import styles from './AirPodsProHero.module.css';

const spring = { stiffness: 170, damping: 24, mass: 0.9 };

export default function AirPodsProHero() {
  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', ...spring, delay: 0.15 }}
      >
        {HERO.title}
      </motion.h1>
      <motion.a
        className={styles.film}
        href="#film"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', ...spring, delay: 0.4 }}
      >
        {HERO.filmLink}
      </motion.a>
    </section>
  );
}
