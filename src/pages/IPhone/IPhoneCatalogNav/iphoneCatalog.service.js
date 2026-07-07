import { STATIC_CATALOG_ITEMS, FALLBACK_PRODUCT_IMAGE } from './iphoneCatalog.data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GALLERY endpoint'i slug döndürmez; altText ürün adıyla birebir eşleştiği için
// href'i ondan üretiyoruz ("iPhone 17 Pro " -> "iphone-17-pro").
function slugify(text) {
  return text?.trim().toLowerCase().replace(/\s+/g, '-');
}

function mapImage(image) {
  const label = image.altText?.trim();
  return {
    id: image.id,
    label,
    sublabel: null,
    image: image.imageUrl || FALLBACK_PRODUCT_IMAGE,
    href: `/iphone/${slugify(label)}`,
  };
}

export async function getIphoneCatalog() {
  const res = await fetch(`${API_BASE_URL}/api/v1/iphone-images?imageType=GALLERY`);
  if (!res.ok) {
    throw new Error(`iPhone katalog isteği başarısız: ${res.status}`);
  }
  const images = await res.json();
  return [...images.map(mapImage), ...STATIC_CATALOG_ITEMS];
}
