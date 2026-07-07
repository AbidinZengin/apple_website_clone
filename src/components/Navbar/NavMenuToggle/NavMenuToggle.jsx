import { motion } from 'framer-motion';
import { useNav } from '../NavContext';
import styles from './NavMenuToggle.module.css';

const topLine = {
  closed: { d: 'M 2 4 L 14 4' },
  open:   { d: 'M 3 3 L 13 13' },
};

const bottomLine = {
  closed: { d: 'M 2 10 L 14 10' },
  open:   { d: 'M 3 13 L 13 3' },
};

export default function NavMenuToggle() {
  const { isDrawerOpen, toggleDrawer } = useNav();
  const state = isDrawerOpen ? 'open' : 'closed';

  return (
    <button
      className={styles.toggle}
      onClick={toggleDrawer}
      aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isDrawerOpen}
      aria-controls="nav-drawer"
    >
      <svg viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={topLine}
          animate={state}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={bottomLine}
          animate={state}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        />
      </svg>
    </button>
  );
}
