import { useRef } from 'react';
import CartPanel from './CartPanel';

/**
 * CartPanel sunum bileşenidir — veriyi props ile alır, ağ isteği atmaz.
 * Story'ler mock sepetle üç durumu kapsar: dolu, boş, uygun-değil satır.
 * Panel absolute konumlandığı için nav-actions bağlamını taklit eden koyu
 * bir kapsayıcı içinde, sağ üstte bir çapa (bag butonu) ile render edilir.
 */
function Stage({ children }) {
  const anchorRef = useRef(null);
  return (
    <div style={{ minHeight: 480, background: '#000', padding: 'var(--space-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div ref={anchorRef} style={{ position: 'relative' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.1)',
            }}
          />
          {children(anchorRef)}
        </div>
      </div>
    </div>
  );
}

const FILLED_CART = {
  currency: 'USD',
  subtotal: 3196,
  items: [
    {
      id: '1',
      name: 'iPhone 17 Pro',
      variant: '256GB · Titanyum Mavi',
      unitPrice: 1199,
      quantity: 1,
      lineTotal: 1199,
      available: true,
      thumbnail: null,
    },
    {
      id: '2',
      name: 'MacBook Pro 14"',
      variant: 'M4 Pro · Uzay Siyahı',
      unitPrice: 1999,
      quantity: 1,
      lineTotal: 1999,
      available: true,
      thumbnail: null,
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      variant: 'USB-C',
      unitPrice: 249,
      quantity: 2,
      lineTotal: 0,
      available: false,
      thumbnail: null,
    },
  ],
};

const EMPTY_CART = { currency: 'USD', subtotal: 0, items: [] };

const noop = () => {};

export default {
  title: 'Navbar/CartPanel',
  component: CartPanel,
  parameters: { layout: 'fullscreen' },
};

export const Filled = {
  render: () => (
    <Stage>
      {(anchorRef) => (
        <CartPanel
          open
          onClose={noop}
          anchorRef={anchorRef}
          cart={FILLED_CART}
          onQuantityChange={noop}
          onRemove={noop}
          onClear={noop}
          onCheckout={noop}
        />
      )}
    </Stage>
  ),
};

export const Empty = {
  render: () => (
    <Stage>
      {(anchorRef) => (
        <CartPanel open onClose={noop} anchorRef={anchorRef} cart={EMPTY_CART} />
      )}
    </Stage>
  ),
};
