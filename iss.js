const request = require('request');

const fetchMyIP = function(callback) {
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

module.exports = { fetchMyIP };