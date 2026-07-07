import Card from './Card';
import airImage from '../../../assets/air.jpg';
import macbookProImage from '../../../assets/macbook-pro.png';

export default {
  title: 'Common/Card',
  component: Card,
};

export const LightWithCta = {
  args: {
    image: airImage,
    imageAlt: 'MacBook Air M5 Sky Blue',
    eyebrow: 'MacBook Air',
    title: 'MacBook Air',
    subtitle: 'Jet gibi. Ve yok gibi.',
    price: 'Başlangıç Fiyatı : 57.999 TL',
    ctaLabel: 'Satın Al',
    ctaHref: '#',
    tone: 'light',
  },
};

export const DarkNoCta = {
  args: {
    image: macbookProImage,
    imageAlt: 'MacBook Pro M5',
    eyebrow: 'MacBook Pro',
    title: 'MacBook Pro',
    subtitle: 'M5 çipiyle çarpıcı performans.',
    price: 'Başlangıç Fiyatı : 74.999 TL',
    tone: 'dark',
  },
};

export const MinimalNoSubtitleNoPrice = {
  args: {
    image: airImage,
    imageAlt: 'MacBook Air M5 Sky Blue',
    title: 'MacBook Air',
    tone: 'light',
  },
};
