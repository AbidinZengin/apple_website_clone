import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../../services/auth/AuthContext';
import styles from './AccountMenu.module.css';

/**
 * Girişli kullanıcının hesap ikonu altında açılan mini menüsü.
 * Renkleri Navbar'ın tema değişkenlerinden (--mega-bg, --nav-text...) devralır,
 * bu yüzden light/dark sayfalarda otomatik uyumludur.
 * anchorRef: ikon + menüyü saran kapsayıcı — dış tıklama tespiti için.
 */
export default function AccountMenu({ open, onClose, anchorRef }) {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target)) onClose();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, anchorRef]);

  return (
    <AnimatePresence>
      {open && user && (
        <motion.div
          className={styles.menu}
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
        >
          <p className={styles.username} title={user.username}>
            {user.username}
          </p>
          <div className={styles.divider} />
          <button
            type="button"
            className={styles.item}
            onClick={() => {
              logout();
              onClose();
            }}
          >
            Çıkış Yap
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
