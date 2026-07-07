import { FALLBACK_PRODUCT_IMAGE } from '../IPhoneCatalogNav/iphoneCatalog.data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function mapProduct(product) {
  return {
    id: product.id,
    title: product.name,
    description: product.description,
    price: `From $${Math.round(product.startingPrice)}`,
    href: `/iphone/${product.slug}`,
    image: product.primaryImageUrl || FALLBACK_PRODUCT_IMAGE,
    colors: (product.colors ?? []).map((c) => c.hexCode),
  };
}

export async function getExploreLineup() {
  const res = await fetch(`${API_BASE_URL}/api/product/iphone`);
  if (!res.ok) {
    throw new Error(`iPhone lineup isteği başarısız: ${res.status}`);
  }
  const products = await res.json();
  return products.map(mapProduct);
}
4