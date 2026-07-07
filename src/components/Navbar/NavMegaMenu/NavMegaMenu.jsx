import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNav } from '../NavContext';
import { NAV_LINKS } from '../NavLinks/navLinks.data';
import styles from './NavMegaMenu.module.css';

// Sayfa olarak henüz bağlanmamış linkler için geçici no-op anchor;
// router'a bağlı linkler (href "/" ile başlayanlar) Link ile SPA içi geçiş yapar.
function NavMenuLink({ href, className, onNavigate, children }) {
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

// Apple'ın standart panel geçişi: Sıçrama (bounce) olmayan, pürüzsüz bir spring.
const appleSpring = { type: 'spring', bounce: 0, duration: 0.5 };

// Çıkışlar kullanıcıyı bekletmemek için her zaman daha hızlı (0.2s) ve doğrusaldır.
const appleExit = { duration: 0.3, ease: [0.4, 1, 1, 1] }; // ease-in

const layoutTransition = appleSpring;

const clipVariants = {
  hidden:  { clipPath: 'inset(0 0 100% 0)' },
  visible: { 
    clipPath: 'inset(0 0 0% 0)', 
    transition: appleSpring 
  },
  exit:    { 
    clipPath: 'inset(0 0 100% 0)', 
    transition: appleExit 
  },
};

const itemVariants = {
  // Apple menülerinde y-ekseni hareketi çok incedir (subtle). -8 yerine -4.
  hidden:  { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.1 + i * 0.03, 
      duration: 0.5, 
      ease: [0.2, 0.8, 0.2, 1] // Klasik Apple Ease-out eğrisi
    },
  }),
};

export default function NavMegaMenu() {
  const { activeMenu, closeMenu } = useNav();
  const activeLink = NAV_LINKS.find(l => l.label === activeMenu);
  const items = activeLink?.subMenu;
  const sideMenu = activeLink?.sideMenu;

  return (
    <AnimatePresence>
      {activeMenu && items?.length > 0 && (
        <motion.div
          className={styles.clipper}
          variants={clipVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="region"
          aria-label={`${activeMenu} submenu`}
        >
          <motion.div
            className={styles.panel}
            layout="size"
            transition={{ layout: layoutTransition }}
          >
            <motion.div layout className={styles.container}>
              <div className={styles.mainSection}>
                <h3 className={styles.sectionTitle}>{activeMenu}</h3>
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={activeMenu}
                    className={styles.list}
                    initial={{ opacity: 0 }}
                    // İçerik geçişleri (opacity) çok hızlı olmalıdır (0.15s - 0.2s)
                    animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
                  >
                    {items.map((item, i) => (
                      <motion.li
                        key={item.href}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <NavMenuLink href={item.href} className={styles.item} onNavigate={closeMenu}>
                          {item.label}
                        </NavMenuLink>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              {sideMenu && (
                <div className={styles.sideSection}>
                  <h3 className={styles.sectionTitle}>{sideMenu.title}</h3>
                  <ul className={styles.list}>
                    {sideMenu.items.map((item) => (
                      <li key={item.href}>
                        <NavMenuLink href={item.href} className={styles.item} onNavigate={closeMenu}>
                          {item.label}
                        </NavMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
