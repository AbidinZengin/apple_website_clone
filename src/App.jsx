import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NavProvider } from './components/Navbar/NavContext';
import { AuthProvider } from './services/auth/AuthContext';
import { CartProvider } from './services/cart/CartContext';
import { getPageTheme, THEME_BACKGROUNDS } from './config/pageThemes';
import Navbar from './components/Navbar';
import AuthModalHost from './components/AuthModal/AuthModalHost';
import Home from './pages/Home/Home';
import IPhoneLineup from './pages/IPhone/IPhoneLineup';
import IPhone17Pro from './pages/IPhone/IPhone17Pro/IPhone17Pro';
import MacBookPro from './pages/Mac/MacBookPro/MacBookPro';
import IPadAir from './pages/IPadAir/IPadAir';
import IPadPro from './pages/IPadPro/IPadPro';
import AirPodsPro from './pages/AirPods/AirPodsPro/AirPodsPro';
import './styles/global.css';

export default function App() {
  const location = useLocation();
  const bgColor = THEME_BACKGROUNDS[getPageTheme(location.pathname)];

  return (
    <AuthProvider>
      <CartProvider>
      <NavProvider>
        <Navbar />
        <AuthModalHost />
      <motion.main
        style={{ paddingTop: '56px' }}
        animate={{ backgroundColor: bgColor }}
        transition={{ duration: 2, ease: [0.32, 0.72, 0, 1] }}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/home" element={<Home />} />
            <Route path="/iphone" element={<IPhoneLineup />} />
            <Route path="/iphone/iphone-17-pro" element={<IPhone17Pro />} />
            <Route path="/mac/macbook-pro" element={<MacBookPro />} />
            <Route path="/ipad/ipad-air" element={<IPadAir />} />
            <Route path="/ipad/ipad-pro" element={<IPadPro />} />
            <Route path="/airpods/airpods-pro" element={<AirPodsPro />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
        </motion.main>
      </NavProvider>
      </CartProvider>
    </AuthProvider>
  );
}
