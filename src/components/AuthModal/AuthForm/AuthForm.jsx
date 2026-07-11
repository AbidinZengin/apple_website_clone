import styles from './AuthForm.module.css';

/**
 * Login/Register görünümlerinin ortak düzeni: başlık, alt metin,
 * alanlar (children), hata satırı, CTA ve görünüm değiştirme footer'ı.
 * Alan değerleri uncontrolled tutulur; submit'te FormData'dan okunup
 * düz obje olarak onSubmit'e verilir.
 */
export default function AuthForm({
  title,
  subtitle,
  submitLabel,
  footerPrompt,
  footerActionLabel,
  onSwitchView,
  onSubmit,
  error,
  submitting,
  children,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    onSubmit?.(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title} id="auth-modal-title">
        {title}
      </h2>
      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.fields}>{children}</div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={submitting} aria-busy={submitting}>
        {submitting ? <span className={styles.spinner} aria-label="Gönderiliyor" /> : submitLabel}
      </button>

      <p className={styles.footer}>
        {footerPrompt}{' '}
        <button type="button" className={styles.switchLink} onClick={onSwitchView}>
          {footerActionLabel}
        </button>
      </p>
    </form>
  );
}
