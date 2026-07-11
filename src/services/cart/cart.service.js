import { request } from '../api/httpClient';

// Backend sözleşmesi (session JWT). Yazma işlemleri güncel sepeti döndürür,
// bu yüzden hepsi toCart ile aynı UI modeline çevrilir ve state doğrudan ondan güncellenir.
const CART = '/api/cart';
const CART_ITEMS = '/api/cart/items';

/**
 * Frontend'in beklediği veri şekli:
 *
 *   Cart      = { items: CartItem[], subtotal: number, currency: string }
 *   CartItem  = { id, productType, variantId, name, variant, unitPrice, quantity, lineTotal, available, thumbnail }
 *
 * Fiyatlar sayı ve para birimi şu an "USD" gelir; TL'ye çevirme + biçimleme UI'da yapılır.
 * available=false: varyant sepete eklendikten sonra silinmiş/pasifleşmiş —
 * bu satırda unitPrice/lineTotal 0 döner; UI uyarı gösterip satırın silinmesini önerir.
 */

/**
 * Backend sepet-satırı DTO'su → UI CartItem eşlemesi.
 * Beklenen şekle uymayan satır null döner ve toCart tarafından elenir,
 * böylece tek bozuk satır tüm sepeti düşürmez (bkz. auth.service.toAuthUser).
 * Alan adı belirsizlikleri (name/thumbnail) burada tek yerde toplanır — contract netleşince sadeleşir.
 */
function toCartItem(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const id = raw.id ?? raw.itemId;
  const unitPrice = raw.unitPrice ?? raw.price;
  const quantity = raw.quantity ?? raw.qty ?? 1;

  if (id == null || typeof unitPrice !== 'number') return null;

  const safeQty = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;

  return {
    id: String(id),
    productType: raw.productType ?? null,
    variantId: raw.variantId ?? null,
    name: raw.name ?? raw.productName ?? raw.title ?? '',
    variant: raw.variant ?? raw.variantName ?? raw.option ?? '',
    unitPrice,
    quantity: safeQty,
    lineTotal: typeof raw.lineTotal === 'number' ? raw.lineTotal : unitPrice * safeQty,
    available: raw.available !== false, // yalnızca açıkça false ise pasif say
    thumbnail: raw.thumbnail ?? raw.image ?? raw.imageUrl ?? null,
  };
}

/**
 * Backend sepet DTO'su → UI Cart eşlemesi.
 * subtotal backend'den (total/subtotal/grandTotal) gelmezse satır toplamlarından hesaplanır.
 */
export function toCart(raw) {
  const rawItems = Array.isArray(raw?.items) ? raw.items : Array.isArray(raw) ? raw : [];
  const items = rawItems.map(toCartItem).filter(Boolean);

  const backendTotal = raw?.subtotal ?? raw?.total ?? raw?.grandTotal;
  const subtotal =
    typeof backendTotal === 'number'
      ? backendTotal
      : items.reduce((sum, it) => sum + it.lineTotal, 0);

  return {
    items,
    subtotal,
    currency: typeof raw?.currency === 'string' ? raw.currency : 'USD',
  };
}

/**
 * Login kullanıcının sepetini getirir (JWT httpClient tarafından eklenir).
 * Anonim/dolmuş token → httpClient 401'i yakalar, oturum düşer, login modal'ına dönülür.
 */
export async function getCart() {
  return toCart(await request(CART));
}

/** Sepete varyant ekler. Yanıt güncel sepeti döndürür. */
export async function addItem({ productType, variantId, quantity = 1 }) {
  return toCart(await request(CART_ITEMS, { method: 'POST', body: { productType, variantId, quantity } }));
}

/** Satır miktarını günceller (+/-). Yanıt güncel sepeti döndürür. */
export async function updateItemQuantity(itemId, quantity) {
  return toCart(await request(`${CART_ITEMS}/${itemId}`, { method: 'PUT', body: { quantity } }));
}

/** Tek satırı siler. Yanıt güncel sepeti döndürür. */
export async function removeItem(itemId) {
  return toCart(await request(`${CART_ITEMS}/${itemId}`, { method: 'DELETE' }));
}

/** Sepeti tamamen boşaltır. Yanıt boş sepeti döndürür. */
export async function clearCart() {
  return toCart(await request(CART, { method: 'DELETE' }));
}
