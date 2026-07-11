import AuthModal from './AuthModal';
import { AuthProvider } from '../../services/auth/AuthContext';
import darkHero from '../../assets/macbook/macbook-pro-hero.png';
import lightHero from '../../assets/macbook/macbook-air-hero.jpg';

/**
 * Modal blur'lu backdrop ile sayfa ÜZERİNE açıldığı için story'lerde
 * arkada sahte bir ürün sayfası render edilir — blur ve scrim tonu
 * ancak arkasında içerik varken değerlendirilebilir.
 */
function FakePage({ tone, image, heading }) {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: dark ? '#000' : '#fbfbfd',
      }}
    >
      <h1
        style={{
          paddingTop: 'var(--space-5xl)',
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--font-size-headline)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          color: dark ? '#f5f5f7' : '#1d1d1f',
        }}
      >
        {heading}
      </h1>
      <img
        src={image}
        alt=""
        style={{ width: '640px', margin: 'var(--space-md) auto 0' }}
      />
    </div>
  );
}

export default {
  title: 'Components/AuthModal',
  component: AuthModal,
  parameters: { layout: 'fullscreen' },
  // Formlar useAuth() tükettiği için story'ler provider'la sarılır
  // (Storybook'ta token olmadığından açılışta ağ isteği atılmaz)
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
};

export const DarkLogin = {
  render: () => (
    <>
      <FakePage tone="dark" image={darkHero} heading="MacBook Pro" />
      <AuthModal open theme="dark" onClose={() => {}} />
    </>
  ),
};

export const LightLogin = {
  render: () => (
    <>
      <FakePage tone="light" image={lightHero} heading="MacBook Air" />
      <AuthModal open theme="light" onClose={() => {}} />
    </>
  ),
};

export const DarkRegister = {
  render: () => (
    <>
      <FakePage tone="dark" image={darkHero} heading="MacBook Pro" />
      <AuthModal open theme="dark" initialView="register" onClose={() => {}} />
    </>
  ),
};
