import heroLottie from '../../../assets/airpods-pro/hero.json?url';
import flipLottie from '../../../assets/airpods-pro/flip.json?url';
import explodeTipsLottie from '../../../assets/airpods-pro/explode-tips.json?url';
import flipNcLottie from '../../../assets/airpods-pro/flip-nc.json?url';
import transparencyLottie from '../../../assets/airpods-pro/transparency.json?url';
import headLottie from '../../../assets/airpods-pro/head.json?url';

export const LOTTIES = {
  hero: heroLottie,
  flip: flipLottie,
  explodeTips: explodeTipsLottie,
  flipNc: flipNcLottie,
  transparency: transparencyLottie,
  head: headLottie,
};

export const HERO = {
  title: 'AirPods Pro',
  filmLink: 'Watch the film',
};

// Giriş pin'inde sırayla beliren dört başlık (referansla birebir).
export const INTRO = {
  headlines: [
    'Active Noise Cancellation for immersive sound.',
    'Transparency mode for hearing what’s happening around you.',
    'A customizable fit for all-day comfort.',
    'Magic like you’ve never heard.',
  ],
};

export const COMFORT = {
  eyebrow: 'Comfort',
  headline: 'Arrival of the fittest.',
  intro:
    'We refined the details of comfort, creating a new class of in-ear headphones with a customizable fit that forms an exceptional seal for Active Noise Cancellation. You’ll feel your music, not your headphones.',
  sizes: ['Large', 'Medium', 'Small'],
  captions: [
    'Choose from three sizes of soft, flexible silicone tips that click into place.',
    'These internally tapered tips conform to your ear shape, keeping AirPods Pro secure. And with vents helping equalize pressure, you feel like there’s nothing in your ears.',
  ],
};

export const NOISE_CANCELLATION = {
  eyebrow: 'Active Noise Cancellation',
  headline: 'Sound that cuts out the noise.',
  intro:
    'AirPods Pro are the only in-ear headphones with Active Noise Cancellation that continuously adapts to the geometry of your ear and the fit of the ear tips — blocking out the world so you can focus on what you’re listening to.',
  // Animasyon oynarken üzerinden akan anlatım metinleri.
  overlays: [
    { text: 'An outward-facing microphone detects external sound.', accent: null, suffix: '' },
    {
      text: 'AirPods Pro then counter it with equal ',
      accent: 'anti-noise',
      suffix: ', cancelling the external sound before you hear it.',
    },
  ],
  features: [
    {
      text: 'An inward-facing microphone listens inside your ear for unwanted sound, which is also eliminated with ',
      accent: 'anti-noise',
      suffix: '.',
    },
    {
      text: 'Noise cancellation is continuously adjusted at 200 times per second for truly immersive sound, so you’re fully tuned in to your music, podcasts, and calls.',
      accent: null,
      suffix: '',
    },
  ],
};

export const TRANSPARENCY = {
  headline: 'Transparency mode for hearing what’s happening around you.',
  caption:
    'Want to hear what’s happening around you? Just press and hold the force sensor on the stem to jump between Active Noise Cancellation and Transparency mode — which lets outside sound in, and allows things to sound and feel natural when you’re talking to people nearby.',
};

// Referans sitede Tech Specs yalnızca nav linki; içerik Apple'ın resmi
// AirPods Pro (2019) spesifikasyonlarından derlendi (kullanıcı talebi).
export const TECH_SPECS = {
  title: 'Tech Specs',
  groups: [
    {
      name: 'Audio Technology',
      items: [
        'Active Noise Cancellation',
        'Transparency mode',
        'Adaptive EQ',
        'Custom high-excursion Apple driver',
        'High dynamic range amplifier',
      ],
    },
    {
      name: 'Sensors',
      items: [
        'Dual beamforming microphones',
        'Inward-facing microphone',
        'Dual optical sensors',
        'Motion-detecting accelerometer',
        'Speech-detecting accelerometer',
        'Force sensor',
      ],
    },
    {
      name: 'Chip',
      items: ['H1-based System in Package'],
    },
    {
      name: 'Battery',
      items: [
        'Up to 4.5 hours of listening time with Active Noise Cancellation on',
        'More than 24 hours of listening time with the Wireless Charging Case',
      ],
    },
    {
      name: 'Connectivity',
      items: ['Bluetooth 5.0'],
    },
    {
      name: 'Water Resistance',
      items: ['Sweat and water resistant (IPX4)'],
    },
  ],
};
