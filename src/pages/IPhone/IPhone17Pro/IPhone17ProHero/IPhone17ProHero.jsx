import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../../services/auth/AuthContext';
import { useCart } from '../../../../services/cart/CartContext';
import { useNav } from '../../../../components/Navbar/NavContext';
import heroImage from '../../../../assets/iphone/iphone-hero.jpg';
import { IPHONE_17_PRO_HERO } from './iPhone17ProHero.data';
import styles from './IPhone17ProHero.module.css';

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', bounce: 0, duration: 1.1, delay: 0.2 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
};

function IPhone17ProHero() {
  const { eyebrow, headlinePlain, headlineAccent, subheadline, imageAlt, price, colors, purchase } =
    IPHONE_17_PRO_HERO;
  const { user } = useAuth();
  const { addItem } = useCart();
  const { openAuth, openCart } = useNav();
  const [adding, setAdding] = useState(false);

  // Girişsiz: önce oturum aç. Girişli: sepete ekle ve mini-sepeti aç.
  const handleBuy = async () => {
    if (!user) {
      openAuth();
      return;
    }
    setAdding(true);
    try {
      await addItem({ productType: purchase.productType, variantId: purchase.variantId, quantity: 1 });
      openCart();
    } catch {
      // Hata CartContext.error'a düşer; buton tekrar denenebilir kalır
    } finally {
      setAdding(false);
    }
  };

  return (
    <section className={styles.hero}>
      <motion.img
        src={heroImage}
        alt={imageAlt}
        className={styles.image}
        draggable={false}
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      />

      <motion.div
        className={styles.footer}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className={styles.copy}>
          <motion.p className={styles.eyebrow} variants={textVariants}>
            {eyebrow}
          </motion.p>
          <motion.h1 className={styles.headline} variants={textVariants}>
            {headlinePlain}
            <span className={styles.accent}>{headlineAccent}</span>
          </motion.h1>
          <motion.p className={styles.subheadline} variants={textVariants}>
            {subheadline}
          </motion.p>

          <motion.ul className={styles.colorRow} variants={textVariants}>
            {colors.map((color) => (
              <li key={color.name} className={styles.colorItem}>
                <span className={styles.colorDot} style={{ backgroundColor: color.hex }} />
                {color.name}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div className={styles.pricePill} variants={textVariants}>
          <div className={styles.priceText}>
            <p className={styles.priceFrom}>{price.from}</p>
            <p className={styles.priceInstallment}>{price.installment}</p>
          </div>
          <button
            type="button"
            className={styles.buyButton}
            onClick={handleBuy}
            disabled={adding}
          >
            {adding ? 'Ekleniyor…' : price.cta}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(IPhone17ProHero);
