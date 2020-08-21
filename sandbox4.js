const fs = require('fs');
const fetch = require('node-fetch');
const newData = require('./gumtree6.json');

const mapVerifiedStreamers = (newData) => {

  return Promise.all(Object.entries(newData).map(([gameName, streamers]) => {
    return Promise.all([gameName, filterUsersWithVerifiedDrops(streamers)]);
  }))
    .then(filterEmptyGames)
    .then(Object.fromEntries)
    .then(array => fs.writeFileSync('results2.json', JSON.stringify(array, null, 2)));
};

function filterUsersWithVerifiedDrops(streamerNames) {
  return Promise.all(streamerNames.map(streamerName => getVerifiedDrops(streamerName)))
    // .then(item => item.map(newItem => newItem.length > 0))
    .then(streamers => streamers
      .filter(streamer => streamer.hasDrops));
}

function getVerifiedDrops(streamerName) {
  return fetch('https://gql.twitch.tv/gql', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
      'User-Agent': 'superman'
    },
    body: JSON.stringify(body(streamerName))
  })
    .then(res => res.json())
    .then(([{ data }]) => ({
      loginName: data.user.login,
      hasDrops: userHasDrops(data)
    }));
}

function userHasDrops(userData) {
  return userData.user.lastBroadcast.game?.activeDropCampaigns
    .some(campaign => campaign.isAvailableToAllChannels || campaign.applicableChannels.find(channel => channel.id === userData.user.id));
}

function filterEmptyGames(gamesWithDrops) {
  return gamesWithDrops.filter(([, usersWithDrops]) => {
    return usersWithDrops.length > 0;
  });
}

function body(streamerName) {
  return [{ 'operationName':'Drops_ChannelDrops_User', 'variables':{ 'login':`${streamerName}`, 'isLoggedIn':false }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'f309b1d517d288074d50d96512059857cc67d8905d1379e414d70f7b981f2618' } } }];
}

mapVerifiedStreamers(newData);

// ({ loginName: data.user.login, 
//   channelId: data.user.id, 
//   newDropsForAll: data.user.lastBroadcast.game?.activeDropCampaigns.filter(item => item.isAvailableToAllChannels === true).map(item => item),
//   dropSpecificChannelArray: data.user.lastBroadcast.game?.activeDropCampaigns
//     .map(item => item.applicableChannels
//       .map(channel => channel.id))[0] })

// .then(([streamers]) => ({ 
//   loginName: streamers.loginName,
//   applicableChannel: streamers.dropSpecificChannelArray
//     .includes(streamers.channelId) 
//   || streamers.newDropsForAll
//     .filter(drops => drops.isAvailableToAllChannels)
// }));
