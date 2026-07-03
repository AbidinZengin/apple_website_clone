import ProductCard from './ProductCard/ProductCard';
import styles from './HeroProduct.module.css';

export default function HeroProduct() {
  return (
    <section className={styles.section}>
      <ProductCard
        title="iPhone 17 Pro"
        subtitle="Her yönüyle Pro"
        price="Başlangıç Fiyatı : 107.999 TL"
        videoSrc="/videos/iphone-17-pro-hero.mp4"
      />
    </section>
  );
}
