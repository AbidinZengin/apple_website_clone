import { motion } from 'framer-motion';
import styles from './Card.module.css';

const enterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.32, 0.72, 0, 1] },
  },
};

// MotionGuideline.md shared spring standard — { stiffness: 170, damping: 24, mass: 0.9 }
const HOVER_SPRING = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 };

export default function Card({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  price,
  ctaLabel,
  ctaHref = '#',
  tone = 'light',
}) {
  return (
    <motion.div
      className={styles.card}
      data-tone={tone}
      variants={enterVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.imageWrapper}>
        <motion.img
          src={image}
          alt={imageAlt}
          className={styles.image}
          whileHover={{ scale: 1.05 }}
          transition={HOVER_SPRING}
          draggable={false}
        />
      </div>

      <div className={styles.content}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {price && <p className={styles.price}>{price}</p>}
        {ctaLabel && (
          <a href={ctaHref} className={styles.cta}>
            {ctaLabel}
          </a>
        )}
      </div>
    </motion.div>
  );
}
