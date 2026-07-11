import IPadProHero from './IPadProHero/IPadProHero';
import Highlight from '../../components/common/Highlight/Highlight';
import DesignShowcase from './DesignShowcase/DesignShowcase';
import applePencilPro from '../../assets/ipad/apple-pencil-pro.jpg';
import m5Chip from '../../assets/ipad/m5-chip.png';
import xdrDisplay from '../../assets/ipad/xdr-display.jpg';
import tabletMultitask from '../../assets/ipad/tablet-multitask.jpg';

// Caption gradyanı (kullanıcı referansı: turuncu → amber → mavi).
const themeGradientText = {
  background: 'linear-gradient(90deg, #ff5a1f 0%, #ffc24a 30%, #3fa0ef 65%, #0a72e6 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  textShadow: 'none',
};

// ─────────────────────────────────────────────────────────────────────────────
// CAPTION GRADYAN RENKLERİ — RENKLERİ BURADAN SEÇ (sadece hex değerlerini değiştir)
// Format: 'linear-gradient(90deg, <renk1> 0%, <renk2> 100%)' (istediğin kadar durak ekleyebilirsin)
const CAMERA_CAPTION_GRADIENT = 'linear-gradient(90deg, #f012be 0%, #1c92d2 50%, #A80F0F 100%)';
// Verilen CSS gradyanını metne uygular (Apple Pencil Pro yazısıyla aynı teknik).
const gradientText = (gradient) => ({
  background: gradient,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  textShadow: 'none',
});

// iPhone 17 Pro'daki Highlight carousel'inin aynısı — iPad Pro slaytları.
// 3. slayt kullanıcının verdiği kamera videosu (klibin ilk 6 sn'si).
// Diğer slaytların görselleri kullanıcı tarafından sonra verilecek (caption-only).
const highlightSlides = [
  {
    id: 'm5',
    image: m5Chip,
    imageAlt: 'Apple M5 çipi',
    // Beyaz caption (koyu/renkli zemin üzerinde).
    caption: 'M5. The most powerful chip ever in iPad.',
    captionSize: '42px',
    captionColor: '#fff',
    captionPosition: 'bottom',
    captionFrom: 'left',
    captionStyle: { maxWidth: '72%' },
  },
  {
    // 2. kısım — kamera videosu (beyaz zeminli, o yüzden koyu caption).
    id: 'camera',
    // Gradyan caption (renkler yukarıdaki CAMERA_CAPTION_GRADIENT'ten).
    caption: (
      <span style={gradientText(CAMERA_CAPTION_GRADIENT)}>
        Pro cameras and LiDAR Scanner. Depth in stunning detail.
      </span>
    ),
    ariaLabel: 'Pro cameras and LiDAR Scanner. Depth in stunning detail.',
    video: '/videos/ipad-pro-camera.mp4',
    captionSize: '42px',
    captionPosition: 'bottom',
    captionFrom: 'right',
    captionStyle: { maxWidth: '64%' },
  },
  {
    id: 'xdr',
    image: xdrDisplay,
    imageAlt: 'iPad Pro Ultra Retina XDR ekranında canlı içerik',
    // Koyu/siyah zemin (uzay siyahı iPad + klavye) → beyaz çarpıcı.
    caption: 'Ultra Retina XDR. Every detail, brilliantly alive.',
    captionSize: '40px',
    captionColor: '#fff',
    captionPosition: 'bottom',
    captionFrom: 'left',
    captionStyle: { maxWidth: '58%', lineHeight: 1.15 },
  },
  {
    id: 'pencil',
    image: applePencilPro,
    imageAlt: 'Apple Pencil Pro tutan el',
    // Template: 3 statement alt alta; sonuncusu "Apple Pencil Pro" (gradyan, tik attığın alt kutu).
    caption: (
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(18px, 4vh, 40px)' }}>
        <span style={{paddingTop :"100px"}}>Precise creative control.</span>
        <span >Squeeze and roll.</span>
        <span style={{ ...themeGradientText, fontWeight: 900 , fontSize : "50px"}}>Apple Pencil Pro</span>
      </span>
    ),
    ariaLabel: 'Precise creative control. Squeeze, roll, and hover. Apple Pencil Pro.',
    captionSize: '38px',
    captionColor: '#fff',
    captionFrom: 'right',
    // Sol tarafta dikey ortada; kalemin ucuna değmesin diye dar. Dikey ortalama transform
    // yerine flex ile (framer-motion'un x/y transform'unu ezmesin).
    captionStyle: {
      top: 0,
      bottom: 0,
      left: 'clamp(20px, 4%, 48px)',
      right: 'auto',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'left',
      maxWidth: '38%',
      lineHeight: 1.15,
    },
  },
  {
    id: 'design',
    image: tabletMultitask,
    imageAlt: 'iPad Pro üzerinde Keynote ve Mesajlar ile çoklu görev',
    // Görsel kırpılmasın diye contain + görselin kendi zemini (#fff) kart arka planı.
    fit: 'contain',
    background: '#ffffff',
    // Referans düzeni: görsel solda, 3 satır metin sağda (dikey ortada).
    caption: (
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'clamp(20px, 5vh, 48px)' }}>
        <span>True multitasking.</span>
        <span>Two apps, side by side.</span>
        <span>Do more at once.</span>
      </span>
    ),
    ariaLabel: 'True multitasking. Two apps, side by side. Do more at once.',
    captionSize: '34px',
    captionColor: '#1d1d1f',
    captionFrom: 'right',
    // Sağ tarafta dikey ortada; görsel sola bleed eder.
    captionStyle: {
      top: 0,
      bottom: 0,
      right: 'clamp(20px, 5%, 72px)',
      left: 'auto',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      textAlign: 'right',
      maxWidth: '40%',
      lineHeight: 1.15,
    },
  },
];

export default function IPadPro() {
  return (
    <>
      <IPadProHero />
      <Highlight
        title="Öne çıkanlar"
        filmLabel="Filmi izle"
        filmHref="#"
        slides={highlightSlides}
        background="#262626"
        cardColor="black"
      />
      <DesignShowcase />
    </>
  );
}
