import { motion } from 'framer-motion';
import { TECH_SPECS } from '../airpodsPro.data';
import styles from './TechSpecs.module.css';

const spring = { stiffness: 170, damping: 24, mass: 0.9 };

export default function TechSpecs() {
  return (
    <section className={styles.section} id="tech-specs">
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', ...spring }}
      >
        {TECH_SPECS.title}
      </motion.h2>
      <div className={styles.grid}>
        {TECH_SPECS.groups.map((group, i) => (
          <motion.article
            key={group.name}
            className={styles.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', ...spring, delay: i * 0.06 }}
          >
            <h3 className={styles.groupName}>{group.name}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
