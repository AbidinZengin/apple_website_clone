import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as cartService from './cart.service';
import { useAuth } from '../auth/AuthContext';

const CartContext = createContext(null);
const EMPTY_CART = { items: [], subtotal: 0, currency: 'USD' };

/**
 * Sepet state'i — yalnızca login kullanıcı için (AuthContext'e bağlı).
 * user girişte sepet çekilir, çıkışta temizlenir. Yazma işlemleri backend'in
 * döndürdüğü güncel sepetle state'i doğrudan değiştirir (contract adım 9).
 * 401/oturum düşüşü httpClient + AuthContext tarafından merkezi ele alınır.
 */
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(EMPTY_CART);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setCart(EMPTY_CART);
      setError(null);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    cartService
      .getCart()
      .then((c) => !cancelled && setCart(c))
      .catch((e) => !cancelled && setError(e))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Tüm mutasyonlar aynı iskelet: yanıttaki güncel sepeti state'e yaz, hatayı yakala.
  const runMutation = useCallback(async (fn) => {
    setError(null);
    try {
      const updated = await fn();
      setCart(updated);
      return updated;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const addItem = useCallback((payload) => runMutation(() => cartService.addItem(payload)), [runMutation]);
  const updateItemQuantity = useCallback(
    (id, quantity) => runMutation(() => cartService.updateItemQuantity(id, quantity)),
    [runMutation]
  );
  const removeItem = useCallback((id) => runMutation(() => cartService.removeItem(id)), [runMutation]);
  const clearCart = useCallback(() => runMutation(() => cartService.clearCart()), [runMutation]);

  const itemCount = useMemo(() => cart.items.reduce((n, it) => n + it.quantity, 0), [cart.items]);

  const value = useMemo(
    () => ({ cart, itemCount, loading, error, addItem, updateItemQuantity, removeItem, clearCart }),
    [cart, itemCount, loading, error, addItem, updateItemQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
