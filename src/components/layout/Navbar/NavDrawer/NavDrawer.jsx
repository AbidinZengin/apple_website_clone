import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNav } from '../../../../context/NavContext';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import NavDrawerItem from './NavDrawerItem';
import { NAV_LINKS } from '../NavLinks/navLinks.data';
import styles from './NavDrawer.module.css';

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

const drawerVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { ease: [0.32, 0.72, 0, 1], duration: 0.48 } },
  exit:    { x: '100%', transition: { ease: [0.32, 0.72, 0, 1], duration: 0.38 } },
};

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

export default function NavDrawer() {
  const { isDrawerOpen, closeDrawer } = useNav();
  const drawerRef = useOutsideClick(closeDrawer);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  return createPortal(
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
          />
          <motion.aside
            id="nav-drawer"
            ref={drawerRef}
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.ul
              className={styles.drawerList}
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map(link => (
                <NavDrawerItem key={link.href} {...link} />
              ))}
            </motion.ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
