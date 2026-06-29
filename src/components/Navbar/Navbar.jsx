import { motion } from 'framer-motion';
import { useNav } from '../../context/NavContext';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import NavLogo from './NavLogo/NavLogo';
import NavLinks from './NavLinks/NavLinks';
import NavActions from './NavActions/NavActions';
import NavMenuToggle from './NavMenuToggle/NavMenuToggle';
import NavDrawer from './NavDrawer/NavDrawer';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isDrawerOpen } = useNav();
  const scrollDir = useScrollDirection();
  const shouldHide = scrollDir === 'down' && !isDrawerOpen;

  return (
    <>
      <motion.header
        className={styles.bar}
        animate={{ y: shouldHide ? -44 : 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        <nav className={styles.inner} aria-label="Main navigation">
          <NavLogo />
          <NavLinks />
          <NavActions />
          <NavMenuToggle />
        </nav>
      </motion.header>
      <NavDrawer />
    </>
  );
}
