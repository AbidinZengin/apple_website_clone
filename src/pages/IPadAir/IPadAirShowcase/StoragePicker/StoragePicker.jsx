import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { SPRING } from '../ipadAirShowcase.data';
import styles from './StoragePicker.module.css';

export default function StoragePicker({ options, selectedId, onSelect }) {
  return (
    <div className={styles.picker}>
      <p className={styles.label}>Storage</p>

      <div role="radiogroup" aria-label="Storage" className={styles.segment}>
        {options.map((option) => {
          const isActive = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={isActive ? `${styles.option} ${styles.optionActive}` : styles.option}
              onClick={() => onSelect(option.id)}
            >
              {isActive && (
                <motion.span layoutId="ipad-air-storage-pill" className={styles.pill} transition={SPRING} />
              )}
              <span className={styles.optionLabel}>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

StoragePicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
