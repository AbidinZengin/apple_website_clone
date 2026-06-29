import { useState } from 'react';
import { motion } from 'framer-motion';
import iphoneImg from '../../../../assets/iphone.jpg';
import styles from './ProductCard.module.css';

const springTransition = { type: 'spring', stiffness: 160, damping: 28 };

export default function ProductCard({ title, subtitle, price }) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.card}>
      {/* Static text */}
      <div className={styles.textBlock}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.price}>{price}</p>
      </div>

      <div className={styles.interactive}>
        {/* Image — button hover'ından tetiklenir, kendi merkezinden büyür */}
        <motion.img
          src={iphoneImg}
          alt={title}
          className={styles.image}
          draggable={false}
          animate={{ scale: active ? 1.1 : 1 }}
          transition={springTransition}
        />

        {/* Button — hover kaynağı, kendi merkezinden büyür */}
        <motion.button
          className={styles.buyBtn}
          animate={{ scale: active ? 1.1 : 1 }}
          transition={springTransition}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          Satın al
        </motion.button>
      </div>
    </div>
  );
}
