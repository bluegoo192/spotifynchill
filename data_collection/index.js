const request = require('request-promise-native');
const authorization = require('./auth.js');
const { Client } = require('pg');

let getData = async function (authFunction) {
  let access_token = await authFunction();
  let options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/users/fifi-reid/playlists',
    headers: { authorization: 'Bearer '+access_token }
  }
  try {
    let response = JSON.parse(await request(options));
    for (playlist of response.items) {
      console.log(playlist.name);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  // const client = new Client();
  // await client.connect();
}

getData(authorization);


//console.log("Loaded dependencies successfully.");
