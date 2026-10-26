import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 0.62 });
await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1400);
const positions = [['trust',800],['categories',1120],['story',1900],['best',2600],['promise',3250],['shop',3650],['journal',4800],['footer',5600]];
for (const [name, y] of positions) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `screenshots/sc-${name}.png` });
  console.log(name, y);
}
await browser.close();
