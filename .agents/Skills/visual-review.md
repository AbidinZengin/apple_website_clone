# Visual Review — Kalite Kapısı (Phase 4 Değerlendirme Döngüsü)

`roles/apple-auditor.md`'nin metin-tabanlı kendi kendini eleştirmesini **gerçek görsel kanıtla** destekler. Bu skill, üretilen her component için Storybook'ta izole render → screenshot → ölçülebilir kontrol → LLM incelemesi → (gerekirse) revizyon döngüsünü tanımlar.

## 1. Ön Koşul
Component'in bir Storybook story'si olmalı (`ComponentName.stories.jsx`, component'in kendi klasöründe — bkz. `design-tokens.md` ve proje component-isolation kuralı). Story yoksa önce onu yaz, sonra bu döngüye gir.

## 2. Adımlar

1. **Storybook'u başlat:** `npm run storybook` (arka planda, port 6006). Zaten çalışıyorsa atla.
2. **Screenshot al:** `npm run capture-story -- <story-id>` — `scripts/capture-story.mjs`, Playwright/Chromium ile `iframe.html?id=<story-id>&viewMode=story` adresini render edip `.claude/scratchpad/<story-id>.png` olarak kaydeder. Story ID'si Storybook `title` + export adının kebab-case birleşimidir (örn. `Common/Card` başlığı + `LightWithCta` export'u → `common-card--light-with-cta`).
3. **Referansı al (varsa — ve bu projede neredeyse her zaman vardır):** Bu bir pixel-perfect klon; hedef bölümün gerçek bir karşılığı var. Phase 1'de yakalanmış referans screenshot'ı yoksa şimdi yakala: `npm run capture-ref -- <url> <isim>.png ["css-selector"]` (`scripts/capture-reference.mjs`, capture-story ile aynı 1280px viewport'u kullanır — adil karşılaştırma için). Kullanıcının verdiği bir görsel/screenshot varsa doğrudan onu kullan.
4. **Görselleri oku ve KARŞILAŞTIR:** Her iki PNG'yi de Read tool ile aç. **Birincil soru "güzel mi?" değil, "referansa benziyor mu?"** — ikisini yan yana değerlendir ve somut fark listesi çıkar: "başlık referansta daha büyük (~80px vs bizim 56px)", "referansta buton pill, bizde radius-md", "ürün görseli referansta viewport'un %60'ı, bizde %40'ı". Kriter listesi (aşağıda) ikincil kontroldür; referans sadakati birincildir. Referans gerçekten yoksa (özgün bölüm) yalnızca kriter listesiyle puanla.
5. **Otomatik kontrolleri topla:**
   - `npm run lint` (oxlint) — component dosyalarında hata/uyarı var mı.
   - `npm run build-storybook` — story derleniyor mu (derleme hatası = otomatik red).
   - Storybook'un `@storybook/addon-a11y`'si zaten her story'de axe kontrolünü çalıştırır; Storybook UI'daki (veya `npx vitest --project=storybook` çıktısındaki) a11y ihlallerini kontrol listesine dahil et.
6. **Kriter listesine göre puanla** (aşağıya bak). Her kriter PASS/FAIL, en az bir FAIL varsa "AUDIT FAILED" ve somut, dosya+satır referanslı düzeltme talimatı üret (apple-auditor.md formatıyla aynı).
7. **Revizyon:** FAIL varsa component'i düzelt, story'yi yeniden yakala (adım 2'den devam), tekrar incele. **En fazla 2-3 tur.** 3 turdan sonra hâlâ FAIL varsa döngüyü durdur, kullanıcıya mevcut durumu ve kalan sorunu raporla — sessizce daha fazla deneme yapma.
8. **Onay:** Tüm kriterler PASS olduğunda "AUDIT PASSED" de ve `.claude/scratchpad/`'daki geçici PNG'leri temizle (screenshot'lar kalıcı artefakt değil, sadece inceleme aracı). Bu turda kullanıcıdan gelen düzeltmeler olduysa `learned-rules.md`'ye damıtıldığından emin ol.

## 3. Kontrol Listesi

| Kategori | Kontrol |
|---|---|
| **Referans sadakati (BİRİNCİL)** | Story screenshot'ı, referans screenshot'ıyla yan yana bakıldığında aynı bölüm gibi mi duruyor? Oran, hiyerarşi, boşluk dengesi ve genel siluet eşleşiyor mu? Somut fark listesi boş mu (veya kalan farklar bilinçli/gerekçeli mi)? |
| **Learned rules** | `Skills/learned-rules.md`'deki kullanıcı kurallarından herhangi biri ihlal ediliyor mu? (İhlal = otomatik FAIL — bunlar kullanıcının açıkça söylediği tercihler.) |
| **Token uyumu** | `font-size`, `padding`/`margin`, `border-radius`, `transition-duration` değerleri `design-tokens.md`'deki `var(--...)` token'larından mı geliyor? Yeni ham değer varsa gerekçeli mi (bkz. design-tokens.md §2 kuralı)? |
| **Spacing ritmi** | Görselde elemanlar arası boşluklar tutarlı mı, yoksa gelişigüzel mi hissettiriyor? |
| **Tipografi hiyerarşisi** | Başlık/altbaşlık/gövde arasında net bir kontrast var mı (`FrondendSkills.md` §3)? |
| **Motion fiziği** | Hover/entrance animasyonu `MotionGuideline.md`'deki paylaşılan spring (`{stiffness:170, damping:24, mass:0.9}`) veya `--ease-apple` eğrisini mi kullanıyor, yoksa robotik/lineer mi? |
| **Component izolasyonu** | Kendi klasöründe mi, `.module.css` kullanıyor mu, gereksiz `div` sarmalayıcı var mı? |
| **Erişilebilirlik** | axe ihlali var mı (görsel içermeyen alt text, düşük kontrast, eksik `aria-label`)? |
| **Console/Lint** | oxlint hata/uyarı veriyor mu (eksik `key`, kullanılmayan değişken)? |
| **Responsive** | Story'de mobil breakpoint görünmüyorsa bile CSS'te `@media` bloğu mevcut mu ve mantıklı mı (küçülen değerler gerçekten küçülüyor mu)? |
| **Entegrasyon** | Component doğru klasör/route'a mı yerleşti, mevcut sayfa layout'unu veya komşu component'leri bozmuyor mu (bkz. `App.jsx` / ilgili sayfa render'ı)? |

## 4. Bilinçli Kapsam Dışı (Bu Skill'in Yapmadığı)
- Ayrı bir LLM API çağrısı / CI entegrasyonu yok — inceleme bu oturum içinde interaktif yapılıyor. Tam otomatik/insansız bir pipeline istenirse bu, ayrı bir karar ve altyapı gerektirir (bkz. proje kararı notu).
- Görsel regresyon (piksel-diff karşılaştırma) yok — her inceleme kriterlere göre yeniden değerlendirilir, önceki screenshot'la otomatik karşılaştırılmaz.
- Onaylanan component'lerin `learned-rules.md`'ye damıtılması bu skill'in kapsamında değil — ayrı bir hafıza-katmanı adımı (roadmap Adım 3).
