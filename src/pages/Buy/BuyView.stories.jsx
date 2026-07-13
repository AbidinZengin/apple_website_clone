import { useMemo, useState } from 'react';
import BuyView from './BuyView';
import { resolveVariant, imagesForColor } from './buy.service';
import iphoneImg from '../../assets/iphone/iphone-hero.jpg';

/**
 * Buy sayfasının tam layout doğrulaması — BuyView saf sunum olduğu için
 * mock ürün modeliyle (buy.service çıktı formatında) beslenir, ağ isteği yoktur.
 * Renk/depolama seçimi story içinde canlıdır: fiyat ve galeri seçime göre güncellenir.
 */
export default {
  title: 'Buy/BuyView',
  component: BuyView,
  parameters: { layout: 'fullscreen' },
};

const COLORS = [
  { id: 1, label: 'Cosmic Orange', hex: '#F77E2D' },
  { id: 2, label: 'Deep Blue', hex: '#32374A' },
  { id: 3, label: 'Silver', hex: '#C9CCCE' },
];
const STORAGES = [256, 512, 1024];

// Her renk × depolama kombinasyonu için variant üret (1TB Silver stok yok — pasif örnek)
const VARIANTS = COLORS.flatMap((c, ci) =>
  STORAGES.map((gb, si) => ({
    id: ci * 10 + si,
    colorId: c.id,
    storageGb: gb,
    price: 1099 + si * 200,
    currency: 'USD',
    available: !(c.id === 3 && gb === 1024),
    defaultVariant: c.id === 1 && gb === 256,
    colorName: c.label,
    hex: c.hex,
  }))
);

const IMAGES = COLORS.flatMap((c) =>
  [0, 1, 2].map((n) => ({ url: iphoneImg, alt: `${c.label} view ${n + 1}`, colorId: c.id, sortOrder: n, primary: n === 0 }))
);

const PRODUCT = {
  name: 'iPhone 17 Pro',
  optionGroups: [
    { id: 'color', label: 'Choose your color', type: 'swatch', options: COLORS.map((c) => ({ ...c, available: true })) },
    {
      id: 'storage',
      label: 'Choose your storage',
      type: 'tile',
      options: STORAGES.map((gb, si) => ({
        id: gb,
        label: gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`,
        priceLabel: `$${(1099 + si * 200).toLocaleString('en-US')}.00`,
        available: true,
      })),
    },
  ],
  variants: VARIANTS,
  images: IMAGES,
};

function Interactive() {
  const [selection, setSelection] = useState({ color: 1, storage: 256 });
  const variant = useMemo(() => resolveVariant(PRODUCT.variants, selection), [selection]);
  const galleryImages = useMemo(() => imagesForColor(PRODUCT.images, selection.color), [selection]);
  const selectionLabel = PRODUCT.optionGroups
    .map((g) => g.options.find((o) => o.id === selection[g.id])?.label)
    .filter(Boolean)
    .join(' · ');

  return (
    <BuyView
      name={PRODUCT.name}
      optionGroups={PRODUCT.optionGroups}
      selection={selection}
      variant={variant}
      galleryImages={galleryImages}
      selectionLabel={selectionLabel}
      onAxisChange={(axis, id) => setSelection((p) => ({ ...p, [axis]: id }))}
      onAddToBag={() => {}}
    />
  );
}

export const Default = { render: () => <Interactive /> };
