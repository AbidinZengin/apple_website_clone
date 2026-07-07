import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2];
const outName = process.argv[3];
const selector = process.argv[4];

if (!url) {
  console.error('Usage: node scripts/capture-reference.mjs <url> [output-filename.png] [css-selector]');
  console.error('Example: node scripts/capture-reference.mjs https://www.apple.com/ipad-air/ ipad-air-hero.png "section.section-hero"');
  process.exit(1);
}

const safeName = outName || `ref-${new URL(url).hostname.replace(/\W+/g, '-')}.png`;
const outPath = path.join(dirname, '..', '.claude', 'scratchpad', safeName);

const browser = await chromium.launch();
// viewport matches capture-story.mjs so the reference and the story render at the same width
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(1500); // lazy images + entrance animations

if (selector) {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800); // scroll-triggered reveals
  await el.screenshot({ path: outPath });
} else {
  await page.screenshot({ path: outPath, fullPage: true });
}

await browser.close();
console.log(outPath);
