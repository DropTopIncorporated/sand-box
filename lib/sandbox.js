const cheerio = require('cheerio');
const request = require('superagent');



function scrapeDropGames() {
  return request
    .get('https://www.twitch.tv/directory')
    .then(siteData => {
      let $ = cheerio.load(siteData.text);
      console.log($);
      let dropGamesArray = $('*').get();
      console.log(dropGamesArray);
    });
}

scrapeDropGames();


// function scrapeUsers(gameTitle, gameConsole, page){
//   return request
//     .get(`https://www.metacritic.com/game/${gameConsole}/${gameTitle}/user-reviews?dist=positive&page=${page}`)
//     .use(throttle.plugin())
//     .retry(3)
//     .then(siteData => {
//       let $ = cheerio.load(siteData.text);
//       let userNameArray = $('.review_action > a').get().map(el => $(el).attr('href'));
  
//       return Promise.all(userNameArray.map(async item => {
//         return {
//           reviews: await hasMultipleReviews(item), //boolean
//           userName: item,
//         };
//       }));
//     })
//     .catch(() => { 
//       throw new Error('Invalid game/title, please check spelling and try again');
//     });
// }
