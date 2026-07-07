import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from '../ipadAirShowcase.data';
import styles from './ColorPicker.module.css';

export default function ColorPicker({ finishes, selectedId, onSelect }) {
  const selected = finishes.find((f) => f.id === selectedId) ?? finishes[0];

  return (
    <div className={styles.picker}>
      <p className={styles.label}>
        Color —{' '}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={selected.id}
            className={styles.labelValue}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SPRING}
          >
            {selected.label}
          </motion.span>
        </AnimatePresence>
      </p>

      <div role="radiogroup" aria-label="Finish" className={styles.swatches}>
        {finishes.map((finish) => (
          <button
            key={finish.id}
            type="button"
            role="radio"
            aria-checked={finish.id === selectedId}
            aria-label={finish.label}
            className={styles.swatchButton}
            onClick={() => onSelect(finish.id)}
          >
            <motion.span
              className={styles.swatch}
              style={{ background: finish.swatch }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={SPRING}
            />
            {finish.id === selectedId && (
              <motion.span layoutId="ipad-air-finish-ring" className={styles.ring} transition={SPRING} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  finishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      swatch: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
