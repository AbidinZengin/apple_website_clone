import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNav } from '../NavContext';
import styles from './NavDrawer.module.css';

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } },
};

const subListVariants = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] } },
  exit:    { height: 0, opacity: 0, transition: { duration: 0.24, ease: [0.4, 1, 1, 1] } },
};

// `/` ile başlayan href → react-router Link (SPA içi geçiş);
// hash çapaları (henüz sayfası olmayan üst başlıklar) navigasyonu engeller.
function DrawerLink({ href, className, onNavigate, children }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  );
}

/**
 * Mobil drawer satırı. Alt menüsü olan başlıklar (Mac, iPhone...) akordeon gibi
 * açılıp gerçek sayfa route'larını gösterir; alt menüsü olmayanlar düz link kalır.
 */
export default function NavDrawerItem({ label, href, subMenu }) {
  const { closeDrawer } = useNav();
  const [open, setOpen] = useState(false);
  const hasSub = Array.isArray(subMenu) && subMenu.length > 0;

  if (!hasSub) {
    return (
      <motion.li variants={itemVariants} className={styles.drawerItem}>
        <DrawerLink href={href} className={styles.drawerLink} onNavigate={closeDrawer}>
          {label}
        </DrawerLink>
      </motion.li>
    );
  }

  return (
    <motion.li variants={itemVariants} className={styles.drawerItem}>
      <button
        type="button"
        className={styles.drawerToggle}
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
      >
        <span>{label}</span>
        <svg
          className={styles.chevron}
          data-open={open}
          viewBox="0 0 10 6"
          aria-hidden="true"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className={styles.subList}
            variants={subListVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {subMenu.map((sub) => (
              <li key={sub.href}>
                <DrawerLink href={sub.href} className={styles.subLink} onNavigate={closeDrawer}>
                  {sub.label}
                </DrawerLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
