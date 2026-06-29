import { NavProvider } from './context/NavContext';
import Navbar from './components/layout/Navbar';
import HeroProduct from './components/sections/HeroProduct/HeroProduct';
import SectionTitle from './components/common/SectionTitle/SectionTitle';
import MacBookCard from './components/sections/MacBookCard/MacBookCard';
import MacBookProCard from './components/sections/MacBookProCard/MacBookProCard';
import { IPadAirCard } from './components/sections/iPadAirCard/iPadAirCard';
import './styles/global.css';

export default function App() {
  return (
    <NavProvider>
      <Navbar />
      <main style={{ paddingTop: '56px', background: '#000' }}>

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

      </main>
    </NavProvider>
  );
}
