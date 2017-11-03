const secrets = require('./secrets.json');
const request = require('request-promise-native');
const { printAuth } = require('./logging.js');

const date = new Date();

// cache credentials
let credentials = {
  token: '',
  expires: 0, // do not edit this directly
  isValid: function () {
    return date.getTime() < this.expires;
  },
  setExpiration: async function (timeout) { // timeout is measured in seconds
    this.expires = date.getTime() + (timeout * 1000);
  },
  parseResponse: async function (response) {
    this.token = response.access_token;
    await this.setExpiration(response.expires_in);
    printAuth.success(this.token);
  }
}

// either get a new token or return the cached one
const authorize = async function () {
    if (!credentials.isValid()) { // if credentials are invalid
      await credentials.parseResponse(await getToken());
    }
    return credentials.token;
}

// get token from API
const getToken = async function () {
  printAuth.getting();
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
    return JSON.parse(await request(authorizationOptions));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = authorize;
