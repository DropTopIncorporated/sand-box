const puppeteer = require('puppeteer');
const fs = require('fs');

const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

const drops = async() => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.twitch.tv/directory');

  return page.evaluate(() => {
    const OUR_SELECTOR = '.tw-tower';
    const DROPS_SELECTOR = '.drops-badge';
    
    return document.querySelectorAll(DROPS_SELECTOR).length;
    // .filter(game => game.querySelector('.drops-badge'));
    

  })
    .then(data => {
    //convert to JSON and save as file
      data = JSON.stringify(data, null, 2);
      fs.writeFileSync('gumtree.json', data);
    });
};

drops();
