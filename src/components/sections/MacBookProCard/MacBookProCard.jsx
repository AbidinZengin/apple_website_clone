import { motion } from 'framer-motion';
import proImage from '../../../assets/macbook-pro.png';
import styles from './MacBookProCard.module.css';

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.32, 0.72, 0, 1], delay: 0.2 },
  },
};

export default function MacBookProCard() {
  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>MacBook Pro</h2>
        <p className={styles.subtitle}>Hız tutkusu aile boyu.</p>
        <p className={styles.description}>Şimdi M5, M5 Pro ve M5 Max çip ile.</p>
        <p className={styles.price}>94.999 TL'den başlayan fiyatlarla</p>
      </div>

      <div className={styles.imageWrapper}>
        <motion.img
          src={proImage}
          alt="MacBook Pro M5 Space Black"
          className={styles.image}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
