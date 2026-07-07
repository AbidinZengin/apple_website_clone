import { motion } from 'framer-motion';
import airImage from '../../../assets/air.jpg';
import styles from './MacBookCard.module.css';

const enterVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.32, 0.72, 0, 1], delay: 0.15 },
  },
};

export default function MacBookCard() {
  return (
    <motion.div
      className={styles.card}
      variants={enterVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.imageWrapper}>
        <motion.img
          src={airImage}
          alt="MacBook Air M5 Sky Blue"
          className={styles.image}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          draggable={false}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>MacBook Air</h2>
        <p className={styles.subtitle}>Jet gibi .Ve yok gibi.</p>
        <p className={styles.price}>Başlangıç Fiyatı : 57.999 TL</p>
      </div>
    </motion.div>
  );
}
