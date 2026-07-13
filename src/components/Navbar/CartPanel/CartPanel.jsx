import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './CartPanel.module.css';

function TrashIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
      <path
        d="M2.5 4h11M6 4V2.5h4V4M12.5 4l-.6 9.5H4.1L3.5 4M6.5 6.5v5M9.5 6.5v5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Bir sepet satırı = 4 sütunlu grid'in (ad · adet · fiyat · sil) bir kaydı.
 * Ürün adı uzun olduğunda (GB · renk · model) ad hücresi çok satıra sararak
 * aşağı uzar; satır grid'i `align-items: center` olduğu için Adet/Fiyat/Sil
 * sütunları o uzayan satırın dikey ortasında kalır (kullanıcı kuralı).
 */
function CartRow({ item, currency, onQuantityChange, onRemove }) {
  const unavailable = !item.available;
  // Miktar 1'den aşağı düşerse satır silinir (contract'ta 0 miktar tanımsız).
  const decrement = () => (item.quantity <= 1 ? onRemove(item.id) : onQuantityChange(item.id, item.quantity - 1));
  const increment = () => onQuantityChange(item.id, item.quantity + 1);

  return (
    <li className={`${styles.row} ${unavailable ? styles.rowUnavailable : ''}`}>
      <div className={styles.product}>
        <div className={styles.thumb}>
          {item.thumbnail ? <img src={item.thumbnail} alt="" /> : <div className={styles.thumbFallback} aria-hidden="true" />}
        </div>
        <div className={styles.productText}>
          <p className={styles.name}>{item.name}</p>
          {item.variant && <p className={styles.variant}>{item.variant}</p>}
          {unavailable && <p className={styles.unavailable}>No longer available</p>}
        </div>
      </div>

      <div className={styles.numberCell}>
        {unavailable ? (
          <span className={styles.dash} aria-hidden="true">—</span>
        ) : (
          <div className={styles.qty}>
            <button type="button" className={styles.qtyBtn} onClick={decrement} aria-label="Decrease quantity">−</button>
            <span className={styles.qtyValue} aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
            <button type="button" className={styles.qtyBtn} onClick={increment} aria-label="Increase quantity">+</button>
          </div>
        )}
      </div>

      <div className={styles.priceCell}>
        <span className={styles.lineTotal}>{formatPrice(item.lineTotal, currency)}</span>
      </div>

      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        <TrashIcon />
      </button>
    </li>
  );
}

/**
 * Bag ikonu altında açılan mini-sepet — 3 sütunlu sipariş tablosu
 * (Product name · Number · Price) + sil. AccountMenu ile aynı konum/kapanma
 * deseni (ikonun sağ kenarına hizalı, sola açılır; dış tıklama / Escape kapatır).
 * Sunum bileşeni: veri ve aksiyonlar props ile gelir — bağlama NavActions'ta useCart() ile yapılır.
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
          aria-label="Orders"
          initial={{ opacity: 0, scale: 0.82, x: 10, y: -14 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.86, x: 10, y: -14 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.9 }}
        >
          <header className={styles.titleBar}>
            <h2 className={styles.title}>Orders</h2>
            {!isEmpty && (
              <button type="button" className={styles.clear} onClick={onClear}>Clear</button>
            )}
          </header>

          {loading && isEmpty ? (
            <p className={styles.state}>Loading…</p>
          ) : isEmpty ? (
            <p className={styles.state}>Your bag is empty.</p>
          ) : (
            <>
              <div className={styles.columns} aria-hidden="true">
                <span>Product name</span>
                <span className={styles.colNumber}>Number</span>
                <span className={styles.colPrice}>Price</span>
                <span />
              </div>

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
                <div className={styles.total}>
                  <span className={styles.totalLabel}>Total Price</span>
                  <span className={styles.totalValue}>{formatPrice(cart.subtotal, cart.currency)}</span>
                </div>
                <button type="button" className={styles.checkout} onClick={onCheckout}>
                  Buy
                </button>
              </footer>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
