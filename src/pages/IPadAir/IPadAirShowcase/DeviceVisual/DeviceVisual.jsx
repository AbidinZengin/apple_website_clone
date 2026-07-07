import PropTypes from 'prop-types';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SPRING } from '../ipadAirShowcase.data';
import styles from './DeviceVisual.module.css';

/* Apple logo glifi (Font Awesome "apple" path, viewBox 0 0 384 512) */
const APPLE_LOGO_PATH =
  'M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.7-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z';

export default function DeviceVisual({ finish }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={styles.stage}>
      <motion.div
        className={styles.floater}
        animate={prefersReducedMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {finish.image ? (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={finish.id}
              src={finish.image}
              alt={`iPad Air — ${finish.label}`}
              className={styles.photo}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={SPRING}
              draggable={false}
            />
          </AnimatePresence>
        ) : (
          <motion.div
            className={styles.device}
            animate={{ backgroundColor: finish.body }}
            transition={SPRING}
            whileHover={prefersReducedMotion ? undefined : { rotate: -2, scale: 1.02 }}
            aria-label={`iPad Air — ${finish.label}`}
            role="img"
          >
            <motion.span
              className={styles.camera}
              animate={{ backgroundColor: finish.camera }}
              transition={SPRING}
            >
              <span className={styles.lens} />
            </motion.span>

            <svg className={styles.logo} viewBox="0 0 384 512" aria-hidden="true">
              <motion.path d={APPLE_LOGO_PATH} animate={{ fill: finish.logo }} transition={SPRING} />
            </svg>
          </motion.div>
        )}
      </motion.div>

      <div className={styles.shadow} aria-hidden="true" />
    </div>
  );
}

DeviceVisual.propTypes = {
  finish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    camera: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};
