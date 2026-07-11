import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './CartPanel.module.css';

// Backend fiyatları USD gelir (contract notu). Intl ile para birimine göre biçimlenir.
function formatPrice(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount ?? 0);
  } catch {
    return `${(amount ?? 0).toFixed(2)} ${currency}`;
  }
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="12" height="12">
      <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CartRow({ item, currency, onQuantityChange, onRemove }) {
  const unavailable = !item.available;
  // Miktar 1'den aşağı düşerse satır silinir (contract'ta 0 miktar tanımsız).
  const decrement = () => (item.quantity <= 1 ? onRemove(item.id) : onQuantityChange(item.id, item.quantity - 1));
  const increment = () => onQuantityChange(item.id, item.quantity + 1);

  return (
    <li className={`${styles.row} ${unavailable ? styles.rowUnavailable : ''}`}>
      <div className={styles.thumb}>
        {item.thumbnail ? <img src={item.thumbnail} alt="" /> : <div className={styles.thumbFallback} aria-hidden="true" />}
      </div>

      <div className={styles.info}>
        <p className={styles.name} title={item.name}>{item.name}</p>
        {item.variant && <p className={styles.variant}>{item.variant}</p>}

        {unavailable ? (
          <p className={styles.unavailable}>Artık mevcut değil — kaldırmanızı öneririz</p>
        ) : (
          <div className={styles.qty}>
            <button type="button" className={styles.qtyBtn} onClick={decrement} aria-label="Adet azalt">−</button>
            <span className={styles.qtyValue} aria-label={`Adet: ${item.quantity}`}>{item.quantity}</span>
            <button type="button" className={styles.qtyBtn} onClick={increment} aria-label="Adet artır">+</button>
          </div>
        )}
      </div>

      <div className={styles.rowRight}>
        <span className={styles.lineTotal}>{formatPrice(item.lineTotal, currency)}</span>
        <button type="button" className={styles.remove} onClick={() => onRemove(item.id)} aria-label={`${item.name} ürününü kaldır`}>
          <CloseIcon />
        </button>
      </div>
    </li>
  );
}

/**
 * Bag ikonu altında açılan mini-sepet. AccountMenu ile aynı konum/kapanma deseni
 * (ikonun sağ kenarına hizalı, sola doğru açılır; dışarı tıkla / Escape kapatır).
 * Sunum bileşeni: veriyi ve aksiyonları props ile alır — bağlama NavActions'ta useCart() ile yapılır.
 */
export default function CartPanel({
  open,
  onClose,
  anchorRef,
  cart,
  loading = false,
  onQuantityChange,
  onRemove,
  onClear,
  onCheckout,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (anchorRef?.current && !anchorRef.current.contains(e.target)) onClose();
    };
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, anchorRef]);

  const items = cart?.items ?? [];
  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.panel}
          role="dialog"
          aria-label="Sepet"
          initial={{ opacity: 0, scale: 0.82, x: 10, y: -14 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.86, x: 10, y: -14 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.9 }}
        >
          <header className={styles.header}>
            <h2 className={styles.title}>Sepet</h2>
            {!isEmpty && (
              <button type="button" className={styles.clear} onClick={onClear}>Temizle</button>
            )}
          </header>

          {loading && isEmpty ? (
            <p className={styles.state}>Yükleniyor…</p>
          ) : isEmpty ? (
            <p className={styles.state}>Sepetiniz boş.</p>
          ) : (
            <>
              <ul className={styles.list}>
                {items.map((item) => (
                  <CartRow
                    key={item.id}
                    item={item}
                    currency={cart.currency}
                    onQuantityChange={onQuantityChange}
                    onRemove={onRemove}
                  />
                ))}
              </ul>

              <footer className={styles.footer}>
                <div className={styles.subtotal}>
                  <span>Ara toplam</span>
                  <span className={styles.subtotalValue}>{formatPrice(cart.subtotal, cart.currency)}</span>
                </div>
                <button type="button" className={styles.checkout} onClick={onCheckout}>
                  Ödemeye geç
                </button>
              </footer>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
