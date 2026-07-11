export const IPHONE_17_PRO_HERO = {
  eyebrow: 'iPhone 17 Pro',
  headlinePlain: 'Forged in orange. ',
  headlineAccent: 'Built for Pro.',
  subheadline: 'Aluminum unibody. Vapor-chamber cooling. A19 Pro inside.',
  imageAlt: 'iPhone 17 Pro, Cosmic Orange',
  price: {
    from: 'From $1099',
    installment: 'or $45.79/mo. for 24 mo.',
    cta: 'Buy',
  },
  // Sepete ekleme yükü (contract: POST /api/cart/items { productType, variantId, quantity }).
  // TODO(contract): variantId şu an sabit placeholder — gerçek değeri
  // GET /api/product/iphone/slug/iphone-17-pro -> variants[].id 'den seçilecek.
  purchase: {
    productType: 'iphone',
    variantId: 1,
  },
  colors: [
    { name: 'Cosmic Orange', hex: '#F77E2D' },
    { name: 'Deep Blue', hex: '#32374A' },
    { name: 'Silver', hex: '#F5F5F5' },
  ],
};
