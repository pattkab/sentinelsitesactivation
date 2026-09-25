const { chromium } = require('C:/Users/xpatt/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1050}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8080');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'tmp/desktop.png',fullPage:true});
 assert.equal(await page.locator('.tool-card').count(),3);
 const links=await page.locator('.tool-card').evaluateAll(els=>els.map(a=>a.href));
 assert(links.every(l=>l.startsWith('https://uhacentral.com/')));
 await page.locator('nav a[href="#resources"]').click();
 assert.equal(await page.locator('.resource').count(),12);
 await page.locator('#resource-search').fill('staging');assert(await page.locator('.resource').count()>0);
 await page.locator('#resource-category').selectOption('Assessment');assert.equal(await page.locator('.resource').count(),3);
 await page.locator('#resource-search').fill('zzzzzz');assert.equal(await page.locator('.empty').count(),1);
 await page.locator('#clear-search').click();assert.equal(await page.locator('.resource').count(),12);
 const files=await page.evaluate(()=>window.SENTINEL_DATA.resources.map(r=>r.url));
 for(const f of files){assert(fs.existsSync(path.join('dist',f)),f);const response=await page.request.get('http://localhost:8080/'+f);assert.equal(response.status(),200,f);}
 await page.locator('nav a[href="#checklist"]').click();
 await page.locator('[data-check="0"]').check();await page.reload();assert(await page.locator('[data-check="0"]').isChecked());
 for(let i=1;i<8;i++)await page.locator(`[data-check="${i}"]`).check();
 assert.match(await page.locator('#progress-label').textContent(),/8 of 8/);
 page.once('dialog',d=>d.accept());await page.locator('#reset-checklist').click();assert.match(await page.locator('#progress-label').textContent(),/0 of 8/);
 await page.locator('nav a[href="#guide"]').click();assert.equal(await page.locator('.guide-step').count(),6);
 await page.locator('.guide-step').nth(5).locator('summary').click();assert(await page.locator('.guide-step').nth(5).getAttribute('open')!==null);
 await page.locator('nav a[href="#teams"]').click();
 assert.equal(await page.locator('.team-card, .roster, #region-filter').count(),0);
 assert.equal(await page.locator('.day-card').count(),5);
 assert.equal(await page.evaluate(()=>Object.hasOwn(window.SENTINEL_DATA,'teams')),false);
 assert.equal((await page.request.get('http://localhost:8080/resources/phase-3-team-allocations.csv')).status(),404);
 assert.equal(await page.locator('a[href*="drive.google.com"]').count(),0);
 await page.screenshot({path:'tmp/teams.png',fullPage:true});
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const view of ['overview','guide','resources','checklist','teams']){
   await page.goto('http://localhost:8080/#'+view);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Horizontal overflow: ${view} ${width}`);
   if(width===390)await page.screenshot({path:`tmp/mobile-${view}.png`,fullPage:true});
  }
 }
 await page.setViewportSize({width:1280,height:900});await page.goto('http://localhost:8080/#overview');
 await page.evaluate(()=>document.documentElement.style.fontSize='32px');
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% font overflow');
 assert.deepEqual(errors,[]);
 await browser.close();console.log('PASS: all 5 views, 12 downloads, resource search/filter/empty state, checklist persistence/reset, confidential roster removal, guide disclosure, 3 viewport widths and 200% font sizing. No JavaScript errors.');
})().catch(e=>{console.error(e);process.exit(1)});
