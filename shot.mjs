import { chromium } from 'playwright';
const browser = await chromium.launch();
const errors = [];
const viewports = [['desktop',1440,900],['tablet',768,900],['mobile',375,812],['small',320,720]];
for (const [name, width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on('console', m => { if (m.type() === 'error') errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`${name} pageerror: ${e.message}`));
  await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, height: document.documentElement.scrollHeight }));
  console.log(name, JSON.stringify(metrics));
  await page.screenshot({ path: `screenshots/${name}-top.png` });
  await page.screenshot({ path: `screenshots/${name}-full.png`, fullPage: true });
  await page.close();
}
console.log('CONSOLE ERRORS:', errors.length ? errors.join(' | ') : 'none');
await browser.close();
