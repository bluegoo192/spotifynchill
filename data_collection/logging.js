const colors = require('colors');

const trackPrintString = "Fetched ";
const padding = 8;
const ellipsis = "...)";

const prettyPrintTracks = function (tracks, preProcess) {
  const printString = (tracks.length < 2) ?
    "(short)" : "("+tracks[0].name+", "+tracks[1].name;
  return preProcess(printString+ellipsis).dim;
}

const cropToLength = function (string, length, suffix) {
  if (string.length < length) return string;
  return string.substring(0, length-suffix.length)+suffix;
}

const prettyPrintPlaylist = function (playlist, tracks) {
  const offset = trackPrintString.length + playlist.name.length;
  const trackString = prettyPrintTracks(tracks, (string) => {
    return (cropToLength(string, process.stdout.columns-offset-padding, ellipsis)
      .padStart(process.stdout.columns-offset));
  });
  console.log(trackPrintString.green+playlist.name + trackString);
}

module.exports = { prettyPrintPlaylist }
