import { motion, useReducedMotion } from 'framer-motion';
import styles from './AuthSuccess.module.css';

const SPRING = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 };
const EASE_APPLE = [0.32, 0.72, 0, 1];

/**
 * Login/Register başarısında formun yerini alan onay görünümü:
 * rozet spring ile belirir, tik çizilerek tamamlanır (payoff moment),
 * kısa bir bekleyişten sonra AuthModal kendini kapatır.
 */
export default function AuthSuccess({ message }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.success} role="status">
      <motion.span
        className={styles.badge}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING}
      >
        <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <motion.path
            d="M16 27L23.5 34.5L37 20"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.18, duration: 0.35, ease: EASE_APPLE }}
          />
        </svg>
      </motion.span>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
