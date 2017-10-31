const secrets = require('./secrets.json');
const request = require('request-promise-native');

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
        let response = await request(authorizationOptions);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

authorize();


//console.log("Loaded dependencies successfully.");


