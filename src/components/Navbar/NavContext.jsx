import { createContext, useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageTheme } from '../../config/pageThemes';

const NavContext = createContext(null);

export function NavProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const theme = getPageTheme(location.pathname);

  const toggleDrawer = useCallback(() => setIsDrawerOpen(p => !p), []);
  const closeDrawer  = useCallback(() => setIsDrawerOpen(false), []);
  const closeMenu    = useCallback(() => setActiveMenu(null), []);

  return (
    <NavContext.Provider value={{
      isDrawerOpen,
      toggleDrawer,
      closeDrawer,
      activeMenu,
      setActiveMenu,
      closeMenu,
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
