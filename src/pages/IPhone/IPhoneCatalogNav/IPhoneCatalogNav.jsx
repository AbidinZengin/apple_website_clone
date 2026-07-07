import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIphoneCatalog } from './iphoneCatalog.service';
import styles from './IPhoneCatalogNav.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.32, 0.72, 0, 1], delay: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.3, ease: [0.4, 1, 1, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 1, ease: [0.32, 0.72, 0, 1] },
  }),
};

export default function IPhoneCatalogNav() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    getIphoneCatalog().then((data) => {
      if (active) setItems(data);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.section
      className={styles.section}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className={styles.title}>iPhone</h1>
      <ul className={styles.row}>
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            className={styles.item}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to={item.href} className={styles.link}>
              <div className={styles.imageWrap}>
                <img src={item.image} alt={item.label} className={styles.image} />
              </div>
              <span className={styles.label}>{item.label}</span>
              {item.sublabel && <span className={styles.sublabel}>{item.sublabel}</span>}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
