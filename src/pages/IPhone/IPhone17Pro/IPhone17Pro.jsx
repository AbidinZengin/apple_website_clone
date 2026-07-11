import IPhone17ProHero from "./IPhone17ProHero/IPhone17ProHero";
import Highlight from "../../../components/common/Highlight/Highlight";
import cameraReveal from "../../../assets/iphone-17-pro/camera-reveal.mp4";
import a19ProChip from "../../../assets/iphone-17-pro/a19-pro-chip.webp";
import cameraInAction from "../../../assets/iphone-17-pro/camera-in-action.webp";
import shotOnIphone from "../../../assets/iphone-17-pro/shot-on-iphone.webp";
import ultraWideFisheye from "../../../assets/iphone-17-pro/ultra-wide-fisheye.webp";
import appleIntelligence from "../../../assets/iphone-17-pro/apple-intelligence.webp";

const highlightSlides = [
  {
    // Keynote videosu: büyük başlık sol-altta, kadrajın boş kalan bandında.
    id: "camera",
    caption:
      "Heat‑forged aluminum unibody design for exceptional pro capability.",
      video: cameraReveal, 
    captionSize: "42px",
    captionAlign: "left",
    captionColor: "#fff",
    captionPosition: "bottom",
    captionFrom: "right",
    captionStyle: { maxWidth: "58%", lineHeight: 1.15 },
  },
  {
    // Çip tam ortada, zemin simsiyah: alt-orta klasik Apple yerleşimi.
    id: "chip",
    caption: "A19 Pro. The fastest chip ever in an iPhone.",
    image: a19ProChip,
    imageAlt: "A19 Pro chip",
    captionSize: "42px",
    captionColor: "#fff",
    captionPosition: "bottom",
    captionFrom: "left",
    captionStyle: { maxWidth: "72%" },
  },
  {
    // Üst bant siyah (eller/arka plan): uzun metin sol-üstte, ekrana taşmaz.
    id: "photography",
    caption:
      "The ultimate pro camera system. All 48MP Fusion rear cameras. And the longest zoom ever on an iPhone.",
    image: cameraInAction,
    imageAlt: "iPhone 17 Pro Camera app with optical zoom",
    captionSize: "32px",
    captionColor: "#6f804a",
    captionPosition: "top",
    captionFrom: "right",
    captionStyle: { textAlign: "left", margin: 0, maxWidth: "62%", lineHeight: 1.2 },
  },
  {
    // Yüz ortada; imza sağ-altta, turuncu patika üzerinde scrim'le okunur.
    id: "shot-on-iphone",
    caption: "48MP Fusion Main camera. Two advanced cameras in one. Super-high resolution by default.",
    image: shotOnIphone,
    imageAlt: "Vivid lifestyle photo shot on iPhone 17 Pro",
    captionSize: "32px",
    captionColor: "#fff ",
    captionPosition: "top",
    captionAlign: "right",
    captionFrom: "right",
    captionStyle: { maxWidth: "48%" },
  },
  {
    // Koyu mavi gökyüzü sol-üstte boş: caption oraya, yüzden uzak durur.
    id: "ultra-wide",
    caption: "New Center Stage front camera. Flexible ways to frame your shot. Smarter group selfies. And so much more.",
    image: ultraWideFisheye,
    imageAlt: "Wide-angle fashion photo shot on iPhone 17 Pro",
    captionSize: "32px",
    captionColor: "#756731",
    captionAlign: "left",
    captionStyle: { maxWidth: "46%", lineHeight: 1.2 },
  },
  {
    // Görselin kendi gömülü "Apple Intelligence" başlığı var (fit: contain
    // ile görünür) — üstüne ikinci bir yazı bindirmemek için caption yok.
    id: "apple-intelligence",
    image: appleIntelligence,
    imageAlt: "Apple Intelligence features in the Photos app",
    fit: "contain",
  },
];

export default function IPhone17Pro() {
  return (
    <>
      <IPhone17ProHero />
      <Highlight
        title="Get the Highlights 7"
        filmLabel="Watch the film"
        filmHref="#"
        slides={highlightSlides}
        background="#262626"
        cardColor="black"
      />
    </>
  );
}
