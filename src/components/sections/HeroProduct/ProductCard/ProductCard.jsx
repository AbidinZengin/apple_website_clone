import { useState } from 'react';
import { motion } from 'framer-motion';
import iphoneImg from '../../../../assets/iphone.jpg';
import styles from './ProductCard.module.css';

const springTransition = { type: 'spring', stiffness: 160, damping: 28 };

const cardVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function ProductCard({ title, subtitle, price, videoSrc }) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Static text */}
      <motion.div className={styles.textBlock} variants={itemVariants}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.price}>{price}</p>
      </motion.div>

      <motion.div className={styles.interactive} variants={itemVariants}>
        {/* Video — button hover'ından tetiklenir, kendi merkezinden büyür */}
        <motion.div
          className={styles.videoScaleWrap}
          animate={{ scale: active ? 1.1 : 1 }}
          transition={springTransition}
        >
          <video
            className={styles.video}
            src={videoSrc}
            poster={iphoneImg}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className={styles.vignette} aria-hidden="true" />
        </motion.div>

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
      </motion.div>
    </motion.div>
  );
}
