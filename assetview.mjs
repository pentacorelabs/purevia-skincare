import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 660, height: 700 } });
for (const f of ['hero-botanical','story-model','product-glow-serum','product-clay-mask','product-gift-set','product-eye-cream']) {
  await page.setContent(`<body style="margin:0;display:flex;align-items:center;justify-content:center;background:#eee;height:700px"><img src="http://localhost:4173/images/${f}.jpg" style="max-width:640px;max-height:660px"></body>`);
  await page.waitForTimeout(350);
  await page.screenshot({ path: `screenshots/asset-${f}.png` });
}
await browser.close();
