import iphoneImg from '../../../assets/iphone/iphone-hero.jpg';

// Backend /api/product/iphone yalnızca gerçek ürünleri döner (Compare, Accessories,
// Shop iPhone, iOS gibi yardımcı bağlantılar ürün değildir) — bunlar statik kalır.
export const STATIC_CATALOG_ITEMS = [
 
];

// Backend primaryImageUrl boş döndüğünde kullanılacak yedek görsel.
export const FALLBACK_PRODUCT_IMAGE = iphoneImg;
