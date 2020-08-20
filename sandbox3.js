const fs = require('fs');
const fetch = require('node-fetch');
const newData =  require('./gumtree4.json');

const cursors = [
  'eyJzIjowLCJkIjpmYWxzZSwidCI6dHJ1ZX0=',
  'eyJzIjo5OSwiZCI6ZmFsc2UsInQiOnRydWV9',
  'eyJzIjoxOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==',
  'eyJzIjoyOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ=='
];

const getGameName = (gameArray) => {
  return gameArray.map(item => item.name);
};

const game = getGameName(newData);
  
const drops = (game) => {
  return Promise.all([
    dataFetch(game[0]),
    // dataFetch(game[1]),
    // dataFetch(game[2]),
    // dataFetch(game[3])
  ])
    .then(array => fs.writeFileSync('gumtree6.json', JSON.stringify(array.flat(), null, 2)));
};
  
function dataFetch(game) {
  return fetch('https://gql.twitch.tv/gql', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
      'User-Agent': 'superman'
    },
    body: JSON.stringify(body(game))
  })
    .then(res => res.json())
    .then(item => {
      return item[0].data.game.streams['edges'];
      
    //   item[0].data.directoriesWithTags['edges']
    //     .filter(item => item.node.activeDropCampaigns.length > 0)
    //     .map(({ node: { id, displayName, name, avatarURL } }) => {
    //       return {
    //         id,
    //         displayName,
    //         name,
    //         imageUrl: avatarURL
    //       };
    //     });
    });
}
  
function body(gameName) {
  return [{ 'operationName':'DirectoryPage_Game', 'variables':{ 'name':`${gameName}`, 'options':{ 'sort':'RELEVANCE', 'recommendationsContext':{ 'platform':'web' }, 'requestID':'JIRA-VXP-2397', 'tags':[] }, 'sortTypeIsRecency':false, 'limit':100 }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'5feb6766dc5d70b33ae9a37cda21e1cd7674187cb74f84b4dd3eb69086d9489c' } } }];
}


drops(game);
