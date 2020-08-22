const fs = require('fs');
const fetch = require('node-fetch');
const newData = require('./results2.json');

const getStreamerNames = (data) => {
  return Promise.all(Object.entries(data).map(([gameName, streamerNames]) => {
    return Promise.all([gameName, 
      getStreamerDetails(streamerNames)]);
  }))
    .then(array => array.flat())
    .then(array => fs.writeFileSync('results4.json', JSON.stringify(array, null, 2)));
};

function getStreamerDetails(streamerNames) {
  return Promise.all(streamerNames.map(streamerName => getStreamersInformation(streamerName.loginName)));
}

function getStreamersInformation(streamerLogin) {
  return fetch(`https://api.twitch.tv/helix/streams?user_login=${streamerLogin}`, { 
    method: 'GET',
    headers: {
      'Client-ID' : 'sa1nzoqk8wbkgwtqmlazbpf82sb84k',
      'Authorization': 'Bearer y8u1rjycjgxd0doat4n1ui4saswjls'
    },
  })
    .then(res => res.json())
    .then(stuff => 
      (stuff.data.map(item => ({
        
        userId: item.user_id,
        userName: item.user_name,
        title: item.title,
        thumbnail_url: item.thumbnail_url,
        viewer_count: item.viewer_count
        
      }))));
  // .then(data => data);
        
  //     ({
  //   streamTitle: data.title,
  //   userName: data.user_name,
  //   viewers: data.viewer_count
  // }));
}

getStreamerNames(newData);
