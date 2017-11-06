const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists, getPlaylistTracks } = require('./getData.js');
const { prettyPrintPlaylist } = require('./logging.js');
const { setup } = require('../database_schema.js');

const trackPrintString = "Retrieved tracks for ";
const dbclient = new Client({ database: 'spotifynchill' });

const main = async function () {
  await authorization(); // cache auth token for later
  await dbclient.connect();
  const init = setup.map((statement) => {
    return dbclient.query(statement);
  })
  await Promise.all(init);
  console.log("Database connected and initialized.");
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
