const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists, getPlaylistTracks } = require('./getData.js');
const { prettyPrintPlaylist } = require('./logging.js');

const trackPrintString = "Retrieved tracks for ";
const dbclient = new Client({ database: 'spotifynchill' });

const main = async function () {
  await authorization(); // cache auth token for later
  await dbclient.connect();
  await dbclient.query('CREATE TABLE IF NOT EXISTS Users( username TEXT, PRIMARY KEY (username) )');
  await dbclient.query('CREATE TABLE IF NOT EXISTS Playlists( id TEXT, name TEXT, owner TEXT REFERENCES Users(username) ON DELETE CASCADE, PRIMARY KEY (id) )');
  await dbclient.query('CREATE TABLE IF NOT EXISTS Tracks( id TEXT, album TEXT, artists TEXT, explicit BOOLEAN, name TEXT, popularity INT, acousticness REAL, analysis_url TEXT, danceability REAL, duration_ms REAL, energy REAL, instrumentalness REAL, key INT, liveness REAL, loudness REAL, mode INT, speechiness REAL, tempo REAL, time_signature INT, valence REAL, PRIMARY KEY (id) )');
  await dbclient.query('CREATE TABLE IF NOT EXISTS Playlist_Has( playlist_id TEXT REFERENCES Playlists(id), track_id TEXT REFERENCES Tracks(id), added_at TIMESTAMP, added_by TEXT, PRIMARY KEY (playlist_id, track_id, added_at) )')
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
