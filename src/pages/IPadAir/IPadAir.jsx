import IPadAirShowcase from './IPadAirShowcase';
import PromoVideo from './PromoVideo/PromoVideo';

export default function IPadAir() {
  return (
    <>
      <IPadAirShowcase />
      <PromoVideo src="/videos/ipad-air-promo.mp4" caption="See it in action." />
    </>
  );
}
