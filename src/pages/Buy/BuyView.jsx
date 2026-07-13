import { motion, useReducedMotion } from 'framer-motion';
import ProductGallery from './ProductGallery/ProductGallery';
import OptionGroup from './OptionGroup/OptionGroup';
import BoxContent from './BoxContent/BoxContent';
import PurchaseSummary from './PurchaseSummary/PurchaseSummary';
import styles from './BuyPage.module.css';

// Sitedeki ortak giriş fiziği (IPadProHero ile aynı): spring + kademeli gecikme
const spring = { stiffness: 170, damping: 24, mass: 0.9 };

/**
 * Buy sayfasının saf sunum katmanı — ağ/oturum bilmez, her şeyi props ile alır.
 * BuyPage (container) veriyi ve aksiyonları besler; bu ayrım sayesinde tüm
 * layout Storybook'ta mock veriyle doğrulanabilir (visual-review gate).
 */
export default function BuyView({
  name,
  optionGroups,
  selection,
  variant,
  galleryImages,
  selectionLabel,
  adding = false,
  onAxisChange,
  onAddToBag,
}) {
  const reduceMotion = useReducedMotion();
  const enter = (delay) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { type: 'spring', ...spring, delay },
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.h1 className={styles.title} {...enter(0.05)}>
          Buy {name}
        </motion.h1>

        <div className={styles.grid}>
          <motion.div className={styles.galleryCol} {...enter(0.15)}>
            <ProductGallery images={galleryImages} colorKey={selection?.color} />
          </motion.div>

          <motion.div className={styles.configCol} {...enter(0.25)}>
            {optionGroups.map((group) => (
              <OptionGroup
                key={group.id}
                label={group.label}
                type={group.type}
                options={group.options}
                value={selection?.[group.id]}
                onChange={(id) => onAxisChange(group.id, id)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <PurchaseSummary
        productName={name}
        thumbnail={galleryImages[0]?.url}
        selectionLabel={selectionLabel}
        variant={variant}
        loading={adding}
        onAddToBag={onAddToBag}
      />
    </div>
  );
}
