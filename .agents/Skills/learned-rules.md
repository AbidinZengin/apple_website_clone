# Learned Rules — Kullanıcının Onaylanmış Tasarım Tercihleri

Bu dosya, kullanıcının verdiği her tasarım düzeltmesinin tek satırlık kalıcı kurala damıtılmış halidir.
**Her UI fazında yüklenmesi ZORUNLUDUR** (bkz. CLAUDE.md Routing Protocol). Buradaki kurallar genel estetik
sezgilerin ve `design-philosophy.md`'nin ÜZERİNE yazar: çelişki varsa **bu dosya kazanır** — çünkü bunlar
kullanıcının gerçekte söylediği şeylerdir, tahmin değil.

## Kural Ekleme Protokolü
1. Kullanıcı bir tasarım kararını düzelttiğinde ("bunu beğenmedim, şöyle olsun"), düzeltmeyi uyguladıktan **hemen sonra** buraya tek satır kural ekle. Kullanıcıya sorma, sadece ekle ve eklediğini tek cümleyle bildir.
2. Format: `- **[kategori]** kural metni _(YYYY-AA, kaynak bileşen)_`
3. Kurallar spesifik ve eyleme dönük olmalı ("başlıklar asla gradient olmasın" ✅), muğlak olmamalı ("daha güzel olsun" ❌).
4. Yeni bir düzeltme eski bir kuralla çelişirse eski kuralı güncelle veya sil — dosya kısa, güncel ve çelişkisiz kalmalı.
5. Kullanıcının **onayladığı** ilk denemeler de sinyaldir: bir yaklaşım ilk seferde beğenildiyse ve genellenebilirse, o da kural olabilir.

## Kurallar

