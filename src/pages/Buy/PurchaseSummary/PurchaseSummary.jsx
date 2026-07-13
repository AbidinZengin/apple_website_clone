import { motion, useReducedMotion } from 'framer-motion';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './PurchaseSummary.module.css';

function TruckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M1.5 5.5h9v7h-9v-7ZM10.5 8h4l2 2.5v2h-6V8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="5" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M3 8v8h14V8M2 8l1.5-4h13L18 8H2ZM8 16v-4h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Sticky satın-alma barı. Sol: küçük görsel + seçili varyantın etiketi.
 * Sağ: statik teslimat rozetleri, fiyat ve Add to Bag CTA.
 * Saf sunum bileşeni — aksiyonu (onAddToBag) ve durumu props ile alır.
 */
export default function PurchaseSummary({
  productName,
  thumbnail,
  selectionLabel,
  variant,
  loading = false,
  onAddToBag,
}) {
  const reduceMotion = useReducedMotion();
  const available = Boolean(variant?.available);
  const price = variant ? formatPrice(variant.price, variant.currency) : '—';
  // Fiyat ancak geçerli + stokta variant varsa eklenebilir
  const canAdd = available && !loading;

  return (
    <motion.div
      className={styles.bar}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 24, mass: 0.9, delay: 0.4 }}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.thumb}>
            {thumbnail ? <img src={thumbnail} alt="" /> : <div className={styles.thumbFallback} aria-hidden="true" />}
          </div>
          <div className={styles.summary}>
            <p className={styles.name}>{productName}</p>
            {selectionLabel && <p className={styles.selection}>{selectionLabel}</p>}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.perks}>
            <span className={styles.perk}><TruckIcon /> Free delivery</span>
            <span className={styles.perk}><StoreIcon /> In-store pickup</span>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.price}>{price}</span>
            {!variant && <span className={styles.note}>This combination is unavailable</span>}
            {variant && !available && <span className={styles.note}>Out of stock</span>}
          </div>

          <button
            type="button"
            className={styles.addBtn}
            disabled={!canAdd}
            onClick={onAddToBag}
          >
            {loading ? 'Adding…' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
