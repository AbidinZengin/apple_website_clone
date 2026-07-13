import styles from './OptionGroup.module.css';

/**
 * GENERIC tek seçim ekseni. Bir konfigürasyon grubunu (renk, depolama, …)
 * iki görsel biçimden biriyle render eder:
 *   - type="swatch": renk daireleri (hex dolgulu, seçili olanda halka)
 *   - type="tile":   metin kutuları (etiket + opsiyonel yan bilgi)
 * Sayfa hangi ekseni gösterdiğini bilmez; buy.service optionGroups'u besler (OCP).
 *
 * options[]: { id, label, hex?, priceLabel?, available }
 * Pasif (available=false) option'lar soluk ve seçilemez.
 */
export default function OptionGroup({ label, type, options = [], value, onChange }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{label}</legend>

      {type === 'swatch' ? (
        <div className={styles.swatchRow} role="radiogroup" aria-label={label}>
          {options.map((opt) => {
            const selected = opt.id === value;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={opt.label}
                title={opt.label}
                disabled={!opt.available}
                className={`${styles.swatch} ${selected ? styles.swatchSelected : ''}`}
                onClick={() => onChange(opt.id)}
              >
                <span className={styles.swatchDot} style={{ backgroundColor: opt.hex }} />
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.tileGrid} role="radiogroup" aria-label={label}>
          {options.map((opt) => {
            const selected = opt.id === value;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={!opt.available}
                className={`${styles.tile} ${selected ? styles.tileSelected : ''}`}
                onClick={() => onChange(opt.id)}
              >
                <span className={styles.tileLabel}>{opt.label}</span>
                {opt.priceLabel && <span className={styles.tileMeta}>{opt.priceLabel}</span>}
              </button>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}
