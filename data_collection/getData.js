const request = require('request-promise-native');
const authorize = require('./auth.js');

const getPlaylists = async function (username, callback) {
  let playlistsResponse = await get('users/'+username+'/playlists');
  for (playlist of playlistsResponse.items) {
    callback(playlist);
  }
  console.log(playlistsResponse.items[0]);
  // const client = new Client();
  // await client.connect();
}

// target should look like { username: <username>, playlist: <playlistObject> }
const getPlaylistTracks = async function (target, callback) {
  let tracksResponse = await
    get('users/'+target.username+'/playlists/');
}

const get = async function (path) {
  let access_token = await authorize();
  let options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/' + path,
    headers: { authorization: 'Bearer '+access_token }
  }
  try {
    return JSON.parse(await request(options));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { getPlaylists, getPlaylistTracks }
