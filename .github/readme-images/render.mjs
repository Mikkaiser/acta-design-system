// Renders the README images in .github/images/ from shots.html.
// Needs a design-sync build (ds-bundle/) and the staged playwright in .ds-sync/:
//   node .github/readme-images/render.mjs
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const require = createRequire(path.join(root, '.ds-sync/package.json'));
const { chromium } = require('playwright');

const out = path.join(root, '.github/images');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1300, height: 900 }, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.join(here, 'shots.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

// Photography goes out as JPEG; everything else is flat UI and stays PNG.
for (const id of ['og', 'cover', 'type', 'colors', 'components', 'photos']) {
  const file = id + (id === 'photos' ? '.jpg' : '.png');
  await page.locator('#' + id).screenshot(id === 'photos' ? { path: path.join(out, file), type: 'jpeg', quality: 85 } : { path: path.join(out, file) });
  console.log('wrote .github/images/' + file);
}
await browser.close();
