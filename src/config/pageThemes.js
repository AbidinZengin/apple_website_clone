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

export function getPageTheme(pathname) {
  return PAGE_THEMES[pathname] ?? 'dark';
}
