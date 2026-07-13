import { useRef } from 'react';
import { AuthContext } from '../../../services/auth/AuthContext';
import AccountMenu from './AccountMenu';

/**
 * AccountMenu useAuth() ile context'ten kullanıcıyı okur; burada ağ/isteği olmayan
 * sahte bir AuthContext değeri enjekte edilir. Panel absolute konumlandığı için
 * nav-actions bağlamını taklit eden koyu bir kapsayıcıda, sol üstteki ikon
 * çapasının hemen altında render edilir.
 */
const noop = () => {};

const MOCK_AUTH = {
  user: { username: 'abidin.zengin', role: 'USER' },
  logout: noop,
  login: noop,
  register: noop,
  initializing: false,
};

function Stage({ children }) {
  const anchorRef = useRef(null);
  return (
    <AuthContext.Provider value={MOCK_AUTH}>
      <div
        style={{
          minHeight: 420,
          background: '#000',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div ref={anchorRef} style={{ position: 'relative', width: 'fit-content' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.1)',
            }}
          />
          {children(anchorRef)}
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default {
  title: 'Navbar/AccountMenu',
  component: AccountMenu,
  parameters: { layout: 'fullscreen' },
};

export const Open = {
  render: () => (
    <Stage>{(anchorRef) => <AccountMenu open onClose={noop} anchorRef={anchorRef} />}</Stage>
  ),
};