### Asset & Görsel Kaynak
- **[asset]** Kullanıcının verdiği/eklediği görseller mutlaka teslimatta kullanılmalı; eksik varyantlar için resmi Apple CDN görselleri çekilmeli, placeholder üretilmemeli. _(2026-06, genel)_
- **[asset]** Referans siteden klonlarken yapımcı kredileri (portre, "other projects", tutorial butonu, banner) asla dahil edilmez — sadece ürün deneyimi klonlanır. _(2026-07, AirPodsPro)_
- **[asset]** Referansın metin envanteri screenshot örneklemesinden değil DOM'dan (HTML text extraction) çıkarılır — scroll sahnelerinde kayıp giden overlay/anlatım metinleri screenshot'larda kolayca kaçar; tüm metin katmanları (ara başlıklar, animasyon üstü anlatımlar, etiketler) eksiksiz alınmalı. _(2026-07, AirPodsPro)_
- **[motion]** Referansta scroll'a bağlı animasyon olan bölümler teslimatta statik görselle geçiştirilemez; gerçek scrub (video/canvas/Lottie) uygulanır. Statik kare yalnızca Phase 1.5 mockup aşamasında kabul edilir. _(2026-07, AirPodsPro)_
- **[motion]** Scroll-scrub sahnelerinde ürün görseli ekranı dolduracak kadar büyük olmalı (~90-100vw'ye kadar, küçük ortalanmış kutu değil) ve scrub boyunca yumuşak bir scale büyümesi (~0.92 → 1.1, spring'li) eşlik etmeli. _(2026-07, AirPodsPro)_
- **[motion]** Pinned giriş sekanslarındaki ardışık başlık geçişleri şu deseni izler (kullanıcı onaylı, referans: `MagicIntro.jsx HEADLINE_RANGES`): her başlık scroll progress'inde dört noktalı enter→hold→exit trapezi alır (`[0.02,0.07,0.12,0.16]` gibi), trapezler arasında ~0.04 boşluk bırakılır (spring gecikmesi ardışık yazıları üst üste bindirmesin), opacity + hafif y (32→0) birlikte spring'lenir ve ürün animasyonu son başlık çıkarken (bitişini beklemeden) girer. Pinned bölüm ~100vh/faz olacak şekilde boyutlanır — sekans ne sıkışık ne de "animasyon çok geç geliyor" dedirtecek kadar uzun olmalı. _(2026-07, AirPodsPro)_
- **[motion]** Her ürün sayfasının hero'su ilk açılışta giriş animasyonu alır: başlık spring ile yükselerek belirir (opacity 0→1, y 48→0, scale 0.96→1, delay ~0.15s), alt eleman ~0.25s gecikmeyle kademeli takip eder. Sayfa asla "aniden var olmaz". _(2026-07, AirPodsPro)_
- **[motion]** Ardışık video/scrub sahneleri arasındaki geçiş tam ekran başlık fazıyla BÖLÜNMEZ — bölüm başlığı ve açıklamalar animasyonun yanında (sol kolon) akar, ürün görseli kesintisiz kalır. _(2026-07, AirPodsPro EarTips)_
- **[motion]** İç içe geçen animasyonlar (birinin finali diğerinin başlangıcı olan) ayrı pinned bölümler olarak alt alta konmaz — TEK pinned sahnede üst üste katmanlar olarak crossfade ile devir teslim yapar (bkz. EarTips: head→flip→explode-tips). Bölüm metinleri de ilgili katman oynarken belirir. _(2026-07, AirPodsPro)_
- **[motion]** Scrub animasyonu pin bitmeden (~progress 0.85-0.9'da) son karesine ulaşmalı; kalan pin son karede "hold" yapar. Scrub'ı 0.98'e kadar uzatmak videoyu yarım kalmış hissettirir. _(2026-07, AirPodsPro Transparency)_

### Layout & Spacing
- **[layout]** İçerik konteynerleri max-width 1200px (Navbar, SectionTitle, hero'lar); kartlar 1100px; gövde metni blokları 560–640px'i geçmez. _(2026-07, kod taraması — kullanıcı onaylı)_

### Tipografi
- **[tipografi]** Hero/display başlıkları 64–80px aralığında (responsive için `clamp(40px, 6vw, ~76px)` deseni); daha küçük varsayılanlar kullanıcının beğenmediği "küçük kalmış" hissi verir. _(2026-07, kod taraması — kullanıcı onaylı)_
- **[tipografi]** Tüm başlıklarda negatif letter-spacing; başlık büyüdükçe sıkılaşır (gövdeye yakın: -0.01em → display: -0.03em). Pozitif tracking yalnızca eyebrow/etiket metinlerinde (örn. 0.08em). _(2026-07, kod taraması — kullanıcı onaylı)_

### Renk & Yüzey
- **[renk]** Bölüm arka planları yalnızca üç yüzeyden biri: `#000` (dark), `#fbfbfd` (light), `#f5f5f7` (gri zemin). Ara gri tonlar veya keyfi arka plan renkleri yasak. _(2026-07, kod taraması — kullanıcı onaylı)_
- **[renk]** CTA mavisi her yerde `#0071e3`, hover `#0077ed` — başka mavi tonu türetme. _(2026-07, kod taraması — kullanıcı onaylı)_

### Motion
_(henüz kural yok)_

### Kod & Yapı
- **[yapı]** Referans sitelerden sayfa klonlarken navbar klonlanmaz — projenin mevcut global `Navbar`'ı tüm sayfalarda tek gezinmedir; sayfaya özel ikinci bir nav/alt-nav eklenmez. _(2026-07, AirPodsPro)_
- **[yapı]** Kullanıcı "X sayfasındaki Y bileşeninin aynısını" dediğinde, o mevcut paylaşılan bileşen (`components/common/…`) birebir yeniden kullanılır — yeni bir varyant/alternatif tasarım (ör. Bento Grid) uydurulmaz. Referans verilen bileşeni önce oku, aynı prop deseniyle besle. _(2026-07, iPad Pro Highlight)_
