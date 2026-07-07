/**
 * IPadAirShowcase — statik konfigürasyon.
 * Finish görselleri Apple'ın resmi store CDN'inden indirildi
 * (store.storeimages.cdn-apple.com — ipad-air-select-wifi-<renk>-202203, png-alpha).
 * `image: null` bırakılırsa DeviceVisual CSS tabanlı cihaz render'ına düşer.
 */
import finishBlue from '../../../assets/ipad-air/finish-blue.png';
import finishPurple from '../../../assets/ipad-air/finish-purple.png';
import finishStarlight from '../../../assets/ipad-air/finish-starlight.png';
import finishSpaceGray from '../../../assets/ipad-air/finish-space-gray.png';

// Proje standardı spring (bkz. .agents/Skills/MotionGuideline.md §4)
export const SPRING = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 };

export const FINISHES = [
  {
    id: 'blue',
    label: 'Blue',
    swatch: '#c2d4dc',
    body: '#c6d7de',
    camera: '#9db4bf',
    logo: '#a9c0ca',
    image: finishBlue,
  },
  {
    id: 'purple',
    label: 'Purple',
    swatch: '#d6cfe3',
    body: '#dad3e6',
    camera: '#b3a8cc',
    logo: '#c0b6d6',
    image: finishPurple,
  },
  {
    id: 'starlight',
    label: 'Starlight',
    swatch: '#ece5d4',
    body: '#efe8d8',
    camera: '#cfc5ab',
    logo: '#d9d0b9',
    image: finishStarlight,
  },
  {
    id: 'space-gray',
    label: 'Space Gray',
    swatch: '#4c4d51',
    body: '#4a4b4f',
    camera: '#333438',
    logo: '#5d5e63',
    image: finishSpaceGray,
  },
];

export const STORAGE_OPTIONS = [
  { id: '64', label: '64GB', price: 599 },
  { id: '256', label: '256GB', price: 749 },
];

export const SPECS = [
  { id: 'chip', value: 'M3', label: 'Apple silicon chip' },
  { id: 'display', value: '11″', label: 'Liquid Retina display' },
  { id: 'camera', value: '12MP', label: 'Wide back camera' },
  { id: 'battery', value: 'All day', label: 'Battery life' },
];
