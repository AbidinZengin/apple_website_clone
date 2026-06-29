import { motion } from 'framer-motion';
import ProductCard from './ProductCard/ProductCard';
import styles from './HeroProduct.module.css';

const enterVariants = {
  hidden:  { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.32, 0.72, 0, 1], delay: 0.2 },
  },
};

export default function HeroProduct() {
  return (
    <section className={styles.section}>
      <motion.div
        variants={enterVariants}
        initial="hidden"
        animate="visible"
      >
        <ProductCard
          title="iPhone 17 Pro"
          subtitle="Her yönüyle Pro"
          price="Başlangıç Fiyatı : 107.999 TL"
        />
      </motion.div>
    </section>
  );
}
