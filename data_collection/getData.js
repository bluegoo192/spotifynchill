const request = require('request-promise-native');

const getPlaylists = async function (username, authFunction, callback) {
  let access_token = await authFunction();
  let options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/users/fifi-reid/playlists',
    headers: { authorization: 'Bearer '+access_token }
  }
  try {
    let response = JSON.parse(await request(options));
    for (playlist of response.items) {
      callback(playlist);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  // const client = new Client();
  // await client.connect();
}

module.exports = { getPlaylists }
