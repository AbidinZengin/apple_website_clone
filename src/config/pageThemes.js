export const PAGE_THEMES = {
  '/': 'dark',
  '/iphone': 'light',
  '/iphone/iphone-17-pro': 'dark',
  '/ipad/ipad-air': 'light',
  '/ipad/ipad-pro': 'black',
  '/mac/macbook-pro': 'black',
  '/airpods/airpods-pro': 'black',
};

export const THEME_BACKGROUNDS = {
  dark: '#000',
  light: '#fff',
  black: '#000',
};

// Prefix bazlı temalar — dinamik route'lar (ör. /buy/:type/:slug) için.
// Tam eşleşme (PAGE_THEMES) önce denenir, sonra en uzun prefix.
const THEME_PREFIXES = [
  ['/buy', 'light'],
];

export function getPageTheme(pathname) {
  if (PAGE_THEMES[pathname]) return PAGE_THEMES[pathname];
  const prefix = THEME_PREFIXES.find(([p]) => pathname.startsWith(p));
  return prefix ? prefix[1] : 'dark';
}
