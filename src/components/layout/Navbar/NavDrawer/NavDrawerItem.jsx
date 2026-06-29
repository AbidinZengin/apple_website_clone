import { motion } from 'framer-motion';
import { useNav } from '../../../../context/NavContext';
import styles from './NavDrawer.module.css';

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } },
};

export default function NavDrawerItem({ label, href }) {
  const { closeDrawer } = useNav();

  return (
    <motion.li variants={itemVariants} className={styles.drawerItem}>
      <a href={href} className={styles.drawerLink} onClick={closeDrawer}>
        {label}
      </a>
    </motion.li>
  );
}
