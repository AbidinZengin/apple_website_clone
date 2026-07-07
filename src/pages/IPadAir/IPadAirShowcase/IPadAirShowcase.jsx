import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FINISHES, STORAGE_OPTIONS, SPECS, SPRING } from './ipadAirShowcase.data';
import ColorPicker from './ColorPicker/ColorPicker';
import StoragePicker from './StoragePicker/StoragePicker';
import DeviceVisual from './DeviceVisual/DeviceVisual';
import lineupImage from '../../../assets/ipad/ipad-air-lineup.jpg';
import styles from './IPadAirShowcase.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

const deviceVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING },
};

export default function IPadAirShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [finishId, setFinishId] = useState(FINISHES[0].id);
  const [storageId, setStorageId] = useState(STORAGE_OPTIONS[0].id);

  const finish = FINISHES.find((f) => f.id === finishId) ?? FINISHES[0];
  const storage = STORAGE_OPTIONS.find((s) => s.id === storageId) ?? STORAGE_OPTIONS[0];

  return (
    <section className={styles.showcase} aria-labelledby="ipad-air-showcase-title">
      <motion.div
        className={styles.inner}
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.content}>
          <motion.p variants={itemVariants} className={styles.eyebrow}>
            iPad Air
          </motion.p>

          <motion.h2 variants={itemVariants} id="ipad-air-showcase-title" className={styles.title}>
            iPad Air. <span className={styles.titleAccent}>Lean Power.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className={styles.subtitle}>
            Serious performance in a thin and light design.
          </motion.p>

          <motion.ul variants={itemVariants} className={styles.specs}>
            {SPECS.map((spec) => (
              <li key={spec.id} className={styles.spec}>
                <span className={styles.specValue}>{spec.value}</span>
                <span className={styles.specLabel}>{spec.label}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants}>
            <ColorPicker finishes={FINISHES} selectedId={finishId} onSelect={setFinishId} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StoragePicker options={STORAGE_OPTIONS} selectedId={storageId} onSelect={setStorageId} />
          </motion.div>

          <motion.div variants={itemVariants} className={styles.ctaRow}>
            <span className={styles.price} aria-live="polite">
              From{' '}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={storage.id}
                  className={styles.priceValue}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={SPRING}
                >
                  ${storage.price}
                </motion.span>
              </AnimatePresence>
            </span>
            <motion.button
              type="button"
              className={styles.buyButton}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING}
            >
              Buy
            </motion.button>
          </motion.div>
        </div>

        <motion.div variants={deviceVariants} className={styles.visual}>
          <DeviceVisual finish={finish} />
        </motion.div>
      </motion.div>

      <motion.figure
        className={styles.lineup}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={SPRING}
      >
        <img
          src={lineupImage}
          alt="iPad Air lineup — Blue, Purple, Starlight and Space Gray finishes fanned out"
          loading="lazy"
          draggable={false}
        />
        <figcaption className={styles.lineupCaption}>Four finishes. Every shade of Air.</figcaption>
      </motion.figure>
    </section>
  );
}
