import { AnimatePresence, motion } from 'framer-motion';
import { useNav } from '../../../../context/NavContext';
import { NAV_LINKS } from '../NavLinks/navLinks.data';
import styles from './NavMegaMenu.module.css';

const layoutTransition = { duration: 0.28, ease: [0.32, 0.72, 0, 1] };

const clipVariants = {
  hidden:  { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.3,  ease: [0.32, 0.72, 0, 1] } },
  exit:    { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } },
};

const itemVariants = {
  hidden:  { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.1 + i * 0.035, duration: 0.18, ease: 'easeOut' },
  }),
};

export default function NavMegaMenu() {
  const { activeMenu } = useNav();
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
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  >
                    {items.map((item, i) => (
                      <motion.li
                        key={item.href}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <a href={item.href} className={styles.item}>
                          {item.label}
                        </a>
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
                        <a href={item.href} className={styles.item}>
                          {item.label}
                        </a>
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
