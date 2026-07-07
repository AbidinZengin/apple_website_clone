import HeroProduct from './HeroProduct/HeroProduct';
import SectionTitle from '../../components/common/SectionTitle/SectionTitle';
import MacBookCard from './MacBookCard/MacBookCard';
import MacBookProCard from './MacBookProCard/MacBookProCard';
import { IPadAirCard } from './iPadAirCard/iPadAirCard';
import ScrollAnimation from '../../components/ScrollAnimation/ScrollAnimation';

export default function Home() {
  return (
    <>
      {/* Hero — iPhone 17 Pro */}
      <HeroProduct />

      {/* Section divider + title */}
      <section style={{ padding: '80px 0 48px' }}>
        <SectionTitle
          bold="Son Yeni Çıkanlar."
          regular="En yeni ürünlerimize göz atın."
        />
      </section>

      <MacBookCard />
      <MacBookProCard />
      <IPadAirCard />
      <ScrollAnimation />
    </>
  );
}
