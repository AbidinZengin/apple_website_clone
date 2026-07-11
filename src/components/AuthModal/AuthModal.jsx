import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import AuthSuccess from './AuthSuccess/AuthSuccess';
import styles from './AuthModal.module.css';

// Proje genelindeki paylaşılan spring standardı (bkz. MotionGuideline.md §4)
const SPRING = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 };
const EASE_APPLE = [0.32, 0.72, 0, 1];

// Onay görünümünün ekranda kalma süresi: tik çizimi (~0.5s) + okunacak kadar hold
const SUCCESS_HOLD_MS = 1400;

function AppleLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AuthModal({ open, onClose, theme = 'dark', initialView = 'login' }) {
  const [view, setView] = useState(initialView);
  const [successMessage, setSuccessMessage] = useState(null);
  const [viewHeight, setViewHeight] = useState(null);
  const measureRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Modal her açılışta başlangıç görünümüne döner, eski success durumu temizlenir
  useEffect(() => {
    if (open) {
      setView(initialView);
      setSuccessMessage(null);
      setViewHeight(null);
    }
  }, [open, initialView]);

  // Escape ile kapatma + açıkken arka sayfanın scroll kilidi
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
    };
  }, [open, onClose]);

  // Görünüm içeriğinin gerçek yüksekliğini izle — login ↔ register ↔ success
  // geçişlerinde kart yüksekliği zıplamak yerine spring ile uzar/kısalır
  useEffect(() => {
    if (!open) return undefined;
    const el = measureRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(() => setViewHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  // Onay gösterildikten sonra modal kendini kapatır (çıkış animasyonuyla)
  useEffect(() => {
    if (!successMessage) return undefined;
    const timer = setTimeout(onClose, SUCCESS_HOLD_MS);
    return () => clearTimeout(timer);
  }, [successMessage, onClose]);

  const tone = theme === 'light' ? 'light' : 'dark';
  const activeKey = successMessage ? 'success' : view;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`${styles.backdrop} ${styles[tone]}`}
          onClick={onClose}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_APPLE }}
        >
          <motion.section
            className={styles.card}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 48, scale: 0.96, transition: SPRING }
            }
            transition={{ ...SPRING, delay: 0.05 }}
          >
            <button type="button" className={styles.close} onClick={onClose} aria-label="Kapat">
              <CloseIcon />
            </button>

            <span className={styles.logo}>
              <AppleLogo />
            </span>

            <motion.div
              className={styles.viewClip}
              animate={{ height: viewHeight ?? 'auto' }}
              transition={reduceMotion ? { duration: 0 } : SPRING}
            >
              <div className={styles.viewWrap} ref={measureRef}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeKey}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: EASE_APPLE }}
                  >
                    {successMessage ? (
                      <AuthSuccess message={successMessage} />
                    ) : view === 'login' ? (
                      <LoginForm
                        onSwitchView={() => setView('register')}
                        onSuccess={() => setSuccessMessage('Giriş yapıldı')}
                      />
                    ) : (
                      <RegisterForm
                        onSwitchView={() => setView('login')}
                        onSuccess={() => setSuccessMessage('Hesabın oluşturuldu')}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
