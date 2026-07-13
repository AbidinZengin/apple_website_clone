import BoxContent from './BoxContent';
import iphoneImg from '../../../assets/iphone/iphone-hero.jpg';
import cableImg from '../../../assets/iphone/usb-c-cable.png';

/**
 * "What's in the Box" bölümü — iki görsel kartı + çevre notu.
 * Mock, canlı kullanımla aynı: cihaz görseli + USB-C kablosu.
 */
export default {
  title: 'Buy/BoxContent',
  component: BoxContent,
  parameters: { layout: 'fullscreen' },
};

const ITEMS = [
  { image: iphoneImg, label: 'iPhone 17 Pro', alt: 'iPhone 17 Pro' },
  { image: cableImg, label: 'USB-C Charge Cable', alt: 'USB-C Charge Cable' },
];

const NOTE =
  'As part of Apple’s efforts to reach our environmental goals, iPhone does not include a power adapter or EarPods. Use your existing USB-C power adapter and headphones, or purchase them separately.';

export const Default = {
  render: () => (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px', background: '#fbfbfd' }}>
      <BoxContent items={ITEMS} note={NOTE} />
    </div>
  ),
};
