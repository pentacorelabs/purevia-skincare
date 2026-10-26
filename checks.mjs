import { chromium } from 'playwright';
const browser = await chromium.launch();
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 0.7 });
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1600);
await page.screenshot({ path: 'screenshots/check-01-hero.png' });
// add to cart from best sellers
const firstAdd = page.locator('#best-sellers button', { hasText: 'Add to Cart' }).first();
await firstAdd.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await firstAdd.click();
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/check-02-added.png' });
// open cart
await page.getByRole('button', { name: /shopping bag/i }).first().click();
await page.waitForTimeout(600);
await page.screenshot({ path: 'screenshots/check-03-cart.png' });
// increase qty
await page.locator('aside').getByLabel('Increase quantity').first().click();
await page.waitForTimeout(300);
const subtotalText = await page.locator('aside footer').innerText();
console.log('CART FOOTER:', subtotalText.replace(/\n/g, ' | '));
// checkout
await page.getByRole('button', { name: /proceed to checkout/i }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: 'screenshots/check-04-checkout.png' });
await page.getByRole('button', { name: /place demo order/i }).click();
await page.waitForTimeout(400);
console.log('CHECKOUT ERROR SHOWN:', await page.locator('#checkout-name-error').count(), await page.locator('#checkout-email-error').count());
await page.fill('#checkout-name', 'Aria Bennett');
await page.fill('#checkout-email', 'aria@example.com');
await page.getByRole('button', { name: /place demo order/i }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: 'screenshots/check-05-success.png' });
console.log('SUCCESS VISIBLE:', await page.getByText(/demo order confirmed/i).count());
await page.locator('aside').getByRole('button', { name: /continue browsing/i }).click();
await page.waitForTimeout(800);
// filter category
await page.locator('#shop').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.locator('#shop button', { hasText: 'Serums' }).first().click();
await page.waitForTimeout(400);
console.log('SHOP COUNT TEXT:', await page.locator('#shop [aria-live="polite"]').first().innerText());
await page.screenshot({ path: 'screenshots/check-06-filter.png' });
// inline search
await page.fill('#shop-search', 'zzz');
await page.waitForTimeout(400);
console.log('EMPTY STATE:', await page.getByText(/Nothing has bloomed here yet/i).count());
await page.fill('#shop-search', 'serum');
await page.waitForTimeout(400);
console.log('SEARCH RESULTS:', await page.locator('#shop [aria-live="polite"]').first().innerText());
// quick view
await page.locator('#shop article h3 button').first().click();
await page.waitForTimeout(400);
console.log('QUICKVIEW:', await page.getByRole('dialog', { name: /details/i }).count());
await page.screenshot({ path: 'screenshots/check-07-quickview.png' });
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
// newsletter
await page.locator('footer').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.locator('#newsletter-email').fill('bad-email');
await page.locator('footer button[type="submit"]').click();
await page.waitForTimeout(300);
console.log('NEWSLETTER ERROR:', await page.locator('#newsletter-error').count());
await page.locator('#newsletter-email').fill('hello@example.com');
await page.locator('footer button[type="submit"]').click();
await page.waitForTimeout(1000);
console.log('NEWSLETTER SUCCESS:', await page.getByText(/You are on the list/i).count());
await page.screenshot({ path: 'screenshots/check-08-footer.png' });
// localStorage
const stored = await page.evaluate(() => localStorage.getItem('purevia-cart-v1'));
console.log('STORAGE:', stored);
// mobile menu
const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
await mobile.goto('http://localhost:4173', { waitUntil: 'domcontentloaded' });
await mobile.waitForTimeout(1200);
await mobile.screenshot({ path: 'screenshots/check-09-mobile-hero.png' });
await mobile.getByRole('button', { name: /open navigation menu/i }).click();
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: 'screenshots/check-10-mobile-menu.png' });
await mobile.getByRole('button', { name: /close navigation menu/i }).click();
await mobile.locator('#best-sellers').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(600);
await mobile.screenshot({ path: 'screenshots/check-11-mobile-best.png' });
await mobile.locator('footer').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(600);
await mobile.screenshot({ path: 'screenshots/check-12-mobile-footer.png' });
// search modal
await mobile.evaluate(() => window.scrollTo(0,0));
await mobile.waitForTimeout(500);
await mobile.getByRole('button', { name: /search products/i }).first().click();
await mobile.waitForTimeout(400);
await mobile.keyboard.type('glow');
await mobile.waitForTimeout(400);
await mobile.screenshot({ path: 'screenshots/check-13-mobile-search.png' });
console.log('ERRORS:', errors.length ? errors.join(' | ') : 'none');
await browser.close();
