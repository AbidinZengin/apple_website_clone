import { useNav } from '../Navbar/NavContext';
import AuthModal from './AuthModal';

/**
 * AuthModal'ın uygulamaya bağlanma noktası: açık/kapalı state'i NavContext'ten,
 * yüzey tonu aktif sayfanın temasından gelir. AuthModal'ın kendisi bağımsız kalır.
 */
export default function AuthModalHost() {
  const { isAuthOpen, closeAuth, theme } = useNav();
  return <AuthModal open={isAuthOpen} onClose={closeAuth} theme={theme} />;
}
