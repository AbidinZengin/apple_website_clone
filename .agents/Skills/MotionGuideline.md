# Motion & Animation Guidelines (Professional Polish)

Bu kurallar, tüm hareketli grafiklerde ve component animasyonlarında geçerli olan "Kalite Standartları"dır.

## 1. Animation & Motion (The Polish)
- **Complete Cycles:** Her element sahneye girmeli (enter), "hold" anında kalmalı ve sahneden tamamen çıkmalı (exit). Hiçbir şey yarıda kesilmemeli.
- **Organic Motion:** Robotik, lineer (sabit hız) hareketlerden kaçın. Mutlaka "anticipation" (küçük bir geri çekilme), "overshoot" (hedefi biraz geçip geri gelme) ve "settle" (yerleşme) aşamalarını `spring` veya `ease` eğrileriyle kullan.
- **Staggering:** Elementleri aynı anda değil, birkaç frame arayla "cascade" (basamaklı) şeklinde sok.
- **Subtle Life:** Sahne sabit dururken "floating" (süzülme), "soft pulse" (hafif nefes alma) veya "slow shine sweep" (yavaş ışık geçişi) ekle.

## 2. Effects & Style (The Taste)
- **Minimalist Geometry:** Işık parlamaları, ince çizgiler ve "glow/bloom" tercih et. Emoji veya ucuz "clip-art" parçacıklarından kaçın.
- **Animated Accents:** Tasarıma "premium" his katmak için tek bir odaklı aksan ekle (örneğin kenarlarda dönen ışık veya yavaş renk geçişi).
- **Payoff Moment:** Bir sonuç veya kazanan vurgulanırken "kutlama" anı yarat (scale pop + glow).

## 3. Readability & Layout (The Foundation)
- **Title-Safe Area:** Ana metinleri her zaman kenarlardan %10 içeri (margin) tut.
- **Contrast:** Yoğun görseller üzerinde metin yazacaksan mutlaka "drop shadow", "scrim" (yarı saydam katman) veya "backing shape" kullan.
- **Auto-fit:** Uzun metinleri kapsayıcının dışına taşırmadan otomatik daralt veya alt satıra al.
- **Visual Hierarchy:** Tek bir baskın odak noktası seç, destekleyici metinleri boyut olarak küçük tut.

## 4. Framer Motion — Teknik Referans (API Katmanı)
Yukarıdaki kurallar "ne" yapılacağını tanımlar; bu bölüm projede Framer Motion ile "nasıl" yazılacağını tanımlar. Not: kütüphane artık "Motion" adını taşıyor (npm paketi hâlâ `framer-motion`), dokümantasyon ararken her iki isimle de arama yap.

- **Motion Bileşenleri:** Standart HTML/SVG elemanlarını `motion.div`, `motion.img`, `motion.section` gibi karşılıklarıyla değiştir; `initial`, `animate`, `exit`, `whileHover`, `whileTap`, `whileInView` prop'larıyla deklaratif olarak tanımla — imperative DOM manipülasyonuna gerek yok.
- **Scroll-Linked Animasyon (Projenin Standart Deseni):** `useScroll({ target: ref, offset: [...] })` ile scroll ilerlemesini oku → `useTransform(scrollYProgress, input, output)` ile bunu bir stil değerine eşle → `useSpring(transformedValue, { stiffness, damping, mass })` ile yumuşat. Bkz. `CameraPlateauReveal.jsx` / `PerformanceStack.jsx`: dört noktalı bir trapez (`input: [0, girişX, çıkışX, 1]`, karşılık gelen `output`) kullanmak "Complete Cycles" (enter/hold/exit) kuralını otomatik garanti eder.
- **Spring Config Standardı:** Proje genelinde paylaşılan tek bir `spring` sabiti var (`{ stiffness: 170, damping: 24, mass: 0.9 }`). Yeni bir sahne eklerken bu değerlere yakın kal; her component'in kendi rastgele spring eğrisini icat etmesi "Organic Motion" tutarlılığını bozar.
- **Variants & Orchestration:** Birden fazla elemanı aynı anda değil kademeli sokmak için parent'ta `variants` + `staggerChildren` / `delayChildren` kullan. Proje şu an stagger'ı çoğunlukla manuel kaydırılmış `input` aralıklarıyla (örn. `SPEC_RANGES`) taklit ediyor — yeni kod bu iki yaklaşımdan birini bilinçli seçmeli, ikisini karıştırmamalı.
- **AnimatePresence:** Koşullu render edilen veya route değişiminde unmount olan elemanları `<AnimatePresence>` ile sarmadan `exit` animasyonu hiç çalışmaz — eleman DOM'dan aniden kaybolur ve "Complete Cycles" kuralı ihlal edilir.
- **Gesture & Drag:** `whileHover`, `whileTap`, `drag`, `dragConstraints`, `dragElastic` — kullanıcı etkileşimine tepki veren mikro-animasyonlar içindir (kart hover'ında hafif scale/shadow gibi). İnce ve ölçülü kullan, "Minimalist Geometry" ilkesini aşma.
- **Layout Animasyonları:** `layout` prop'u (veya `layoutId` ile paylaşılan geçişler) DOM'da konum/boyut değiştiğinde otomatik FLIP animasyonu üretir; grid yeniden sıralama veya accordion açılma/kapanma gibi durumlarda elle keyframe yazmak yerine bunu tercih et.
- **useAnimation (İmperative Kontrol):** Deklaratif `animate` prop'u yetmediğinde (bir dizi adımı sırayla tetikleme, dış bir event'e bağlı başlatma) `useAnimation()` ile `controls` al ve `controls.start(...)` çağır. Scroll'a bağlı sahnelerde proje zaten `useTransform` + `useSpring` kullandığından, `useAnimation`'ı yalnızca scroll dışı / event tetikli akışlar için düşün.
- **Performans:** Mümkün olduğunca GPU-compositable property'leri (`x`, `y`, `scale`, `rotate`, `opacity`) animate et; `width`, `top`, `margin` gibi layout'u yeniden hesaplatan property'lerden kaçın — özellikle scroll-linked sahnelerde her frame'de reflow tetiklenmesin.