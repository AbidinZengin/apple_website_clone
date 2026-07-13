/**
 * Para birimi biçimleme — backend fiyatları sayı + currency (şu an "USD") döner.
 * CartPanel'deki yerel biçimleyiciyle aynı davranış; buy akışı ve sepet tek yerden beslensin diye ayrıldı.
 * Geçersiz currency kodunda Intl patlamasın diye sayısal fallback verilir.
 */
export function formatPrice(amount, currency = 'USD') {
  const value = typeof amount === 'number' && Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}
