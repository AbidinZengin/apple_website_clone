import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getExploreLineup } from './exploreLineup.service';
import styles from './ExploreLineup.module.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.32, 0.72, 0, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.9, ease: [0.32, 0.72, 0, 1] },
  }),
};

const BAR_WIDTH = 240;
const MIN_THUMB_WIDTH = 32;

export default function ExploreLineup() {
  const [items, setItems] = useState([]);
  const trackRef = useRef(null);
  const dragStartLeft = useRef(0);
  const [thumb, setThumb] = useState({ width: BAR_WIDTH, left: 0 });

  useEffect(() => {
    let active = true;
    getExploreLineup().then((data) => {
      if (active) setItems(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const updateThumb = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollWidth, clientWidth, scrollLeft } = el;
    const width = Math.max((clientWidth / scrollWidth) * BAR_WIDTH, MIN_THUMB_WIDTH);
    const maxScroll = scrollWidth - clientWidth;
    const maxTravel = BAR_WIDTH - width;
    const left = maxScroll > 0 ? (scrollLeft / maxScroll) * maxTravel : 0;
    setThumb({ width, left });
  };

  useEffect(() => {
    updateThumb();
    window.addEventListener('resize', updateThumb);
    return () => window.removeEventListener('resize', updateThumb);
  }, [items]);

  const handleThumbDrag = (_, info) => {
    const el = trackRef.current;
    if (!el) return;
    const maxTravel = BAR_WIDTH - thumb.width;
    const newLeft = Math.min(Math.max(dragStartLeft.current + info.offset.x, 0), maxTravel);
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollLeft = maxTravel > 0 ? (newLeft / maxTravel) * maxScroll : 0;
  };

  return (
    <motion.section
      className={styles.section}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Explore the lineup.</h2>
        <Link to="/iphone/compare" className={styles.compareLink}>
          Compare all models <span aria-hidden="true">&rsaquo;</span>
        </Link>
      </div>

      <div
        className={styles.track}
        ref={trackRef}
        onScroll={updateThumb}
        tabIndex={0}
        role="region"
        aria-label="iPhone lineup, yatay kaydırılabilir"
      >
        {items.map((item, i) => (
          <motion.article
            key={item.id}
            className={styles.card}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} className={styles.image} />
            </div>

            <ul className={styles.dots}>
              {item.colors.map((color, idx) => (
                <li
                  key={color}
                  className={`${styles.dot} ${idx === 0 ? styles.dotActive : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </ul>

            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            <p className={styles.cardPrice}>{item.price}</p>

            <div className={styles.actions}>
              <Link to={item.href} className={styles.learnMore}>
                Learn more
              </Link>
              <Link to={`${item.href}/buy`} className={styles.buyLink}>
                Buy <span aria-hidden="true">&rsaquo;</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className={styles.scrollBar} style={{ width: BAR_WIDTH }}>
        <motion.div
          className={styles.scrollThumb}
          style={{ width: thumb.width, x: thumb.left }}
          drag="x"
          dragConstraints={{ left: 0, right: BAR_WIDTH - thumb.width }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => {
            dragStartLeft.current = thumb.left;
          }}
          onDrag={handleThumbDrag}
        />
      </div>
    </motion.section>
  );
}
