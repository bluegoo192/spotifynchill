const request = require('request-promise-native');
const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists } = require('./getData.js');

const main = async function () {
  await authorization(); // run one initial auth call, which caches the token for later
  getPlaylists('fifi-reid', authorization, (playlist) => {
    //console.log(playlist.name);
  });
}

main();


//console.log("Loaded dependencies successfully.");
