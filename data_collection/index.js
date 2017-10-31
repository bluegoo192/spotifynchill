const request = require('request-promise-native');
const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists } = require('./getData.js');

getPlaylists('fifi-reid', authorization, (playlist) => {
  console.log(playlist.name);
});


//console.log("Loaded dependencies successfully.");
