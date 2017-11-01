const request = require('request-promise-native');
const authorize = require('./auth.js');

const getPlaylists = async function (username) {
  let playlistsResponse = await get('users/'+username+'/playlists');
  return playlistsResponse.items;
  // const client = new Client();
  // await client.connect();
}

const getPlaylistTracks = async function (playlist, callback) {
  let tracksResponse = await get(playlist.tracks.href, true);
  // console.log(tracksResponse.items[0].track);
  for (item of tracksResponse.items) {
    callback(item.track);
  }
  return { playlist, tracksResponse };
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
