import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2000);
for (const [sel, name] of [['#home','hero'],['#categories','categories'],['#best-sellers','best'],['#shop','shop'],['#journal','journal'],['footer','footer']]) {
  await page.locator(sel).screenshot({ path: `screenshots/el-${name}.png` });
}
await browser.close();
