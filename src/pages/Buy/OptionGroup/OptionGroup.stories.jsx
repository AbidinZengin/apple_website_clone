import { useState } from 'react';
import OptionGroup from './OptionGroup';

/**
 * OptionGroup generic bir seçim eksenidir — swatch (renk) veya tile (depolama)
 * biçiminde render eder. Story'ler her iki biçimi ve pasif (stok yok) durumu kapsar.
 */
export default {
  title: 'Buy/OptionGroup',
  component: OptionGroup,
  parameters: { backgrounds: { default: 'light' } },
};

function Frame({ children }) {
  return <div style={{ maxWidth: 420, padding: 'var(--space-2xl)', background: '#fbfbfd' }}>{children}</div>;
}

function ColorsDemo() {
  const [value, setValue] = useState(1);
  return (
    <Frame>
      <OptionGroup
        label="Choose your color"
        type="swatch"
        value={value}
        onChange={setValue}
        options={[
          { id: 1, label: 'Cosmic Orange', hex: '#F77E2D', available: true },
          { id: 2, label: 'Deep Blue', hex: '#32374A', available: true },
          { id: 3, label: 'Silver', hex: '#F5F5F5', available: true },
          { id: 4, label: 'Natural (out of stock)', hex: '#C9C0B6', available: false },
        ]}
      />
    </Frame>
  );
}

function StorageDemo() {
  const [value, setValue] = useState(256);
  return (
    <Frame>
      <OptionGroup
        label="Choose your storage"
        type="tile"
        value={value}
        onChange={setValue}
        options={[
          { id: 256, label: '256GB', priceLabel: '$1,099.00', available: true },
          { id: 512, label: '512GB', priceLabel: '$1,299.00', available: true },
          { id: 1024, label: '1TB', priceLabel: '$1,499.00', available: false },
        ]}
      />
    </Frame>
  );
}

export const Colors = { render: () => <ColorsDemo /> };
export const Storage = { render: () => <StorageDemo /> };
