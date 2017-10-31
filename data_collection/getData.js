const request = require('request-promise-native');

const getPlaylists = async function (username, authFunction, callback) {
  let token = await authFunction();
  let playlistsResponse = await get('users/'+username+'/playlists', token);
  for (playlist of playlistsResponse.items) {
    callback(playlist);
  }
  console.log(playlistsResponse.items[0]);
  // const client = new Client();
  // await client.connect();
}

// target should look like { username: <username>, playlist: <playlistObject> }
const getPlaylistTracks = async function (target, authFunction, callback) {
  let token = await authFunction();
  let tracksResponse = await
    get('users/'+target.username+'/playlists/');
}

const get = async function (path, authFunction) {
  let access_token = await authFunction();
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
