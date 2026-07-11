import styles from './AuthField.module.css';

export default function AuthField({ type = 'text', name, placeholder, autoComplete }) {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-label={placeholder}
    />
  );
}
