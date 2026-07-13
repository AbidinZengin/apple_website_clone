import { motion, useReducedMotion } from 'framer-motion';
import styles from './BoxContent.module.css';

// Sitedeki ortak giriş fiziği — scroll'da görünür olunca tetiklenir
const spring = { stiffness: 170, damping: 24, mass: 0.9 };

/**
 * "What's in the Box" bölümü — GENERIC sunum bileşeni.
 * Kutu içeriğini (görsel + etiket kartları) ve çevre notunu props ile alır;
 * hangi ürüne ait olduğunu bilmez (BuyPage productType'a göre besler).
 *
 * items[]: { image, alt, label }
 */
export default function BoxContent({ title = "What's in the Box", items = [], note }) {
  const reduceMotion = useReducedMotion();
  const reveal = (delay) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: reduceMotion ? { duration: 0 } : { type: 'spring', ...spring, delay },
  });

  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-label={title}>
      <motion.h2 className={styles.title} {...reveal(0)}>
        {title}
      </motion.h2>

      <div className={styles.tiles}>
        {items.map((item, i) => (
          <motion.figure className={styles.tile} key={item.label} {...reveal(0.1 + i * 0.1)}>
            <div className={styles.visual}>
              <img src={item.image} alt={item.alt ?? item.label} loading="lazy" draggable={false} />
            </div>
            <figcaption className={styles.caption}>{item.label}</figcaption>
          </motion.figure>
        ))}
      </div>

      {note && (
        <motion.p className={styles.note} {...reveal(0.2 + items.length * 0.1)}>
          {note}
        </motion.p>
      )}
    </section>
  );
}
