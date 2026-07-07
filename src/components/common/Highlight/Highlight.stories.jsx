import Highlight from './Highlight';
import iphoneImage from '../../../assets/iphone/iphone-hero.jpg';
import ipadImage from '../../../assets/ipad/ipad-air-screen.jpg';
import macbookImage from '../../../assets/macbook/macbook-pro-hero.png';
import finishBlue from '../../../assets/ipad/finish-blue.png';
import finishPurple from '../../../assets/ipad/finish-purple.png';
import finishSpaceGray from '../../../assets/ipad/finish-space-gray.png';
import finishStarlight from '../../../assets/ipad/finish-starlight.png';

export default {
  title: 'Common/Highlight',
  component: Highlight,
  parameters: { layout: 'fullscreen' },
};

/* ────────────────────────────────────────────────────────────────
   RENK AYARLARI — elle buradan değiştir.
   - tone: 'dark' | 'light'  → tüm bölümün açık/koyu teması
   - Her slide'a `background` verebilirsin (kartın arka planı):
       düz renk → '#1d1d1f'
       degrade  → 'linear-gradient(180deg, #2a2a2e, #0a0a0a)'
   ──────────────────────────────────────────────────────────────── */

// ── iPhone ──────────────────────────────────────────────────────
const iphoneSlides = [
  { id: 'design', caption: 'Tek parça gövde, sade ve dayanıklı bir tasarım anlayışıyla yeniden çizildi.', image: iphoneImage, imageAlt: 'Ürün tasarımı', background: '#1d1d1f' },
  { id: 'camera', caption: 'Kamera modülü artık gövdenin doğal bir uzantısı gibi duruyor.', image: iphoneImage, imageAlt: 'Kamera detayı', background: '#1d1d1f' },
  { id: 'chip', caption: 'Yeni çip, günlük kullanımda hissedilir bir hız farkı sunuyor.', image: iphoneImage, imageAlt: 'Çip performansı', background: '#1d1d1f' },
  { id: 'battery', caption: 'Pil ömrü, yoğun bir günü rahatlıkla karşılayacak şekilde geliştirildi.', image: iphoneImage, imageAlt: 'Pil ömrü', background: '#1d1d1f' },
  { id: 'satellite', caption: 'Uydu bağlantısı, çekim olmayan alanlarda da yanınızda.', image: iphoneImage, imageAlt: 'Uydu bağlantısı', background: '#1d1d1f' },
];

// ── iPad ────────────────────────────────────────────────────────
const ipadSlides = [
  { id: 'blue', caption: 'Mavi kaplama, mat bir yüzeyle birlikte geliyor.', image: finishBlue, imageAlt: 'Mavi kaplama', background: '#e8eef5' },
  { id: 'purple', caption: 'Mor ton, ışıkla birlikte değişen bir derinlik katıyor.', image: finishPurple, imageAlt: 'Mor kaplama', background: '#efeaf6' },
  { id: 'space-gray', caption: 'Uzay grisi, en sade ve klasik seçenek.', image: finishSpaceGray, imageAlt: 'Uzay grisi kaplama', background: '#ececee' },
  { id: 'starlight', caption: 'Starlight, açık ve sıcak bir yüzey sunuyor.', image: finishStarlight, imageAlt: 'Starlight kaplama', background: '#f6f2ec' },
  { id: 'screen', caption: 'Liquid Retina ekran, günlük içerikte bile fark yaratıyor.', image: ipadImage, imageAlt: 'iPad ekranı', background: '#111114' },
];

// ── MacBook ─────────────────────────────────────────────────────
const macbookSlides = [
  { id: 'chip', caption: 'M-serisi çip, sessiz çalışırken bile güçlü.', image: macbookImage, imageAlt: 'MacBook Pro', background: '#0a0a0a' },
  { id: 'display', caption: 'Liquid Retina XDR ekran, gerçek siyah ve parlak beyaz.', image: macbookImage, imageAlt: 'MacBook ekranı', background: '#0a0a0a' },
  { id: 'battery', caption: 'Bir günü fişe girmeden bitir.', image: macbookImage, imageAlt: 'Pil ömrü', background: '#0a0a0a' },
];

export const IPhone = {
  args: {
    title: 'iPhone. Öne çıkanlar.',
    filmLabel: 'Watch the film',
    filmHref: '#',
    slides: iphoneSlides,
    tone: 'dark',
  },
};

export const IPad = {
  args: {
    title: 'iPad. Renk seçenekleri.',
    slides: ipadSlides,
    tone: 'light',
    autoPlayInterval: 5000,
  },
};

export const MacBook = {
  args: {
    title: 'MacBook Pro. Öne çıkanlar.',
    filmLabel: 'Watch the film',
    filmHref: '#',
    slides: macbookSlides,
    tone: 'dark',
  },
};
