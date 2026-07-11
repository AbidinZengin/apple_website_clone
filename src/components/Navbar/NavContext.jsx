import { createContext, useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageTheme } from '../../config/pageThemes';

const NavContext = createContext(null);

export function NavProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const theme = getPageTheme(location.pathname);

  const toggleDrawer = useCallback(() => setIsDrawerOpen(p => !p), []);
  const closeDrawer  = useCallback(() => setIsDrawerOpen(false), []);
  const closeMenu    = useCallback(() => setActiveMenu(null), []);
  const openAuth     = useCallback(() => setIsAuthOpen(true), []);
  const closeAuth    = useCallback(() => setIsAuthOpen(false), []);
  const openCart     = useCallback(() => setIsCartOpen(true), []);
  const closeCart    = useCallback(() => setIsCartOpen(false), []);
  const toggleCart   = useCallback(() => setIsCartOpen(p => !p), []);

  return (
    <NavContext.Provider value={{
      isDrawerOpen,
      toggleDrawer,
      closeDrawer,
      activeMenu,
      setActiveMenu,
      closeMenu,
      isAuthOpen,
      openAuth,
      closeAuth,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      theme,
    }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used inside NavProvider');
  return ctx;
};
