import { formatPrice } from '../../utils/formatPrice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Buy sayfası veri katmanı.
 *
 * Backend sözleşmesi:
 *   GET /api/product/{productType}/slug/{slug} -> DtoIPhoneDetail
 *     { name, slug, colors[], variants[], images[] }
 *     variant = { id, storageGb, color{id,colorName,hexCode}, price, currency,
 *                 stockQuantity, available, defaultVariant }
 *     image   = { imageUrl, altText, colorId, sortOrder, primary }
 *
 * Bu katman DTO'yu GENERIC bir konfigürasyon modeline çevirir: sayfa hiçbir
 * ürüne özel alan bilmez, yalnızca `optionGroups` (seçim eksenleri) + `variants`
 * (çözümleme tablosu) üzerinden çalışır. Yeni bir eksen (ör. MacBook çip/RAM)
 * eklemek yalnızca burada türetme eklemeyi gerektirir — UI değişmez (OCP).
 *
 * Storage etiketi: 1024GB ve katları TB olarak gösterilir (Apple deseni).
 */

function storageLabel(gb) {
  if (typeof gb !== 'number' || gb <= 0) return '';
  return gb >= 1024 && gb % 1024 === 0 ? `${gb / 1024}TB` : `${gb}GB`;
}

/** Backend variant DTO'su → UI variant. Şekle uymayan satır elenir (tek bozuk kayıt sayfayı düşürmesin). */
function toVariant(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = raw.id;
  const price = typeof raw.price === 'number' ? raw.price : Number(raw.price);
  const colorId = raw.color?.id ?? null;
  const storageGb = typeof raw.storageGb === 'number' ? raw.storageGb : null;
  if (id == null || colorId == null || storageGb == null || !Number.isFinite(price)) return null;

  const stock = Number.isFinite(raw.stockQuantity) ? raw.stockQuantity : null;
  const inStock = raw.available !== false && (stock == null || stock > 0);

  return {
    id,
    colorId,
    storageGb,
    price,
    currency: typeof raw.currency === 'string' ? raw.currency : 'USD',
    available: inStock,
    defaultVariant: raw.defaultVariant === true,
    colorName: raw.color?.colorName ?? '',
    hex: raw.color?.hexCode ?? '#999',
  };
}

function toImage(raw) {
  if (!raw || typeof raw !== 'object' || !raw.imageUrl) return null;
  return {
    url: raw.imageUrl,
    alt: raw.altText ?? '',
    colorId: raw.colorId ?? null,
    imageType: raw.imageType ?? null,
    sortOrder: Number.isFinite(raw.sortOrder) ? raw.sortOrder : 0,
    primary: raw.primary === true,
  };
}

/**
 * variants'tan seçim eksenlerini türetir. Bir option "available" sayılır
 * ancak o değeri taşıyan EN AZ BİR stokta variant varsa. Geçersiz kombinasyon
 * (seçili renk+depolama variant'ı yoksa) resolveVariant ile yakalanır.
 */
function buildOptionGroups(variants) {
  // Renkler — ilk görülme sırasını koru (backend sortOrder'ına güven)
  const colorMap = new Map();
  for (const v of variants) {
    if (!colorMap.has(v.colorId)) {
      colorMap.set(v.colorId, { id: v.colorId, label: v.colorName, hex: v.hex, available: false });
    }
    if (v.available) colorMap.get(v.colorId).available = true;
  }

  // Depolamalar — artan sırada
  const storageMap = new Map();
  for (const v of variants) {
    if (!storageMap.has(v.storageGb)) {
      storageMap.set(v.storageGb, { id: v.storageGb, label: storageLabel(v.storageGb), available: false, price: v.price, currency: v.currency });
    }
    const entry = storageMap.get(v.storageGb);
    if (v.available) entry.available = true;
    if (v.price < entry.price) entry.price = v.price; // temsili (en düşük) fiyat
  }
  const storageOptions = [...storageMap.values()]
    .sort((a, b) => a.id - b.id)
    .map((s) => ({ ...s, priceLabel: formatPrice(s.price, s.currency) }));

  return [
    { id: 'color', label: 'Choose your color', type: 'swatch', options: [...colorMap.values()] },
    { id: 'storage', label: 'Choose your storage', type: 'tile', options: storageOptions },
  ];
}

/** İlk açılış seçimi: defaultVariant, yoksa ilk stokta variant, yoksa ilk variant. */
function initialSelection(variants) {
  const def = variants.find((v) => v.defaultVariant) ?? variants.find((v) => v.available) ?? variants[0];
  return def ? { color: def.colorId, storage: def.storageGb } : { color: null, storage: null };
}

function mapDetail(dto, productType) {
  const variants = (Array.isArray(dto?.variants) ? dto.variants : []).map(toVariant).filter(Boolean);
  // Buy sayfası galerisi yalnızca BUY tipi görselleri kullanır (hero/gallery tipleri hariç).
  const allImages = (Array.isArray(dto?.images) ? dto.images : []).map(toImage).filter(Boolean);
  const buyImages = allImages.filter((img) => img.imageType === 'BUY');
  const images = buyImages.length > 0 ? buyImages : allImages;

  return {
    productType,
    slug: dto?.slug ?? '',
    name: dto?.name ?? '',
    currency: variants[0]?.currency ?? 'USD',
    variants,
    optionGroups: buildOptionGroups(variants),
    images,
    defaultSelection: initialSelection(variants),
  };
}

/** Backend'den ürünü çekip satın-alma modeline çevirir. */
export async function getProductForPurchase(productType, slug) {
  const res = await fetch(`${API_BASE_URL}/api/product/${productType}/slug/${slug}`);
  if (!res.ok) {
    throw new Error(`Ürün isteği başarısız: ${res.status}`);
  }
  return mapDetail(await res.json(), productType);
}

/** Seçili {color, storage} kombinasyonuna karşılık gelen variant'ı bulur (yoksa null). */
export function resolveVariant(variants, selection) {
  if (!selection) return null;
  return variants.find((v) => v.colorId === selection.color && v.storageGb === selection.storage) ?? null;
}

/** Seçili renge ait görseller (yoksa renksiz/primary görsellere düşer). sortOrder'a göre sıralı. */
export function imagesForColor(images, colorId) {
  const matched = images.filter((img) => img.colorId === colorId);
  const pool = matched.length > 0 ? matched : images;
  return [...pool].sort((a, b) => Number(b.primary) - Number(a.primary) || a.sortOrder - b.sortOrder);
}
