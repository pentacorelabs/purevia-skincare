import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1800);
for (const [id, name] of [['categories','categories'],['story','story'],['best-sellers','best'],['shop','shop'],['journal','journal'],['contact','footer']]) {
  await page.locator('#'+id).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `screenshots/sec-${name}.png` });
}
await browser.close();
