const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists, getPlaylistTracks } = require('./getData.js');
const { prettyPrintPlaylist } = require('./logging.js');

const trackPrintString = "Retrieved tracks for ";

const main = async function () {
  await authorization(); // cache auth token for later
  getPlaylistsAndTracks('fifi-reid');
}

const getPlaylistsAndTracks = async function (username) {
  const playlists = await getPlaylists(username);
  for (playlist of playlists) {
    let tracks = [];
    getPlaylistTracks(playlist, (track) => {
      tracks.push(track);
    }).then((result) => {
      prettyPrintPlaylist(result.playlist, tracks);
    });
  }
}

main();


//console.log("Loaded dependencies successfully.");
