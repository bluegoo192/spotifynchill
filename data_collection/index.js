const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists, getPlaylistTracks, getTrackFeatures } = require('./getData.js');
const { prettyPrintPlaylist } = require('./logging.js');
const { setup, addItem } = require('../database_schema.js');

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
  //dbclient.end();
}

const getPlaylistsAndTracks = async function (username) {
  const addUserQuery = {
    text: 'INSERT INTO users (username) VALUES ($1) ON CONFLICT (username) DO NOTHING',
    values: [username]
  }
  await dbclient.query(addUserQuery);
  const playlists = await getPlaylists(username);
  for (playlist of playlists) {
    let tracks = [];
    const addPlaylistQuery = {
      text: 'INSERT INTO playlists (id, name, owner) VALUES ($1,$2,$3) ON CONFLICT (id) DO UPDATE SET name = excluded.name, owner = excluded.owner',
      values: [playlist.id, playlist.name, username]
    }
    await dbclient.query(addPlaylistQuery);
    getPlaylistTracks(playlist, (track) => {
      tracks.push(track);
      getTrackFeatures(track.id).then((features) => {
        const addTrackQuery = {
          text: addItem.track,
          values: [track.id, track.album.name, track.artists[0].name,
            track.explicit, track.name, track.popularity, features.acousticness,
            features.analysis_url, features.danceability, features.duration_ms,
            features.energy, features.instrumentalness, features.key,
            features.liveness, features.loudness, features.mode,
            features.speechiness, features.tempo, features.time_signature, features.valence]
        }
      })
      //console.log(track);
    }).then((result) => {
      prettyPrintPlaylist(result.playlist, tracks);
    });
  }
}

main();


//console.log("Loaded dependencies successfully.");
