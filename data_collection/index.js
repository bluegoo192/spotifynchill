const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists, getPlaylistTracks } = require('./getData.js');
const { prettyPrintPlaylist } = require('./logging.js');

const trackPrintString = "Retrieved tracks for ";
const dbclient = new Client({ database: 'spotifynchill' });

const main = async function () {
  await authorization(); // cache auth token for later
  await dbclient.connect();
  await dbclient.query('CREATE TABLE IF NOT EXISTS Users( username CHAR(20), PRIMARY KEY (username) )');
  await dbclient.query('CREATE TABLE IF NOT EXISTS Playlists( name CHAR(30), owner CHAR(20) REFERENCES Users ON DELETE CASCADE, PRIMARY KEY (name, owner) )');
  //await dbclient.query('CREATE TABLE IF NOT EXISTS Tracks(  )');
  getPlaylistsAndTracks('fifi-reid');
  dbclient.end();
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
