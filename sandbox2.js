const request = require('superagent');
const fs = require('fs');
const fetch = require('node-fetch');

const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';
                
const cursor1 = 'eyJzIjowLCJkIjpmYWxzZSwidCI6dHJ1ZX0=';
const cursor2 = 'eyJzIjo5OSwiZCI6ZmFsc2UsInQiOnRydWV9';
//  eyJzIjo5OSwiZCI6ZmFsc2UsInQiOnRydWV9
const cursor3 = 'eyJzIjoxOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==';
//  eyJzIjoxOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==
const cursor4 = 'eyJzIjoyOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==';
//  eyJzIjoyOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==
const drops = (cursor1, cursor2, cursor3) => {
 
  return Promise.all([
    dataFetch(cursor1),
    dataFetch(cursor2),
    dataFetch(cursor3),
    dataFetch(cursor4)
  ])
    .then(array => array.flat())
    .then(data => {
      const stringData = JSON.stringify(data, null, 2);
      fs.writeFileSync('gumtree3.json', stringData);
    });
};

function dataFetch(cursor) {
  return fetch('https://gql.twitch.tv/gql', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
      'User-Agent': 'superman'
    },
    body: JSON.stringify(body(cursor))
  })
    .then(res => res.json())
    .then(item => {
      return item[0].data.directoriesWithTags['edges']
        .filter(item => item.node.activeDropCampaigns.length > 0)
        .map(({ node: { id, displayName, name, avatarURL } }) => {
          return {
            id,
            displayName,
            name,
            imageUrl: avatarURL
          };
        });
    });
}

function body(cursor) {
  return [{ 'operationName':'BrowsePage_AllDirectories', 'variables':{ 'limit':100, 'options':{ 'recommendationsContext':{ 'platform':'web' }, 'requestID':'JIRA-VXP-2397', 'sort':'VIEWER_COUNT', 'tags':[] }, 'cursor':`${cursor}` }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'78957de9388098820e222c88ec14e85aaf6cf844adf44c8319c545c75fd63203' } } }];
}

drops(cursor1, cursor2, cursor3, cursor4);

// return `[{ 'operationName':'BrowsePage_AllDirectories', 'variables':{ 'limit':100, 'options':{ 'recommendationsContext':{ 'platform':'web' }, 'requestID':'JIRA-VXP-2397', 'sort':'VIEWER_COUNT', 'tags':[] }, 'cursor':'eyJzIjowLCJkIjpmYWxzZSwidCI6dHJ1ZX0=' }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'78957de9388098820e222c88ec14e85aaf6cf844adf44c8319c545c75fd63203' } } }]`;


// const drops = () => {
//   return fetch('https://gql.twitch.tv/gql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'text/plain',
//       'Client-Id': CLIENT_ID,
//       'User-Agent': 'superman'
//     },
//     body: JSON.stringify(body)
//   })
//     .then(res => res.json())
//     .then(data => {
//       const newData = data[0].data.directoriesWithTags['edges']
//         .filter(item => item.node.activeDropCampaigns.length > 0)
//         .map(({ node: { id, displayName, name, avatarURL } }) => {
//           return {
//             id,
//             displayName,
//             name,
//             imageUrl: avatarURL
//           };
//         });
      
//       const stringData = JSON.stringify(newData, null, 2);
//       fs.writeFileSync('gumtree.json', stringData);
//     });
// };
// const filterArray = array => {
//   return array.map(item =>{
//     return console.log(item.data.directoriesWithTags['edges'].filter(item => item.node.activeDropCampaigns.length > 0));
//   }
//   );
// };

// const drops = async() => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto('https://www.twitch.tv/directory');

//   return page.evaluate(() => {
//     const OUR_SELECTOR = '.tw-tower';
//     const DROPS_SELECTOR = '.drops-badge';
    
//     return document.querySelectorAll(DROPS_SELECTOR).length;
//     // .filter(game => game.querySelector('.drops-badge'));
    

//   })
//     .then(data => {
//     //convert to JSON and save as file
//       data = JSON.stringify(data, null, 2);
//       fs.writeFileSync('gumtree.json', data);
//     });
// };


// const body = [{ 'operationName':'BrowsePage_AllDirectories', 'variables':{ 'limit':100, 'options':{ 'recommendationsContext':{ 'platform':'web' }, 'requestID':'JIRA-VXP-2397', 'sort':'VIEWER_COUNT', 'tags':[] }, 'cursor':'eyJzIjowLCJkIjpmYWxzZSwidCI6dHJ1ZX0=' }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'78957de9388098820e222c88ec14e85aaf6cf844adf44c8319c545c75fd63203' } } }]
// ;

// const body2 = [{ 'operationName':'BrowsePage_AllDirectories', 'variables':{ 'limit':100, 'options':{ 'recommendationsContext':{ 'platform':'web' }, 'requestID':'JIRA-VXP-2397', 'sort':'VIEWER_COUNT', 'tags':[] }, 'cursor':'eyJzIjo5OSwiZCI6ZmFsc2UsInQiOnRydWV9' }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'78957de9388098820e222c88ec14e85aaf6cf844adf44c8319c545c75fd63203' } } }];

