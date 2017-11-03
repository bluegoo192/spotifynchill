const colors = require('colors');

const trackPrintString = "  Got ";
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
  const countString = " - "+tracks.length;
  const offset = trackPrintString.length + countString.length + playlist.name.length;
  const trackString = prettyPrintTracks(tracks, (string) => {
    return (cropToLength(string, process.stdout.columns-offset-padding, ellipsis)
      .padStart(process.stdout.columns-offset));
  });
  console.log(trackPrintString.green+playlist.name+countString.bold + trackString);
}

const printAuth = {
  getting: function () {
    console.log("Fetching API token.  "+"You should only see this once per hour".bold);
  },
  success: function (token) {
    console.log("Authenticated ".green + "- "+token.dim);
  }
}

module.exports = { prettyPrintPlaylist, printAuth }
