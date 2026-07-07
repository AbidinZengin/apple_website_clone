import { useNav } from '../NavContext';
import styles from './NavActions.module.css';

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11 11L14.5 14.5M7 12.5C4.01472 12.5 1.5 9.98528 1.5 7C1.5 4.01472 4.01472 1.5 7 1.5C9.98528 1.5 12.5 4.01472 12.5 7C12.5 9.98528 9.98528 12.5 7 12.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.5 5V4C5.5 2.61929 6.61929 1.5 8 1.5C9.38071 1.5 10.5 2.61929 10.5 4V5M2.5 6H13.5L12.5 14H3.5L2.5 6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NavActions() {
  const { theme } = useNav();

  return (
    <div className={styles.actions}>
      <div className={styles.searchWrapper}>
        <input
          key={theme}
          type="search"
          placeholder="Search..."
          className={styles.searchInput}
          aria-label="Search apple.com"
        />
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
      </div>

      <button className={styles.iconBtn} aria-label="Shopping Bag">
        <BagIcon />
      </button>

      <button className={styles.iconBtn} aria-label="Account">
        <AccountIcon />
      </button>
    </div>
  );
}
