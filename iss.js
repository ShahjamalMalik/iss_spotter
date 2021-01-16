const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if(err) {
      callback(err, null);
      return;
    } else if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, JSON.parse(body).ip);
      return;
    }
  })
}

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, response, body) => {
    let jsonBody = JSON.parse(body);
    if(err) {
      callback(err, null);
      return;
    } else if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, {
        latitude: jsonBody.latitude,
        longitude: jsonBody.longitude
      });
    }
  })
}



module.exports = { fetchMyIP, fetchCoordsByIP };

