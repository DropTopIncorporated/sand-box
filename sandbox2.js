const puppeteer = require('puppeteer');
const fs = require('fs');

(async() => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.twitch.tv/directory');

  return page.evaluateHandle(() => {
    const OUR_SELECTOR = '.tw-tower';
    // const DROPS_SELECTOR = '.drops-badge';
    
    const data = document.querySelectorAll(OUR_SELECTOR).innerText;
    //   .then(game => {
    //     game.filter(game => game.querySelector('.drops-badge'));
    //   });
    return data;
  });
})();

fs.writeFile(
    JSON.stringify(teams, null, 2)
)