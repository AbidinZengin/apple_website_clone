import styles from './NavLogo.module.css';

export default function NavLogo() {
  return (
    <a href="#" className={styles.logo} aria-label="Apple">
      <i 
        className={`fa-brands fa-apple ${styles.icon}`} 
        style={{ fontSize: '20px' }}
        aria-hidden="true"
      ></i>
    </a>
  );
}