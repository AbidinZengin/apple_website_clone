import { motion } from 'framer-motion';
import { useNav } from '../../../context/NavContext';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import NavLogo from '../../common/NavLogo/NavLogo';
import NavLinks from './NavLinks/NavLinks';
import NavActions from './NavActions/NavActions';
import NavMenuToggle from './NavMenuToggle/NavMenuToggle';
import NavMegaMenu from './NavMegaMenu/NavMegaMenu';
import NavDrawer from './NavDrawer/NavDrawer';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { isDrawerOpen, activeMenu, closeMenu } = useNav();
  const scrollDir = useScrollDirection();
  const shouldHide = scrollDir === 'down' && !isDrawerOpen && !activeMenu;

  return (
    <>
      <motion.div
        className={styles.wrapper}
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
