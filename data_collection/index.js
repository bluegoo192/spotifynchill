const secrets = require('./secrets.json');
const request = require('request-promise-native');
const { Client } = require('pg');

let authorize = async function () {
    let base64AuthString = new Buffer(secrets.client_id+":"+secrets.client_secret).toString('base64');
    let authorizationOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            authorization: 'Basic '+base64AuthString
        },
        form: { grant_type: 'client_credentials' }
    }
    try {
        let rawResponse = await request(authorizationOptions);
        let response = JSON.parse(rawResponse);
        return response.access_token;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

let getData = async function () {
  let access_token = await authorize();
  let options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/users/fifi-reid/playlists',
    headers: { authorization: 'Bearer '+access_token }
  }
  try {
    let response = JSON.parse(await request(options));
    for (playlist of response.items) {
      console.log(playlist.name);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  const client = new Client();
  await client.connect();
}

getData();


//console.log("Loaded dependencies successfully.");
