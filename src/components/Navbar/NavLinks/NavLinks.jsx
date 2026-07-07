import { useNav } from '../NavContext';
import { NAV_LINKS } from './navLinks.data';
import styles from './NavLinks.module.css';

export default function NavLinks() {
  const { activeMenu, setActiveMenu } = useNav();

  return (
    <ul className={styles.list} role="menubar">
      {NAV_LINKS.map(({ label, href, subMenu }) => (
        <li
          key={href}
          className={styles.item}
          onMouseEnter={() => setActiveMenu(subMenu ? label : null)}
          role="none"
        >
          <a
            href={href}
            className={`${styles.link} ${activeMenu === label ? styles.active : ''}`}
            role="menuitem"
            aria-haspopup={subMenu ? 'true' : undefined}
            aria-expanded={activeMenu === label ? 'true' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
