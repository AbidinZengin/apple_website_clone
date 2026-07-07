import { AnimatePresence, motion } from 'framer-motion';
import { useNav } from './NavContext';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import NavLogo from './NavLogo/NavLogo';
import NavLinks from './NavLinks/NavLinks';
import NavActions from './NavActions/NavActions';
import NavMenuToggle from './NavMenuToggle/NavMenuToggle';
import NavMegaMenu from './NavMegaMenu/NavMegaMenu';
import NavDrawer from './NavDrawer/NavDrawer';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isDrawerOpen, activeMenu, closeMenu, theme } = useNav();
  const scrollDir = useScrollDirection();
  const shouldHide = scrollDir === 'down' && !isDrawerOpen && !activeMenu;

  return (
    <>
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={styles.wrapper}
        data-theme={theme}
        onMouseLeave={closeMenu}
        animate={{ y: shouldHide ? -56 : 0 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      >
        <header className={styles.bar}>
          <nav className={styles.inner} aria-label="Main navigation">
            <NavLogo />
            <NavLinks />
            <NavActions />
            <NavMenuToggle />
          </nav>
        </header>

        <NavMegaMenu />
      </motion.div>

      <NavDrawer />
    </>
  );
}
