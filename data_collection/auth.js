const secrets = require('./secrets.json');
const request = require('request-promise-native');

// Use application credentials to get a temporary access token

let authorize = async function () {
    let base64AuthString = new Buffer
      (secrets.client_id+":"+secrets.client_secret).toString('base64');
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

module.exports = authorize;
