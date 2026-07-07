import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const storyId = process.argv[2];
const outName = process.argv[3];

if (!storyId) {
  console.error('Usage: node scripts/capture-story.mjs <story-id> [output-filename.png]');
  console.error('Example: node scripts/capture-story.mjs common-card--light-with-cta');
  process.exit(1);
}

const port = process.env.STORYBOOK_PORT || 6006;
const url = `http://localhost:${port}/iframe.html?id=${storyId}&viewMode=story`;
const outPath = path.join(dirname, '..', '.claude', 'scratchpad', outName || `${storyId}.png`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(400); // let framer-motion whileInView entrance settle
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(outPath);
