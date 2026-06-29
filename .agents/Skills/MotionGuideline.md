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