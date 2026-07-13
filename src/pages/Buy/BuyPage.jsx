import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthContext';
import { useCart } from '../../services/cart/CartContext';
import { useNav } from '../../components/Navbar/NavContext';
import { getProductForPurchase, resolveVariant, imagesForColor } from './buy.service';
import BuyView from './BuyView';
import styles from './BuyPage.module.css';

/**
 * Generic satın-alma sayfası. Route: /buy/:productType/:slug
 * Backend'den ürünü çeker, seçim (renk + depolama) state'ini tutar, seçili
 * varyantı çözer ve sepete ekler. Login değilse AuthModal'a yönlendirir.
 */
export default function BuyPage() {
  const { productType, slug } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { openAuth, openCart } = useNav();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [selection, setSelection] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setProduct(null);
    getProductForPurchase(productType, slug)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setSelection(data.defaultSelection);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('Ürün yüklenemedi:', err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [productType, slug]);

  const variant = useMemo(
    () => (product ? resolveVariant(product.variants, selection) : null),
    [product, selection]
  );

  const galleryImages = useMemo(
    () => (product ? imagesForColor(product.images, selection?.color) : []),
    [product, selection?.color]
  );

  const setAxis = (axis, id) => setSelection((prev) => ({ ...prev, [axis]: id }));

  const handleAddToBag = async () => {
    if (!variant || !variant.available) return;
    if (!user) {
      openAuth();
      return;
    }
    setAdding(true);
    try {
      await addItem({ productType: product.productType, variantId: variant.id, quantity: 1 });
      openCart(); // hafif onay: mini sepeti aç
    } catch (err) {
      console.warn('Sepete eklenemedi:', err);
    } finally {
      setAdding(false);
    }
  };

  if (status === 'loading') {
    return <div className={styles.state}>Loading…</div>;
  }
  if (status === 'error' || !product) {
    return <div className={styles.state}>This product is currently unavailable. Please try again later.</div>;
  }

  // Her eksenden seçili option'ın etiketini topla (renk · depolama)
  const selectionLabel = product.optionGroups
    .map((g) => g.options.find((o) => o.id === selection?.[g.id])?.label)
    .filter(Boolean)
    .join(' · ');

  return (
    <BuyView
      name={product.name}
      optionGroups={product.optionGroups}
      selection={selection}
      variant={variant}
      galleryImages={galleryImages}
      selectionLabel={selectionLabel}
      adding={adding}
      onAxisChange={setAxis}
      onAddToBag={handleAddToBag}
    />
  );
}
