const request = require('request-promise-native');
const authorize = require('./auth.js');

const getPlaylists = async function (username, callback) {
  let playlistsResponse = await get('users/'+username+'/playlists');
  for (playlist of playlistsResponse.items) {
    callback(playlist);
  }
  // const client = new Client();
  // await client.connect();
}

const getPlaylistTracks = async function (playlist, callback) {
  let tracksResponse = await get(playlist.tracks.href, true);
}

const get = async function (path, isFullUrl) {
  let access_token = await authorize();
  let options = {
    method: 'GET',
    url: isFullUrl ? path : 'https://api.spotify.com/v1/' + path,
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
