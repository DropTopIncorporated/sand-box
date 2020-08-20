const fs = require('fs');
const fetch = require('node-fetch');
const newData =  require('./gumtree4.json');

const cursors = [
  'eyJzIjowLCJkIjpmYWxzZSwidCI6dHJ1ZX0=',
  'eyJzIjo5OSwiZCI6ZmFsc2UsInQiOnRydWV9',
  'eyJzIjoxOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==',
  'eyJzIjoyOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ=='
];

const getGameNames = (gameArray) => {
  return gameArray.map(item => item.name);
};

const games = getGameNames(newData);
  
const drops = (games) => {

  return Promise.all(games.map(name => getGameStreamers(name)))

    .then((gameStreamers) => {
      return Object.fromEntries(gameStreamers.map((streamers, i) => [
        games[i],
        streamers
      ])
      );
    })
    .then(array => fs.writeFileSync('gumtree6.json', JSON.stringify(array, null, 2)));
};
  
function getGameStreamers(game) {
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
      return (item[0].data.game.streams['edges'].map(item => item.node.broadcaster.login));
    });
}
  
function body(gameName) {
  return [{ 'operationName':'DirectoryPage_Game', 'variables':{ 'name':`${gameName}`, 'options':{ 'sort':'RELEVANCE', 'recommendationsContext':{ 'platform':'web' }, 'requestID':'JIRA-VXP-2397', 'tags':[] }, 'sortTypeIsRecency':false, 'limit':100 }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'5feb6766dc5d70b33ae9a37cda21e1cd7674187cb74f84b4dd3eb69086d9489c' } } }];
}

drops(games);
