# Design Tokens — Kaynak ve Kullanım Kuralları

## 1. Tek Doğruluk Kaynağı
- **CSS tarafı:** `src/styles/global.css` `:root` bloğu — `Typography Scale`, `Spacing Scale`, `Radius Scale`, `Motion Durations` yorum-başlıklı gruplar altında (`--font-size-*`, `--space-*`, `--radius-*`, `--duration-*`). Renk/nav/marka token'ları aynı dosyada zaten mevcuttu (`--accent`, `--color-*`, `--text-*`, `--ease-apple`).
- **Prompt/script tarafı:** `src/config/designTokens.js` — yukarıdaki dört grubun 1:1 JS aynası (`TOKENS.spacing.md` ↔ `--space-md`). Bir tarafa token eklenirse diğeri de aynı isimle güncellenmeli.

## 2. Kullanım Kuralı
Yeni veya değiştirilen bir component'te `font-size`, `padding`/`margin`, `border-radius`, `transition-duration`/`animation-duration` yazmadan önce **önce bu token'lara bak**. Uyan bir değer varsa `var(--...)` ile kullan. Hiçbiri uymuyorsa:
1. Ham değeri sessizce icat etme.
2. Kullanıcıya/orkestratöre "mevcut skalaya uymayan bir değer gerekiyor, X px" diye bildir; token setini genişletmek mi yoksa component-lokal bir istisna mı olacağına birlikte karar verin.

## 3. Kapsam Dışı — Bilerek Token'a Çevrilmeyenler
- Tek-seferlik optik düzeltme margin'leri (negatif değerler, örn. `M5ChipShowcase.module.css`'teki `-110px`/`-160px` glow offset'leri) — bunlar component-lokal kompozisyon detayı, sisteme dahil edilmedi.
- `55px`, `150px` gibi outlier padding değerleri — tek bir dosyaya özgü, skalaya zorlanmadı.
- Çıplak `ease` / `ease-in-out` / `linear` CSS keyword'leri — zaten geçerli CSS değerleri, token'a sarılmasına gerek yok. Özel eğri sadece `--ease-apple`.

## 4. Bilinen Borç (Bu Skill Tarafından Çözülmedi)
- **Pill radius çelişkisi:** Kod tabanında hem `980px` hem `999px` "tam yuvarlak buton" değeri olarak kullanılıyor (bkz. `ProductCard.module.css`, `IPhoneCatalogNav.module.css`, `ExploreLineup.module.css` → 980px; `MacBookProHero.module.css`, `IPhone17ProHero.module.css`, `CameraPlateauReveal.module.css` → 999px). Yeni token `--radius-pill: 980px` bu iki değerden birini kanonik seçti (repo'da daha yaygın + Apple'ın kendi sitesindeki tarihsel konvansiyon), ama **999px kullanan mevcut dosyalar migrate edilmedi**. Yeni kod `--radius-pill` kullanmalı; eski dosyalara dokunmak ayrı bir görev.
- **Geçersiz CSS:** `ProductCard.module.css:71` içinde `transition: 0.4 ease` (birim eksik) var — bu skill kapsamında düzeltilmedi, fark edilirse ayrı bir düzeltme olarak ele alınmalı.

## 5. İlişkili Dosyalar
- `src/styles/global.css` — CSS token tanımları + global reset.
- `src/config/designTokens.js` — JS aynası.
- `src/config/pageThemes.js` — route bazlı tema (dark/light/black), token sisteminden ayrı ama aynı `src/config/` konvansiyonunu paylaşır.
- `CLAUDE.md` Routing Protocol §3 — bu dosyanın ne zaman yükleneceğini tanımlar (genel UI/stil işi yapılan her fazda).
