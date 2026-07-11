import { useRef, useState } from 'react';
import { useNav } from '../NavContext';
import { useAuth } from '../../../services/auth/AuthContext';
import { useCart } from '../../../services/cart/CartContext';
import AccountMenu from '../AccountMenu/AccountMenu';
import CartPanel from '../CartPanel/CartPanel';
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
  const { theme, openAuth, isCartOpen, toggleCart, closeCart } = useNav();
  const { user } = useAuth();
  const { cart, itemCount, loading, updateItemQuantity, removeItem, clearCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const accountRef = useRef(null);
  const cartRef = useRef(null);

  // Girişsiz: auth modal'ı açılır; girişli: hesap menüsü toggle edilir
  const handleAccountClick = () => {
    if (user) setMenuOpen((p) => !p);
    else openAuth();
  };

  // Sepet yalnızca login kullanıcı için; girişsiz tıklama auth modal'ına yönlendirir
  const handleBagClick = () => {
    if (user) toggleCart();
    else openAuth();
  };

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

      <div className={styles.cartWrapper} ref={cartRef}>
        <button
          className={styles.iconBtn}
          aria-label="Shopping Bag"
          aria-expanded={user ? isCartOpen : undefined}
          onClick={handleBagClick}
        >
          <BagIcon />
          {user && itemCount > 0 && <span className={styles.badge}>{itemCount > 9 ? '9+' : itemCount}</span>}
        </button>
        <CartPanel
          open={isCartOpen}
          onClose={closeCart}
          anchorRef={cartRef}
          cart={cart}
          loading={loading}
          onQuantityChange={updateItemQuantity}
          onRemove={removeItem}
          onClear={clearCart}
        />
      </div>

      <div className={styles.accountWrapper} ref={accountRef}>
        <button
          className={styles.iconBtn}
          aria-label="Account"
          aria-expanded={user ? menuOpen : undefined}
          onClick={handleAccountClick}
        >
          <AccountIcon />
        </button>
        <AccountMenu open={menuOpen} onClose={() => setMenuOpen(false)} anchorRef={accountRef} />
      </div>
    </div>
  );
}
