const authorization = require('./auth.js');
const { Client } = require('pg');
const { getPlaylists, getPlaylistTracks } = require('./getData.js');

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
      let offset = trackPrintString.length + result.playlist.name.length;
      console.log(
          trackPrintString+result.playlist.name+
          prettyPrintTracks(tracks).padStart(process.stdout.columns-offset));
    });
  }
}

const prettyPrintTracks = function (tracks) {
  if (tracks.length < 3) return "(short)";
  return "("+tracks[0].name+", "+tracks[1].name+", "+tracks[2].name+ "...)"
}

main();


//console.log("Loaded dependencies successfully.");
